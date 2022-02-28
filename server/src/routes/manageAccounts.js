const express = require("express");
const { updateInfo, getInfo } = require("../controllers/manageAccounts");
const upload = require("../firebaseMulter");
const { verifyUser, verifyIsSeller } = require("../middleware/verifyAuth");

const manageAccountsRouter = express.Router();
manageAccountsRouter.use(verifyUser);

manageAccountsRouter.post(
  "/upload",
  verifyIsSeller,
  upload.array("certificates", 5),
  async (req, res) => {
    return res.status(201).send({ uploaded: req.files });
  }
);

manageAccountsRouter.put("/", async (req, res) => {
  const { name, billingAddress, phone, shippingAddress } = req.body;
  const data = await updateInfo(
    { name, billingAddress, phone, shippingAddress },
    req.isSeller,
    req.uid
  );
  return res.status(data.status).send(data.data);
});

manageAccountsRouter.get("/", async (req, res) => {
  const data = await getInfo(req.isSeller, req.uid);
  return res.status(data.status).send(data.data);
});

module.exports = manageAccountsRouter;
