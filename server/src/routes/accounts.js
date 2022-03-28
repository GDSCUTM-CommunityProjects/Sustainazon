const express = require("express");
const {
  login,
  registerBuyer,
  registerSeller,
} = require("../controllers/accounts");
const accountsRouter = express.Router();

accountsRouter.post("/login", async (req, res) => {
  const data = await login(req.body.idToken);
  if (data.status === 200) {
    const { sessionCookie, options, isSeller } = data.data;
    res.cookie("session", sessionCookie, options);
    return res.send({ isSeller });
  } else {
    return res.status(data.status).send(data.data);
  }
});

accountsRouter.post("/register/buyer", async (req, res) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  const data = await registerBuyer(user);
  return res.status(data.status).send(data.data);
});

accountsRouter.post("/register/seller", async (req, res) => {
  const business = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    billingAddress: req.body.billingAddress,
    shippingAddress: req.body.shippingAddress,
  };
  const data = await registerSeller(business);
  return res.status(data.status).send(data.data);
});

accountsRouter.post("/logout", async (req, res) => {
  res.clearCookie("session");
  res.send("logged out");
});

module.exports = accountsRouter;
