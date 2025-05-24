const admin = require("../firebase/firebaseAdmin");

const saveToken = (req, res) => {
  const fcmToken = req.body.fcmToken;

  if (!fcmToken) {
    return res.status(400).json({ message: "FCM token is required" });
  }

  if (!req.session.fcmTokens) {
    req.session.fcmTokens = [];
  }

  if (!req.session.fcmTokens.includes(fcmToken)) {
    req.session.fcmTokens.push(fcmToken);
  }

  res.status(200).json({ message: "FCM token saved successfully" });
};

const sendTestNotification = async (req, res) => {
  const sessionTokens = req.session.fcmTokens;

  if (!sessionTokens || sessionTokens.length === 0) {
    return res.status(404).json({ message: "No FCM tokens found for this session" });
  }

  const message = {
    notification: {
      title: "Test Bildirimi",
      body: "Bu, sunucunuzdan gönderilen bir test bildirimdir!",
    },
    data: {
      customKey1: "customValue1",
      customKey2: "customValue2",
    },
    tokens: sessionTokens,
  };

  try {
    const response = await admin.messaging().sendEachForMulticast(message);

    const validTokens = [];
    response.responses.forEach((resp, index) => {
        if (resp.success) {
            validTokens.push(message.tokens[index]);
        } else {
            console.error(`Failed to send to token ${message.tokens[index]}:`, resp.error);
        }
    });

    if (validTokens.length !== sessionTokens.length) {
         req.session.fcmTokens = validTokens;
    }

    res.status(200).json({
      message: "Notifications sent",
      successCount: response.successCount,
      failureCount: response.failureCount,
    });

  } catch (error) {
    console.error('Error sending messages:', error);
    res.status(500).json({ message: "Error sending notifications", error: error.message });
  }
};

module.exports = {
  saveToken,
  sendTestNotification,
};