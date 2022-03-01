const admin = require("firebase-admin");
const serviceAccount = require("../serverAccountKey.json");
require("dotenv").config();

// initialize firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
  storageBucket: process.env.STORAGE_URL,
});

// get reference to firebase database
const db = admin.firestore();
const fileStore = admin.storage().bucket();

const BUYER_COLLECTION = "buyer";
const SELLER_COLLECTION = "seller";

module.exports = {
  BUYER_COLLECTION,
  SELLER_COLLECTION,
  db,
  admin,
  fileStore,
};
