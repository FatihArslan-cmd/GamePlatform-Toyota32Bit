const express = require('express');
const { sessionConfig } = require('./config/sessionConfig');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const http = require('http');
const cors = require('cors');
const WebsocketManager = require('./websocket/websocketManager'); // Ensure path is correct

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

// 1. Instantiate WebsocketManager
const websocketManagerInstance = new WebsocketManager(server); // Pass the server instance during creation

// 2. Store the instance in app.set
app.set('WebsocketManager', websocketManagerInstance);

// 3. (Remove the function call - initialization is likely in constructor now or a separate method if needed)
// WebsocketManager(server); // REMOVE THIS LINE

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});