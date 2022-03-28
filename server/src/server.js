"use strict";
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const accountsRouter = require("./routes/accounts");
const manageAccountsRouter = require("./routes/manageAccounts");
const sellerRouter = require("./routes/seller");
const buyerRouter = require("./routes/buyer");
const commonRouter = require("./routes/common");

// starting the express server
const app = express();
const port = process.env.PORT || 5000;

// parse cookies and body and enable cors
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/accounts", accountsRouter);
app.use("/accounts/manage", manageAccountsRouter);
app.use("/seller", sellerRouter);
app.use("/buyer", buyerRouter);
app.use("/item", commonRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
