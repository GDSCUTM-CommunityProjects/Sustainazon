const express = require("express");
const commonRouter = express.Router();
const {
  getItem,
  getItemAll,
  getTags,
  getSeller,
  getAllSellers,
} = require("../controllers/common");

commonRouter.get("/", async (req, res) => {
  const data = await getItem(req.query.itemId, req.uid);
  return res.status(data.status).send(data.data);
});

commonRouter.get("/all", async (req, res) => {
  let page =
    req.query.page === null || req.query.page === undefined
      ? "0"
      : req.query.page;
  const data = await getItemAll(page, req.query.search, req.query.price);
  return res.status(data.status).send(data.data);
});

commonRouter.get("/tags", async (req, res) => {
  const data = await getTags();
  return res.status(data.status).send(data.data);
});

commonRouter.get("/seller", async (req, res) => {
  const data = await getSeller(req.query.sellerId);
  return res.status(data.status).send(data.data);
});

commonRouter.get("/seller/all", async (req, res) => {
  let page =
    req.query.page === null || req.query.page === undefined
      ? "0"
      : req.query.page;
  const data = await getAllSellers(page, req.query.search);
  return res.status(data.status).send(data.data);
});

module.exports = commonRouter;
