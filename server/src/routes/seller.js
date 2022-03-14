const express = require("express");
const {
  addItem,
  getItem,
  updateItem,
  getItemAll,
  itemImgUpload,
  itemImgDelete,
  deleteItem,
} = require("../controllers/sellerItems");
const { getOrders, updateOrder } = require("../controllers/sellerOrders");

const { verifyUser, verifyIsSeller } = require("../middleware/verifyAuth");

const sellerRouter = express.Router();
sellerRouter.use(verifyUser);
sellerRouter.use(verifyIsSeller);

sellerRouter.post("/item", async (req, res) => {
  const { itemName, price, description, inventory, categories, tags } =
    req.body;
  const data = await addItem(
    { itemName, price, description, inventory, categories, tags },
    req.uid
  );
  return res.status(data.status).send(data.data);
});

sellerRouter.post("/item/upload", itemImgUpload);
sellerRouter.delete("/item/upload", async (req, res) => {
  const data = await itemImgDelete(req.body.media, req.uid, req.query.itemId);
  return res.status(data.status).send(data.data);
});

sellerRouter.put("/item", async (req, res) => {
  const { itemName, price, description, inventory, itemId, categories, tags } =
    req.body;
  const data = await updateItem(
    { itemName, price, description, inventory, categories, tags },
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
  const data = await getItemAll(req.uid, req.query.next);
  return res.status(data.status).send(data.data);
});

sellerRouter.delete("/item", async (req, res) => {
  const data = await deleteItem(req.query.itemId, req.uid);
  return res.status(data.status).send(data.data);
});

sellerRouter.get("/order/all", async (req, res) => {
  const data = await getOrders(req.uid, req.query.page);
  return res.status(data.status).send(data.data);
});

sellerRouter.patch("/order", async (req, res) => {
  const data = await updateOrder(req.uid, req.body.orderId, req.body.status);
  return res.status(data.status).send(data.data);
});

module.exports = sellerRouter;
