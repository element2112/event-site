const express = require('express');
const app = express();
const pool = require('./connection');
const PORT = process.env.PORT? process.env.PORT : 4000;

const users = require('./api/users');

// Routes
app.use('/api/users', users);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT);

console.log("Server is running on port " + PORT);