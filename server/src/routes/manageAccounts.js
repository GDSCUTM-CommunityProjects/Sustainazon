const express = require("express");
const upload = require("../firebaseMulter");
const { verifyUser, verifyIsSeller } = require("../middleware/verrifyAuth");

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

module.exports = manageAccountsRouter;
