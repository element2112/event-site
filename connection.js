const mysql = require('mysql');

// create a .env file in root and manually insert the db credentials. add the .env to gitignore to protect from github
/*

host=hostname
user=username
password=pwd
database=dbname

*/

// console.log(process.env.user);

const pool = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  connectionLimit: process.env.connectionLimit,
  dateStrings: true
});

module.exports = pool;
