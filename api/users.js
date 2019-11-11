const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const pool = require('../connection');
const uni = require('./university');

router.use('/university', uni);

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
router.get('/getusers/login/:id', (req, res) => {


  var id = req.params.id;
  
  let sql = 'SELECT * from users WHERE user_id = ?';

  pool.query(sql, id, (err, results) => {
      if(err) throw err;
      res.send(results);
      console.log("1 user returned");
    });

});

/**
 * @route	GET  api/users/getSuperAdmins
 * @desc	Get all superadmins
 * @access	public
*/
router.get('/superadmins/:id', (req, res) => {
  const id = req.params.id;

  let sql = 'SELECT * from super_admins WHERE user_id = ' + id;

  pool.query(sql, (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log("all records received");
  })

});


/**
 * @route	POST  api/users/registeruser
 * @desc	create a user
 * @access	public
*/

router.post('/registeruser', (req, res) => {
  
  const fields = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    uni_id: req.body.uni_id
  }
  
  let sql = "INSERT INTO users SET ?";

  pool.query(sql, fields, (err, results) => {
    if(err) throw err;
    res.send({user_id: results.insertId, uni_id: req.body.uni_id});
    console.log("1 user added");
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