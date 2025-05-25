const admin = require("../firebase/firebaseAdmin");

let storedTokens = [];

const saveToken = (req, res) => {
  const fcmToken = req.body.fcmToken;

  if (!fcmToken) {
    return res.status(400).json({ message: "FCM token is required" });
  }

  if (typeof fcmToken !== 'string' || fcmToken.trim() === '') {
       console.warn(`Attempted to save invalid FCM token format:`, fcmToken);
       return res.status(400).json({ message: "Invalid FCM token format." });
  }

  if (!storedTokens.includes(fcmToken)) {
    storedTokens.push(fcmToken);
    console.log(`FCM token added to in-memory storage. Total tokens: ${storedTokens.length}`);
    res.status(200).json({ message: "FCM token saved successfully to server storage" });
  } else {
    console.log(`FCM token already exists in in-memory storage.`);
    res.status(200).json({ message: "FCM token already exists in server storage" });
  }
};

const sendNotificationToSpecificToken = async (req, res) => {
  const { fcmToken, title, body, data } = req.body;

  if (!fcmToken) {
    return res.status(400).json({ message: "Target FCM token is required." });
  }

  const message = {
    notification: {
      title: title || "Default Notification Title",
      body: body || "Default Notification Body",
    },
    data: {
      source: "specific-send",
      timestamp: new Date().toISOString(),
      ...data,
    },
    token: fcmToken,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Notification sent successfully to specific token:", response);
    res.status(200).json({
      message: "Notification sent successfully to specific token",
      messageId: response,
    });
  } catch (error) {
    console.error("Error sending notification to specific token:", error);

    const isTokenInvalidOrUnregistered = error.errorInfo &&
        (error.errorInfo.code === 'messaging/invalid-argument' ||
         error.errorInfo.code === 'messaging/registration-token-not-registered' ||
         error.errorInfo.code === 'messaging/invalid-registration-token' ||
         error.errorInfo.code === 'messaging/unregistered');

    if (isTokenInvalidOrUnregistered) {
        const initialCount = storedTokens.length;
        storedTokens = storedTokens.filter(token => token !== fcmToken);
        if (storedTokens.length < initialCount) {
            console.warn(`Removed invalid token ${fcmToken} from in-memory storage after send failure.`);
        }
        return res.status(400).json({
            message: `Target FCM token is invalid or unregistered. It has been removed from storage if present.`,
            errorCode: error.errorInfo.code,
            errorDetail: error.errorInfo.message,
            tokenAttempted: fcmToken,
        });
    } else {
        res.status(500).json({
            message: "Error sending notification to specific token",
            errorCode: error.errorInfo ? error.errorInfo.code : 'unknown',
            errorDetail: error.message,
            tokenAttempted: fcmToken,
        });
    }
  }
};

const getAllServerTokens = (req, res) => {
  if (storedTokens.length === 0) {
    return res.status(200).json({ message: "No FCM tokens found in server storage.", count: 0, tokens: [] });
  }

  res.status(200).json({
    message: "FCM tokens retrieved successfully from server storage.",
    count: storedTokens.length,
    tokens: storedTokens
  });
};

const sendTestNotificationToAll = async (req, res) => {
  const tokenArray = storedTokens;

  if (tokenArray.length === 0) {
     return res.status(404).json({ message: "No FCM tokens found in server storage to send notification to." });
  }

  const tokensToSend = tokenArray.slice(0, 500);
  const totalTokensFound = tokenArray.length;
  const tokensConsideredForSend = tokensToSend.length;


  const message = {
    notification: {
      title: "Test Notification (To All Stored)",
      body: `This is a test notification sent to ${tokensConsideredForSend} out of ${totalTokensFound} tokens stored on the server!`,
    },
    data: {
      source: "send-to-all",
      totalTokensFound: totalTokensFound.toString(),
      tokensConsideredForSend: tokensConsideredForSend.toString(),
      timestamp: new Date().toISOString(),
    },
    tokens: tokensToSend,
  };

  try {
    const response = await admin.messaging().sendEachForMulticast(message);

    const successfulSends = response.responses.filter(r => r.success).length;
    const failedSends = response.responses.filter(r => !r.success).length;

    console.log(`[SendToAll] Attempted to send test notification to ${tokensConsideredForSend} unique tokens.`);
    console.log(`[SendToAll] Success count: ${successfulSends}, Failure count: ${failedSends}`);

    res.status(200).json({
      message: "Test notification send initiated to stored tokens.",
      totalTokensFound: totalTokensFound,
      tokensConsideredForSend: tokensConsideredForSend,
      successCount: successfulSends,
      failureCount: failedSends,
    });

  } catch (error) {
    console.error("[SendToAll] Error sending test notification to all tokens:", error);
    res.status(500).json({
        message: "Error sending test notification to all tokens",
        errorCode: error.errorInfo ? error.errorInfo.code : 'unknown',
        errorDetail: error.message
    });
  }
};


const removeToken = (req, res) => {
  const fcmTokenToRemove = req.body.fcmToken;

  if (!fcmTokenToRemove) {
    return res.status(400).json({ message: "FCM token to remove is required." });
  }

   if (typeof fcmTokenToRemove !== 'string' || fcmTokenToRemove.trim() === '') {
       console.warn(`Attempted to remove invalid FCM token format:`, fcmTokenToRemove);
       return res.status(400).json({ message: "Invalid FCM token format for removal." });
   }

  if (storedTokens.length === 0) {
    console.log(`Attempted to remove token ${fcmTokenToRemove}, but in-memory storage is empty.`);
    return res.status(200).json({
      message: "No FCM tokens found in server storage.",
      explanation: "Cannot remove token as the list is empty.",
      tokenAttempted: fcmTokenToRemove
    });
  }

  const initialTokenCount = storedTokens.length;
  storedTokens = storedTokens.filter(token => token !== fcmTokenToRemove);

  if (storedTokens.length < initialTokenCount) {
    console.log(`Removed token ${fcmTokenToRemove} from in-memory storage.`);
    res.status(200).json({
      message: "FCM token removed successfully from server storage.",
      tokenRemoved: fcmTokenToRemove,
      remainingTokensCount: storedTokens.length
    });
  } else {
     console.log(`Attempted to remove token ${fcmTokenToRemove}, but it was not found in in-memory storage.`);
    res.status(200).json({
      message: "FCM token not found in server storage.",
      explanation: "The specified token was not present in the storage list.",
      tokenAttempted: fcmTokenToRemove
    });
  }
};


module.exports = {
  saveToken,
  sendNotificationToSpecificToken,
  getAllServerTokens,
  sendTestNotificationToAll,
  removeToken,
};