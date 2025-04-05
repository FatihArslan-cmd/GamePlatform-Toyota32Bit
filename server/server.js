const express = require('express');
const { sessionConfig } = require('./config/sessionConfig');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const http = require('http');
const cors = require('cors');
const WebsocketManager = require('./websocket/websocketManager');
const lobbyManager = require('./memory/LobbyStore/lobbyManager'); 

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

setInterval(lobbyManager.cleanupEventLobbies, 60 * 1000);
setInterval(lobbyManager.cleanupInactiveLobbies, 60 * 1000);


const websocketManagerInstance = new WebsocketManager(server); 

app.set('WebsocketManager', websocketManagerInstance);


server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});