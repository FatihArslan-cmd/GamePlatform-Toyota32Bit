const session = require('express-session');
require('dotenv').config();

const MemoryStore = session.MemoryStore;
const sessionStore = new MemoryStore();

const sessionConfig = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
});

module.exports = { sessionConfig, sessionStore };
