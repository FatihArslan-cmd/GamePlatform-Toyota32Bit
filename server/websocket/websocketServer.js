// websocket/websocketServer.js
const WebSocket = require('ws');
const crypto = require('crypto');

function initializeWebSocketServer(server, sessionConfig) {
    const wss = new WebSocket.Server({ server });

    // Tüm kullanıcı bağlantılarını ve topic'leri saklamak için Map'ler
    const clients = new Map(); // Map<userId, WebSocket>
    const userTopics = new Map(); // Map<userId, Set<topicId>>
    const topics = new Map(); // Map<topicId, { id: string, name: string?}>

    wss.on('connection', (ws, req) => {
        // Oturum bilgisini al
       sessionConfig(req, {}, () => {
             const userId = req.session?.userId;
              if(!userId){
                 ws.close();
                 console.log('WebSocket connection closed because of no user id')
                 return;
             }
            console.log(`User ${userId} connected to WebSocket`);
            clients.set(userId, ws);
             userTopics.set(userId, new Set());

        ws.on('message', (message) => {
              try {
                    const parsedMessage = JSON.parse(message);
                     if (parsedMessage.type === 'joinTopic' && parsedMessage.topicId) {
                       joinTopic(userId, parsedMessage.topicId);

                  } else if (parsedMessage.type === 'message' && parsedMessage.topicId && parsedMessage.content) {
                    broadcastToTopic(userId, parsedMessage.topicId, parsedMessage.content);
                  }
                  else if(parsedMessage.type === 'createTopic' && parsedMessage.topicName){
                      const topic = createTopic(parsedMessage.topicName);
                        ws.send(JSON.stringify({type: 'topicCreated', topicId: topic.id, topicName: topic.name}));
                  }else {
                      console.warn('Invalid message format:', message);
                  }
               } catch (error) {
                  console.error('Error parsing message:', error);
               }
        });

         ws.on('close', () => {
                clients.delete(userId);
                userTopics.delete(userId);
                console.log(`User ${userId} disconnected from WebSocket`);
            });
        });
    });

    console.log('WebSocket server started');

       // Bir topic oluşturma metodu
     function createTopic(topicName){
          const newTopicId = crypto.randomUUID();
         const newTopic = {
             id:newTopicId,
             name: topicName
          }
        topics.set(newTopicId, newTopic);

        return newTopic;
      }

    // Bir kullanıcıyı bir topic'e ekleme metodu
       function joinTopic(userId, topicId) {

        const userTopicSet = userTopics.get(userId);
          if (userTopicSet) {
             userTopicSet.add(topicId);
         } else {
             userTopics.set(userId, new Set([topicId]));
         }

        console.log(`User ${userId} joined topic ${topicId}`);

       }

    // Bir topic'e mesaj yayınlama metodu
       function broadcastToTopic(senderUserId, topicId, content) {
          const topic = topics.get(topicId);
         if(!topic){
          return;
        }
           const messageToSend = JSON.stringify({
               type: 'message',
              fromUserId: senderUserId,
               content,
              topicId,
            topicName: topic.name
          });
          userTopics.forEach((topicSet, userId) => {
              if(topicSet.has(topicId)){
                  const client = clients.get(userId);
                if(client){
                   client.send(messageToSend);
                }
             }
            });
         }

}
module.exports = initializeWebSocketServer;