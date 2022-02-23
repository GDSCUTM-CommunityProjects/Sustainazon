const admin = require("firebase-admin");
const serviceAccount = require("./serverAccountKey.json");

// initialize firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: databaseURL,
});

// get reference to firebase database
const db = admin.database();

module.exports = { db, admin };
