const express = require("express");
const {
  getItemAll,
  getItem,
  rateItem,
  addItemToCart,
  getCart,
} = require("../controllers/buyerItems");
const { verifyUser } = require("../middleware/verifyAuth");

const buyerRouter = express.Router();
buyerRouter.use(verifyUser);

buyerRouter.get("/item", async (req, res) => {
  const data = await getItem(req.query.itemId, req.uid);
  return res.status(data.status).send(data.data);
});

buyerRouter.get("/item/all", async (req, res) => {
  let page =
    req.query.page === null || req.query.page === undefined
      ? "0"
      : req.query.page;
  const data = await getItemAll(page);
  return res.status(data.status).send(data.data);
});

buyerRouter.post("/item/rate", async (req, res) => {
  const { comment, star, itemId } = req.body;
  const data = await rateItem(itemId, req.uid, comment, star);
  return res.status(data.status).send(data.data);
});

buyerRouter.post("/cart", async (req, res) => {
  const data = await addItemToCart(req.body.itemId, req.uid);
  return res.status(data.status).send(data.data);
});

buyerRouter.get("/cart", async (req, res) => {
  const data = await getCart(req.uid);
  return res.status(data.status).send(data.data);
});

module.exports = buyerRouter;
