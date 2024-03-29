const express = require('express');
const app = express();
const cors = require("cors");
// const pool = require('./connection');
const router = express.Router();
const pool = require('dotenv').config();
const bodyParser = require('body-parser');
const PORT = process.env.PORT? process.env.PORT : 4000;


app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use("*", cors());

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

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
      error: {
          message: err.message
      }
  });
});

app.listen(PORT);

console.log("Server is running on port " + PORT);