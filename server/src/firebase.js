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
const ITEM_ADMIN_DOC = "item";
const ADMIN_COLLECTION = "admin";
const PAGINATION_LIMIT = 20;

module.exports = {
  BUYER_COLLECTION,
  SELLER_COLLECTION,
  db,
  admin,
  fileStore,
  ITEM_COLLECTION,
  ITEM_ADMIN_DOC,
  ADMIN_COLLECTION,
  PAGINATION_LIMIT,
};
