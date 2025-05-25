const admin = require("firebase-admin");
const serviceAccount = require("./gamecenter-a93db-firebase-adminsdk-fbsvc-f31bd00abd.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;