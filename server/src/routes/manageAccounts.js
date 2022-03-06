const express = require("express");
const {
  updateInfo,
  getInfo,
  uploadMedia,
  deleteMedia,
} = require("../controllers/manageAccounts");
const upload = require("../firebaseMulter");
const { verifyUser, verifyIsSeller } = require("../middleware/verifyAuth");

const manageAccountsRouter = express.Router();
manageAccountsRouter.use(verifyUser);

manageAccountsRouter.post(
  "/upload",
  verifyIsSeller,
  upload.fields([
    { name: "certificates", maxCount: 5 },
    { name: "imgs", maxCount: 10 },
  ]),
  async (req, res) => {
    const data = await uploadMedia(req.files, req.uid);
    return res.status(data.status).send(data.data);
  }
);

manageAccountsRouter.delete("/upload", verifyIsSeller, async (req, res) => {
  const data = await deleteMedia(req.body.mediaObj, req.uid);
  return res.status(data.status).send(data.data);
});

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
