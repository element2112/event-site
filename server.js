const express = require('express');
const app = express();
// const pool = require('./connection');
const pool = require('dotenv').config();
const PORT = process.env.PORT? process.env.PORT : 4000;

const users = require('./api/users');
const comments = require('./api/comments');
const location = require('./api/location');
const rso = require('./api/rso');
const university = require('./api/university');
const events = require('./api/events');

// Routes
app.use('/api/users', users);
app.use('/api/comments', comments);
app.use('/api/location', location);
app.use('/api/rso', rso);
app.use('/api/university', university);
app.use('/api/events', events);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT);

console.log("Server is running on port " + PORT);