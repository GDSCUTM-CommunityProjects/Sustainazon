const express = require("express");
const {
  rateItem,
  addItemToCart,
  getCart,
  deleteItemFromCart,
} = require("../controllers/buyerItems");
const {
  placeOrder,
  getOrders,
  updateOrder,
} = require("../controllers/buyerOrders");
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

buyerRouter.post("/order", async (req, res) => {
  const data = await placeOrder(req.uid, req.body.items);
  return res.status(data.status).send(data.data);
});

buyerRouter.get("/order/all", async (req, res) => {
  let page =
    req.query.page === null || req.query.page === undefined
      ? "0"
      : req.query.page;
  const data = await getOrders(req.uid, page);
  return res.status(data.status).send(data.data);
});

buyerRouter.patch("/order", async (req, res) => {
  const data = await updateOrder(req.uid, req.body.orderId, req.body.status);
  return res.status(data.status).send(data.data);
});

module.exports = buyerRouter;
