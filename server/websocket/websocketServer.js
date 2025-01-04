const WebSocket = require('ws');
const session = require('express-session');

const initializeWebSocketServer = (server, sessionConfig) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws, req) => {
    sessionConfig(req, {}, () => {
      const sessionId = req.session.id;

      console.log(`New WebSocket connection: Session ID - ${sessionId}`);

      ws.on('message', (message) => {
        console.log('Received:', message);

        // Mesajı oturuma kaydet
        if (!req.session.messages) {
          req.session.messages = [];
        }
        req.session.messages.push(message);
        req.session.save();

        // Mesajı diğer istemcilere gönder
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });

        // Gönderen istemciye geri bildirim
        ws.send(`You: ${message}`);
      });

      ws.on('close', () => {
        console.log(`WebSocket connection closed: Session ID - ${sessionId}`);
      });
    });
  });

  return wss;
};

module.exports = initializeWebSocketServer;
