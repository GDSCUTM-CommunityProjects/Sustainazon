const express = require("express");
const {
  rateItem,
  addItemToCart,
  getCart,
  deleteItemFromCart,
} = require("../controllers/buyerItems");
const { verifyUser, verifyIsBuyer } = require("../middleware/verifyAuth");

const buyerRouter = express.Router();
buyerRouter.use(verifyUser);
buyerRouter.use(verifyIsBuyer);

buyerRouter.post("/item/rate", async (req, res) => {
  const { comment, star, itemId } = req.body;
  const data = await rateItem(itemId, req.uid, comment, star);
  return res.status(data.status).send(data.data);
});

buyerRouter.post("/cart", async (req, res) => {
  const data = await addItemToCart(req.body.itemId, req.uid, req.body.quantity);
  return res.status(data.status).send(data.data);
});

buyerRouter.get("/cart", async (req, res) => {
  const data = await getCart(req.uid);
  return res.status(data.status).send(data.data);
});

buyerRouter.delete("/cart", async (req, res) => {
  const data = await deleteItemFromCart(
    req.body.itemId,
    req.uid,
    req.body.quantity
  );
  return res.status(data.status).send(data.data);
});

module.exports = buyerRouter;
