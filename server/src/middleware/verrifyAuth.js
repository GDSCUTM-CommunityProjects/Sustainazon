const verifyUser = (req, res, next) => {
  const sessionCookie = req.cookies.session || "";
  admin
    .auth()
    .verifySessionCookie(sessionCookie, true)
    .then((decodedClaims) => {
      req.isSeller = decodedClaims.isSeller;
      req.userID = decodedClaims.uid;
      next();
    })
    .catch((error) => {
      res.clearCookie("session");
      res.status(401).send("Unauthorized");
    });
};

const isSeller = (req, res, next) => {
  if (req.isSeller) {
    next();
  }
  res.status(403).send("Forbidden");
};

module.exports = { verifyUser, isSeller };
