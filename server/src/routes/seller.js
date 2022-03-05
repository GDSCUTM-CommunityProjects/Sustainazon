const express = require("express");
const {
  addItem,
  getItem,
  updateItem,
  getItemAll,
} = require("../controllers/sellerItems");
const upload = require("../firebaseMulter");
const { verifyUser, verifyIsSeller } = require("../middleware/verifyAuth");

const sellerRouter = express.Router();
sellerRouter.use(verifyUser);
sellerRouter.use(verifyIsSeller);

sellerRouter.post("/item", upload.array("imgs", 10), async (req, res) => {
  const { itemName, price, description, inventory } = req.body;
  const imgUrls = req.files.map((file) => file.url);
  const data = await addItem(
    { itemName, price, description, inventory, imgUrls },
    req.uid
  );
  return res.status(data.status).send(data.data);
});

sellerRouter.put("/item", upload.array("imgs", 10), async (req, res) => {
  const { itemName, price, description, inventory, itemId } = req.body;
  const imgUrls = req.files.map((file) => file.url);
  const data = await updateItem(
    { itemName, price, description, inventory, imgUrls },
    itemId,
    req.uid
  );
  return res.status(data.status).send(data.data);
});

sellerRouter.get("/item", async (req, res) => {
  const data = await getItem(req.query.itemId, req.uid);
  return res.status(data.status).send(data.data);
});

sellerRouter.get("/item/all", async (req, res) => {
  const data = await getItemAll(req.uid);
  return res.status(data.status).send(data.data);
});

sellerRouter.delete("/item", async (req, res) => {
  const data = await getItem(req.query.itemId, req.uid);
  return res.status(data.status).send(data.data);
});

module.exports = sellerRouter;
