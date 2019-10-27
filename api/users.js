const express = require('express');
const router = express.Router();
const pool = require('../connection');

// parse all JSON coming into these routes
// router.use(express.json());

/**
 * @route	GET  api/users/test
 * @desc	Tests users route
 * @access	public
*/
router.get('/testusers', (req, res,err) => res.json("users Works"));


/**
 * @route	GET  api/users/login
 * @desc	Get all users (admins/superadmins only)
 * @access	public
*/
router.get('/admins', (req, res) => {
  let sql = 'SELECT * from users';

  pool.query(sql, (err, results) => {
    if(err) throw err;
    res.send(results);
  })  
});

/**
 * @route	GET  api/users/user:id
 * @desc	Get specific user
 * @access	public
*/
router.get('/login', (req, res) => {
  let sql = 'SELECT * from users WHERE user_id = 5555';

  pool.query(sql, (err, results) => {
    if(err) throw err;
    res.send(results);
  })  
});


/**
 * @route	POST  api/users/registeruser
 * @desc	create a user
 * @access	public
*/

router.post('/registeruser', (req, res) => {
  var sql = "INSERT INTO users (user_id, first_name, last_name, email, password, university_id) VALUES ('5555', 'Ronda', 'bland', 'rondabland@yahoo.com', 'windyday123', '3333')";

  pool.query(sql, (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log("1 record inserted");
  });

});


/**
 * @route	DELETE  api/users/deleteuser
 * @desc	delete a user
 * @access	public
*/
router.delete('/deleteuser', (req, res) => {
  let sql = "DELETE FROM users WHERE user_id = 5556"

  pool.query(sql, (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log("1 record deleted");
  });

});



module.exports = router;