// index.js
const express = require('express');
const { sessionConfig } = require('./config/sessionConfig');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const http = require('http');
const cors = require('cors');
const websocketServer = require('./websocket/websocket-server'); // WebSocket sunucusunu içe aktar

const app = express();
const server = http.createServer(app); // server tanımını buraya al

const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(sessionConfig);
app.use(cors({
    origin: 'http://192.168.0.104:3000', // Frontend adresiniz
    credentials: true,
}));
app.use('/api', routes);

websocketServer(server); // WebSocket sunucusunu HTTP sunucusuna bağla

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});