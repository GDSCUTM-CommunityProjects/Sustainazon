const admin = require("firebase-admin");
const serviceAccount = require("../serverAccountKey.json");
require("dotenv").config();

// initialize firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.STORAGE_URL,
});

// get reference to firebase database
const db = admin.firestore();
const fileStore = admin.storage().bucket();

const BUYER_COLLECTION = "buyer";
const SELLER_COLLECTION = "seller";
const ITEM_COLLECTION = "items";
const ORDER_COLLECTION = "orders";
const PAGINATION_LIMIT = 20;
const ADMIN_COLLECTION = "admin";
const TAGS_DOC = "tags";
const pointsCalculator = (numTags, price) => {
  let pricePoints = Math.ceil(price * 0.01);
  if (pricePoints > 100) pricePoints = 100;
  return numTags * 100 + pricePoints;
};
const pointsPriceCalculator = (numTags, price) => {
  let pricePoints = Math.ceil((1 / price) * 100);
  if (pricePoints > 1000) pricePoints = 1000;
  return numTags * 1000 + pricePoints;
};

module.exports = {
  BUYER_COLLECTION,
  SELLER_COLLECTION,
  db,
  admin,
  fileStore,
  ITEM_COLLECTION,
  ORDER_COLLECTION,
  PAGINATION_LIMIT,
  ADMIN_COLLECTION,
  TAGS_DOC,
  pointsCalculator,
  pointsPriceCalculator,
};
