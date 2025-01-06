const express = require('express');
const { sessionConfig } = require('./config/sessionConfig');
const routes = require('./routes/api');
const cookieParser = require('cookie-parser');
const http = require('http');
const initializeWebSocketServer = require('./websocket/websocketServer');
const cors = require('cors');

const app = express();

const server = http.createServer(app);

initializeWebSocketServer(server, sessionConfig);

const port = 3000;

app.use(express.json());
app.use(sessionConfig);
app.use('/api', routes);
app.use(cookieParser());

app.use(
  cors({
    origin: 'http://192.168.0.104:3000', // React Native uygulamanızın adresi
    credentials: true, // Çerezleri kabul etmek için
  })
);
// HTTP + WebSocket sunucusunu başlat
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
