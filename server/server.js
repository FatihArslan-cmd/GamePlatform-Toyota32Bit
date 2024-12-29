const express = require('express');
const { sessionConfig } = require('./config/sessionConfig');
const routes = require('./routes/api');

const app = express();
const port =  3000;

app.use(express.json());
app.use(sessionConfig);
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
