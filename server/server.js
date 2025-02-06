const express = require('express');
const { sessionConfig } = require('./config/sessionConfig');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const http = require('http');
const initializeWebSocketServer = require('./websocket/websocketServer');
const cors = require('cors');

const app = express();

const server = http.createServer(app);

initializeWebSocketServer(server, sessionConfig); // sessionConfig'i gönder

const port = 3000;

app.use(express.json());
app.use(sessionConfig);
app.use('/api', routes);
app.use(cookieParser());

app.use(
  cors({
    origin: 'http://192.168.0.104:3000', 
    credentials: true, 
  })
);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});