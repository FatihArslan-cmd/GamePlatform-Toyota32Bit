const crypto = require('crypto');
const users = require('../utils/users');
const { sessionStore } = require('../config/sessionConfig');

const generateFriendCode = (req, res) => {
  const userId = req.user.id;
  const now = Date.now();
  const limitDuration = 60 * 1000;
  const maxRequests = 3; 

  sessionStore.get(userId, (err, session) => {
    if (err) {
      console.error('Session error', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

      const requestCounts = session?.requestCounts || { generateFriendCode: [] };
       
       requestCounts.generateFriendCode = requestCounts.generateFriendCode.filter(timestamp => timestamp > now - limitDuration)

       if (requestCounts.generateFriendCode.length >= maxRequests) {
           return res.status(429).json({ message: `Too many requests. Please try again in ${Math.ceil((requestCounts.generateFriendCode[0] - (now-limitDuration))/1000)} seconds.` });
        }

        requestCounts.generateFriendCode.push(now);

    const code = crypto.randomBytes(4).toString('hex'); 
    const expiresAt = Date.now() + 5 * 60 * 1000; // Kodun geçerlilik süresi (5 dakika)


     const friendRequests = session?.friendRequests || {};
        friendRequests[code] = { userId, expiresAt };

        sessionStore.set(userId, { ...session, friendRequests, requestCounts }, (err) => {
            if (err) {
              console.error('Session error', err);
              return res.status(500).json({ message: 'Internal Server Error' });
            }
              res.json({
                  message: 'Friend code generated',
                  friendCode: code,
              });
        });
  });
};


const addFriend = (req, res) => {
    const { friendCode } = req.body;
    const currentUserId = req.user.id;
    
    sessionStore.get(currentUserId, (err, session)=>{
        if(err){
            console.error('Session error', err)
                return res.status(500).json({message:'Internal Server Error'})
        }

            const friendRequests = session?.friendRequests || {};
            const friendLists = session?.friendLists || {};
            const friendRequest = friendRequests[friendCode];
        
        if (!friendCode || !friendRequest) {
                return res.status(400).json({ message: 'Invalid or expired friend code.' });
            }
    
            if (friendRequest.expiresAt < Date.now()) {
                delete friendRequests[friendCode]; // Kodu sil
                sessionStore.set(currentUserId, {...session, friendRequests}, (err)=>{
                  if(err){
                    console.error('Session error', err)
                      return res.status(500).json({message:'Internal Server Error'})
                  }
                  return res.status(400).json({ message: 'Expired friend code.' });
              })
    
           return;
        }
            const targetUserId = friendRequest.userId;
            if (targetUserId === currentUserId) {
                return res.status(400).json({ message: 'Cannot add yourself.' });
            }
            if(!friendLists[currentUserId]){
                friendLists[currentUserId] = [];
            }
            if(!friendLists[targetUserId]){
                friendLists[targetUserId] = [];
            }
    
            friendLists[currentUserId].push(targetUserId);
            friendLists[targetUserId].push(currentUserId);
             delete friendRequests[friendCode]; // Kodu sil
    
            sessionStore.set(currentUserId, {...session, friendLists, friendRequests }, (err)=>{
               if(err){
                  console.error('Session error', err)
                 return res.status(500).json({message:'Internal Server Error'})
              }
              return res.status(200).json({ message: 'Friend added successfully.' });
            })
    
    })
};

const getUserFriends = (req, res) => {
    const userId = req.user.id;
    sessionStore.get(userId, (err, session)=>{
        if(err){
            console.error('Session error', err)
                return res.status(500).json({message:'Internal Server Error'})
        }
            const friendLists = session?.friendLists || {};
    
            const friendIds = friendLists[userId] || [];
            const friends = friendIds.map(friendId => {
                for (const username in users) {
                  if (users[username].id === friendId) {
                    return {
                      username,
                      id: friendId,
                      profilePhoto: users[username].profilePhoto,
                    }
                  }
                }
                return null;
              }).filter(Boolean); 
    
            res.status(200).json({ friends });
    
    })
};
const removeFriend = (req, res) => {
    const currentUserId = req.user.id;
    const targetUserId = parseInt(req.params.targetUserId);
    
    sessionStore.get(currentUserId, (err, session)=>{
        if(err){
            console.error('Session error', err)
                return res.status(500).json({message:'Internal Server Error'})
        }
            const friendLists = session?.friendLists || {};
        
        if (!friendLists[currentUserId] || !friendLists[targetUserId]) {
            return res.status(404).json({ message: 'Friend not found.' });
        }
          friendLists[currentUserId] = friendLists[currentUserId].filter(id => id !== targetUserId)
          friendLists[targetUserId] = friendLists[targetUserId].filter(id => id !== currentUserId)
    
        sessionStore.set(currentUserId, {...session, friendLists}, (err)=>{
            if(err){
               console.error('Session error', err)
              return res.status(500).json({message:'Internal Server Error'})
           }
           res.status(200).json({ message: 'Friend removed successfully.' });
        })
    })
};


module.exports = { generateFriendCode, addFriend, getUserFriends, removeFriend };