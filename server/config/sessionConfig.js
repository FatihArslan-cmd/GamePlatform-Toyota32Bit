const session = require('express-session');

const MemoryStore = session.MemoryStore;
const sessionStore = new MemoryStore();

const sessionConfig = session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
});

module.exports = { sessionConfig, sessionStore };
