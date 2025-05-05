// Örnek: config/redisClient.js
const Redis = require('ioredis');
require('dotenv').config(); // Redis şifresi vb. varsa

// Temel bağlantı (localhost, varsayılan port)
const redisClient = new Redis({
    // host: process.env.REDIS_HOST || '127.0.0.1', // Gerekirse host belirtin
    // port: process.env.REDIS_PORT || 6379,       // Gerekirse port belirtin
    // password: process.env.REDIS_PASSWORD,       // Gerekirse şifre belirtin
    maxRetriesPerRequest: 3 // Bağlantı hatalarında tekrar deneme sayısı
});

redisClient.on('connect', () => {
    console.log('Redis client connected');
});

redisClient.on('error', (err) => {
    console.error('Redis client error:', err);
});

module.exports = redisClient;