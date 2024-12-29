const express = require('express');
const http = require('http');

const bodyParser = require('./middleware/bodyParser');
const cookieParser = require('./middleware/cookieParser');
const sessionMiddleware = require('./middleware/sessionMiddleware');

const apiRoutes = require('./routes/api');

const initializeWebSocketServer = require('./websocket/websocketServer');

const app = express();
const port = 3000;

app.use(bodyParser);
app.use(cookieParser);
app.use(sessionMiddleware);

app.use('/api', apiRoutes);

const server = http.createServer(app);

initializeWebSocketServer(server);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
