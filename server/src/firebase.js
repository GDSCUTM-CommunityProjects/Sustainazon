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
const db = admin.database();
const fileStore = admin.storage().bucket();

module.exports = { db, admin, fileStore };
