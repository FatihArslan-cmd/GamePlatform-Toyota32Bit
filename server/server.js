const express = require('express');
const { sessionConfig } = require('./config/sessionConfig');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const http = require('http');
const cors = require('cors');
const WebsocketManager = require('./websocket/websocketManager');

const app = express();
const server = http.createServer(app);

const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(sessionConfig);
app.use(cors({
    origin: 'http://192.168.0.104:3000',
    credentials: true,
}));
app.use('/api', routes);

WebsocketManager(server);

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});