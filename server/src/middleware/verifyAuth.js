const { admin } = require("../firebase");

const verifyUser = (req, res, next) => {
  const sessionCookie = req.cookies.session || "";
  admin
    .auth()
    .verifySessionCookie(sessionCookie, true)
    .then((decodedClaims) => {
      req.isSeller = decodedClaims.isSeller;
      req.userID = decodedClaims.uid;
      return next();
    })
    .catch((error) => {
      res.clearCookie("session");
      return res.status(401).send("Unauthorized");
    });
};

const verifyIsSeller = (req, res, next) => {
  if (req.isSeller) {
    return next();
  }
  return res.status(403).send("Forbidden");
};

module.exports = { verifyUser, verifyIsSeller };
