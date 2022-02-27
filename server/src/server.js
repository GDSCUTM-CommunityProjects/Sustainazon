"use strict";
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const accountsRouter = require("./routes/acounts");

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

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
