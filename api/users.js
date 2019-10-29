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
router.get('/getusers', (req, res) => {
  let sql = 'SELECT * from users';

  pool.query(sql, (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log("all records received");
  })  
});

/**
 * @route	GET  api/users/user:id
 * @desc	Get specific user
 * @access	public
*/
router.get('/login/:id', (req, res) => {
  
  var id = req.params.id;
  
  let sql = 'SELECT * from users WHERE user_id = ?';

  pool.query(sql, id, (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log("1 record returned");
  })  
});


/**
 * @route	POST  api/users/registeruser
 * @desc	create a user
 * @access	public
*/

router.post('/registeruser', (req, res) => {
  
  var fields = {
    user_id: req.body.user_id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    university_id: req.body.university_id
  }
  
  let sql = "INSERT INTO users SET ?";

  pool.query(sql, fields, (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log("1 records inserted");
  });

});

/**
 * @route	DELETE  api/users/deleteuser
 * @desc	delete a user
 * @access	public
*/
router.delete('/deleteuser/:id', (req, res) => {
  
  var id = req.params.id;
  
  let sql = "DELETE FROM users WHERE user_id = ?"

  pool.query(sql, id, (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log("1 record deleted");
  });

});



module.exports = router;