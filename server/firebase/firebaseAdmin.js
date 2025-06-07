const admin = require("firebase-admin");
const serviceAccount = require("./gamecenter-a93db-firebase-adminsdk-fbsvc-1dba394375.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;