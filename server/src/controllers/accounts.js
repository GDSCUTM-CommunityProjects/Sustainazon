const { admin, db } = require("../firebase");
const Response = require("../responseModel");

async function login(idToken) {
  const expiresIn = 59 * 60 * 1000; // session cookie expires in 59 minutes

  // Verify the id token
  const result = await admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      return new Response(200, {
        isSeller: decodedToken.isSeller,
      });
    })
    .catch((error) => {
      return new Response(401, { message: "Unauthorized" });
    });

  if (result.status === 401) {
    return result;
  }
  const { isSeller } = result.data;
  // Create the session cookie
  return await admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        const options = { maxAge: expiresIn, httpOnly: true };
        return new Response(200, { sessionCookie, options, isSeller });
      },
      (error) => {
        let message = "Unauthorized";
        if (error.hasOwnProperty("message")) {
          message = error.message;
        }
        return new Response(401, { message });
      }
    );
}

async function registerBuyer(user) {
  try {
    const { name, email, password } = user;

    // create new user based on given email and password
    // firebase handles email validation and password validation
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
    });

    // set custom claim to mark a user as an seller or not
    await admin.auth().setCustomUserClaims(userRecord.uid, { isSeller: false });

    // Get reference to where users are stored in the database and create a new user
    const ref = db.ref("buyer");
    const currUser = ref.child(userRecord.uid);
    await currUser.update({ name, email });
    return new Response(200, { message: "registered" });
  } catch (error) {
    let message = "Bad Request";
    if (error.hasOwnProperty("message")) message = error.message;
    return new Response(400, { message });
  }
}

async function registerSeller(business) {
  try {
    const { name, email, password, phone, address } = business;

    // create new user based on given email and password
    // firebase handles email validation and password validation
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
    });

    // set custom claim to mark a user as an seller or not
    await admin.auth().setCustomUserClaims(userRecord.uid, { isSeller: true });

    // Get reference to where users are stored in the database and create a new user
    const ref = db.ref("seller");
    const currUser = ref.child(userRecord.uid);
    await currUser.update({ name, email, phone, address });

    return new Response(200, { message: "registered" });
  } catch (error) {
    console.log(error);
    let message = "Bad Request";
    if (error.hasOwnProperty("message")) message = error.message;
    return new Response(400, { message });
  }
}

async function logout(sessionCookie) {
  await getAuth()
    .verifySessionCookie(sessionCookie)
    .then((decodedClaims) => {
      return getAuth().revokeRefreshTokens(decodedClaims.sub);
    })
    .then(() => {
      return;
    })
    .catch((error) => {
      return;
    });
}

module.exports = { registerBuyer, registerSeller, login, logout };
