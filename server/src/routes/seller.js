const express = require("express");
const {
  addItem,
  getItem,
  updateItem,
  getItemAll,
} = require("../controllers/sellerItems");
const { verifyUser, verifyIsSeller } = require("../middleware/verifyAuth");

const sellerRouter = express.Router();
sellerRouter.use(verifyUser);
sellerRouter.use(verifyIsSeller);

sellerRouter.post("/item", async (req, res) => {
  const { itemName, price, description, inventory } = req.body;
  const data = await addItem(
    { itemName, price, description, inventory },
    req.uid
  );
  return res.status(data.status).send(data.data);
});

sellerRouter.put("/item", async (req, res) => {
  const { itemName, price, description, inventory, itemId } = req.body;
  const data = await updateItem(
    { itemName, price, description, inventory },
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
