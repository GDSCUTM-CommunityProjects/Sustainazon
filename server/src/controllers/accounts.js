const {
  admin,
  db,
  BUYER_COLLECTION,
  SELLER_COLLECTION,
} = require("../firebase");
const { Response, errorHandler } = require("../response");

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
        console.log(error);
        return errorHandler(error, "Unauthorized", 401);
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
    await db
      .collection(BUYER_COLLECTION)
      .doc(userRecord.uid)
      .set({ name, email });
    return new Response(200, { message: "registered" });
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
}

async function registerSeller(business) {
  try {
    const { name, email, password, phone, billingAddress, shippingAddress } =
      business;

    // create new user based on given email and password
    // firebase handles email validation and password validation
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
    });

    // set custom claim to mark a user as an seller or not
    await admin.auth().setCustomUserClaims(userRecord.uid, { isSeller: true });

    // Get reference to where users are stored in the database and create a new user
    await db.collection(SELLER_COLLECTION).doc(userRecord.uid).set({
      name,
      email,
      phone,
      billingAddress,
      shippingAddress,
    });
    return new Response(200, { message: "registered" });
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
}

async function logout(sessionCookie) {
  try {
    await getAuth()
      .verifySessionCookie(sessionCookie)
      .then((decodedClaims) => {
        return getAuth().revokeRefreshTokens(decodedClaims.sub);
      });
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
}

module.exports = { registerBuyer, registerSeller, login, logout };
