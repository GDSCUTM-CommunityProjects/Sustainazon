const express = require("express");
const { addItem, getItem, updateItem } = require("../controllers/sellerItems");
const { verifyUser, verifyIsSeller } = require("../middleware/verifyAuth");

const sellerRouter = express.Router();
sellerRouter.use(verifyUser);
sellerRouter.use(verifyIsSeller);

sellerRouter.post("/items", async (req, res) => {
  const { name, price, description, inventory } = req.body;
  const data = await addItem({ name, price, description, inventory });
  return res.status(data.status).send(data.data);
});

sellerRouter.put("/items", async (req, res) => {
  const { name, price, description, inventory, itemId } = req.body;
  const data = await updateItem(
    { name, price, description, inventory },
    itemId
  );
  return res.status(data.status).send(data.data);
});

sellerRouter.get("/items", async (req, res) => {
  const data = await getItem(req.query.itemId);
  return res.status(data.status).send(data.data);
});

sellerRouter.delete("/items", async (req, res) => {
  const data = await getItem(req.query.itemId);
  return res.status(data.status).send(data.data);
});

module.exports = sellerRouter;
