const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'college-events.cgbnlnlzis7k.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'events#1',
  port: '3306',
  database: 'college_events',
  connectionLimit: 10
});

module.exports = pool;
