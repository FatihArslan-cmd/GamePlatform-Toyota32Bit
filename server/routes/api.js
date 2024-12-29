const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  req.session.views = (req.session.views || 0) + 1;
  res.json({ message: 'Hello from Express!', views: req.session.views });
});

module.exports = router;
