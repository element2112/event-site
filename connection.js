const mysql = require('mysql');

// create a .env file in root and manually insert the db credentials. add the .env to gitignore to protect from github
/*

host=hostname
user=username,
password=pwd,
database=dbname

*/
const pool = mysql.createPool({
  host: process.env.host,
  user: process.env.username,
  password: process.env.password,
  database: process.env.database,
  connectionLimit: 10
});

module.exports = pool;
