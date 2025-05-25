const admin = require("../firebase/firebaseAdmin");

let storedTokens = [];

const sendNotificationToTokens = async ({ tokens, title, body, data, sourceInfo }) => {
    if (!tokens || tokens.length === 0) {
        console.warn(`[sendNotificationToTokens] No tokens provided. Aborting send.`);
        return { successCount: 0, failureCount: 0, responses: [] };
    }

    const isMulticast = tokens.length > 1 || sourceInfo === 'send-to-all';

    const messagePayload = {
        notification: {
            title: title || "Yeni Bildirim",
            body: body || "Bir güncellemeniz var.",
        },
        data: {
            source: sourceInfo || 'internal',
            timestamp: new Date().toISOString(),
            ...data,
        },
        [isMulticast ? 'tokens' : 'token']: isMulticast ? tokens : tokens[0],
    };

    try {
        let response;
        if (isMulticast) {
            response = await admin.messaging().sendEachForMulticast(messagePayload);
             console.log(`[sendNotificationToTokens] Multicast send successful. Success: ${response.successCount}, Failure: ${response.failureCount}`);

             if (response.failureCount > 0) {
                 const tokensToRemove = [];
                 response.responses.forEach((resp, idx) => {
                     if (!resp.success) {
                         const failedToken = tokens[idx];
                         console.warn(`[sendNotificationToTokens] Failed to send to token ${failedToken}:`, resp.error);
                         const errorCode = resp.error.errorInfo?.code;
                         if (errorCode === 'messaging/invalid-argument' ||
                             errorCode === 'messaging/registration-token-not-registered' ||
                             errorCode === 'messaging/invalid-registration-token' ||
                             errorCode === 'messaging/unregistered') {
                              tokensToRemove.push(failedToken);
                         }
                     }
                 });

                 if (tokensToRemove.length > 0) {
                     console.warn(`[sendNotificationToTokens] Removing ${tokensToRemove.length} invalid tokens from storage.`);
                     const initialCount = storedTokens.length;
                     storedTokens = storedTokens.filter(item => !tokensToRemove.includes(item.fcmToken));
                     console.warn(`[sendNotificationToTokens] Removed ${initialCount - storedTokens.length} tokens. Remaining: ${storedTokens.length}`);
                 }
             }

        } else {
            response = await admin.messaging().send(messagePayload);
            console.log(`[sendNotificationToTokens] Single send successful to token: ${tokens[0]}`, response);
        }

        return response;

    } catch (error) {
        console.error("[sendNotificationToTokens] Error sending notification:", error);

         if (!isMulticast && tokens.length > 0) {
             const errorCode = error.errorInfo?.code;
             if (errorCode === 'messaging/invalid-argument' ||
                 errorCode === 'messaging/registration-token-not-registered' ||
                 errorCode === 'messaging/invalid-registration-token' ||
                 errorCode === 'messaging/unregistered') {
                 const failedToken = tokens[0];
                 console.warn(`[sendNotificationToTokens] Removing invalid token ${failedToken} from storage.`);
                 const initialCount = storedTokens.length;
                 storedTokens = storedTokens.filter(item => item.fcmToken !== failedToken);
                 console.warn(`[sendNotificationToTokens] Removed ${initialCount - storedTokens.length} token. Remaining: ${storedTokens.length}`);
             }
         }

        throw error;
    }
};

const sendNotificationToUser = async ({ targetUserId, title, body, data, sourceInfo }) => {
    const tokensForUser = storedTokens
        .filter(item => item.userId === targetUserId)
        .map(item => item.fcmToken);

    if (tokensForUser.length === 0) {
        console.log(`[sendNotificationToUser] No FCM tokens found for user ID: ${targetUserId}. Notification not sent.`);
        return { successCount: 0, failureCount: 0, message: `No FCM tokens found for user ID: ${targetUserId}` };
    }

    console.log(`[sendNotificationToUser] Found ${tokensForUser.length} tokens for user ID: ${targetUserId}. Attempting to send notification.`);

    try {
        const response = await sendNotificationToTokens({
            tokens: tokensForUser,
            title,
            body,
            data,
            sourceInfo: sourceInfo || 'user-specific',
        });
        return response;
    } catch (error) {
         console.error(`[sendNotificationToUser] Failed to send notification to user ID ${targetUserId}:`, error);
         throw error;
    }
};


const saveToken = (req, res) => {
  const { fcmToken, username } = req.body;

  if (!fcmToken || typeof fcmToken !== 'string' || fcmToken.trim() === '') {
    console.warn(`Attempted to save invalid or missing FCM token:`, fcmToken);
    return res.status(400).json({ message: "Valid FCM token is required." });
  }

  if (!username || typeof username !== 'string' || username.trim() === '') {
       console.warn(`Attempted to save token without a valid username:`, username);
       return res.status(400).json({ message: "Valid username is required." });
  }

  let foundUser = null;
  try {
       const users = require('../utils/users');
        for (const userKey in users) {
            if (userKey === username) {
                foundUser = {
                    id: users[userKey].id,
                    username: userKey,
                    profilePhoto: users[userKey].profilePhoto,
                    email: users[userKey].email
                };
                break;
            }
        }
  } catch (e) {
      console.error("Error loading or accessing users utility:", e);
      return res.status(500).json({ message: "Internal server error while verifying user." });
  }


  if (!foundUser) {
      console.warn(`Attempted to save token for non-existent username: ${username}`);
      return res.status(400).json({ message: `Username "${username}" not found.` });
  }

  const userId = foundUser.id;
  const userUsername = foundUser.username;

  const exists = storedTokens.some(item =>
    item.userId === userId && item.fcmToken === fcmToken
  );

  if (!exists) {
    const tokenData = { userId: userId, username: userUsername, fcmToken: fcmToken, timestamp: new Date().toISOString() };
    storedTokens.push(tokenData);
    console.log(`FCM token added: User "${userUsername}" (ID: ${userId}). Total entries: ${storedTokens.length}`);
    res.status(200).json({
      message: "FCM token saved successfully.",
      user: { id: userId, username: userUsername },
      totalEntries: storedTokens.length
    });
  } else {
    console.log(`FCM token already exists for user "${userUsername}" (ID: ${userId}).`);
     res.status(200).json({
      message: "FCM token already exists for this user.",
      user: { id: userId, username: userUsername },
      totalEntries: storedTokens.length
     });
  }
};


const sendNotificationToSpecificToken = async (req, res) => {
  const { fcmToken, title, body, data } = req.body;

  if (!fcmToken || typeof fcmToken !== 'string' || fcmToken.trim() === '') {
    return res.status(400).json({ message: "Target FCM token is required and must be a valid string." });
  }

  try {
    const response = await sendNotificationToTokens({
        tokens: [fcmToken],
        title,
        body,
        data,
        sourceInfo: 'specific-send',
    });

    console.log("Notification sent successfully to specific token:", fcmToken, response);
    res.status(200).json({
      message: "Notification sent successfully to specific token",
      messageId: response.messageId || response,
      tokenSentTo: fcmToken,
    });
  } catch (error) {
      const errorCode = error.errorInfo?.code;
      const isTokenInvalidOrUnregistered = errorCode === 'messaging/invalid-argument' ||
         errorCode === 'messaging/registration-token-not-registered' ||
         errorCode === 'messaging/invalid-registration-token' ||
         errorCode === 'messaging/unregistered';


      if (isTokenInvalidOrUnregistered) {
           return res.status(400).json({
                message: `Target FCM token is invalid or unregistered. It has been removed from storage if present.`,
                errorCode: errorCode,
                errorDetail: error.message,
                tokenAttempted: fcmToken,
            });
      } else {
            res.status(500).json({
                message: "Error sending notification to specific token",
                errorCode: errorCode || 'unknown',
                errorDetail: error.message,
                tokenAttempted: fcmToken,
            });
      }
  }
};

const getAllServerTokens = (req, res) => {
  if (storedTokens.length === 0) {
    return res.status(200).json({ message: "No FCM token entries found in server storage.", count: 0, items: [] });
  }

  res.status(200).json({
    message: "FCM token entries retrieved successfully from server storage.",
    count: storedTokens.length,
    items: storedTokens
  });
};

const sendTestNotificationToAll = async (req, res) => {
  const tokenArray = storedTokens.map(item => item.fcmToken);

  if (tokenArray.length === 0) {
     return res.status(404).json({ message: "No FCM tokens found in server storage to send notification to." });
  }

  const tokensToSend = tokenArray.slice(0, 500);
  const totalTokensFound = tokenArray.length;
  const tokensConsideredForSend = tokensToSend.length;

  try {
    const response = await sendNotificationToTokens({
        tokens: tokensToSend,
        title: "Test Bildirimi (Tüm Saklananlara)",
        body: `Bu, sunucuda saklanan ${totalTokensFound} benzersiz tokenden ${tokensConsideredForSend} tanesine gönderilen bir test bildirimidir!`,
        data: {
            source: "send-to-all",
            totalTokensFound: totalTokensFound.toString(),
            tokensConsideredForSend: tokensConsideredForSend.toString(),
        },
        sourceInfo: 'send-to-all',
    });

    res.status(200).json({
      message: "Test notification send initiated to stored tokens.",
      totalTokensFound: totalTokensFound,
      tokensConsideredForSend: tokensConsideredForSend,
      successCount: response.successCount,
      failureCount: response.failureCount,
    });

  } catch (error) {
      res.status(500).json({
        message: "Error initiating test notification send to all tokens",
        errorCode: error.errorInfo ? error.errorInfo.code : 'unknown',
        errorDetail: error.message
    });
  }
};

const removeToken = (req, res) => {
  const fcmTokenToRemove = req.body.fcmToken;

  if (!fcmTokenToRemove || typeof fcmTokenToRemove !== 'string' || fcmTokenToRemove.trim() === '') {
    console.warn(`Attempted to remove invalid or missing FCM token:`, fcmTokenToRemove);
    return res.status(400).json({ message: "Valid FCM token to remove is required." });
  }

  if (storedTokens.length === 0) {
    console.log(`Attempted to remove token ${fcmTokenToRemove}, but in-memory storage is empty.`);
    return res.status(200).json({
      message: "No FCM token entries found in server storage.",
      explanation: "Cannot remove token as the list is empty.",
      tokenAttempted: fcmTokenToRemove,
      remainingEntriesCount: 0
    });
  }

  const entriesBefore = storedTokens.length;
  storedTokens = storedTokens.filter(item => item.fcmToken !== fcmTokenToRemove);
  const entriesRemoved = entriesBefore - storedTokens.length;

  if (entriesRemoved > 0) {
    console.log(`Removed ${entriesRemoved} entries associated with token ${fcmTokenToRemove} from in-memory storage.`);
    res.status(200).json({
      message: "FCM token entries removed successfully from server storage.",
      tokenRemoved: fcmTokenToRemove,
      entriesRemovedCount: entriesRemoved,
      remainingEntriesCount: storedTokens.length
    });
  } else {
     console.log(`Attempted to remove token ${fcmTokenToRemove}, but no entries were found matching that token string.`);
    res.status(200).json({
      message: "FCM token not found in server storage.",
      explanation: "No entries matching the specified token were present in the storage list.",
      tokenAttempted: fcmTokenToRemove,
      remainingEntriesCount: storedTokens.length
    });
  }
};


module.exports = {
  saveToken,
  sendNotificationToSpecificToken,
  getAllServerTokens,
  sendTestNotificationToAll,
  removeToken,
  sendNotificationToUser,
};