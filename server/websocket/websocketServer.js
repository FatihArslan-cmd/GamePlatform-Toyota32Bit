const WebSocket = require('ws');

const initializeWebSocketServer = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws, req) => {
    console.log('New WebSocket connection');

    ws.on('message', (message) => {
      console.log('Received:', message);
      ws.send(`Echo: ${message}`);
    });

    ws.on('close', () => {
      console.log('WebSocket connection closed');
    });
  });

  return wss;
};

module.exports = initializeWebSocketServer;
