const mysql = require('mysql');

const pool = mysql.createPool({
  host: '#',
  user: '#',
  password: '#',
  port: '3306',
  database: 'college_events',
  connectionLimit: 10
});

module.exports = pool;
