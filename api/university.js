const express = require('express');
const router = express.Router();
const pool = require('../connection');
// const gravatar = require('gravatar');
// const bcrypt = require('bcryptjs');
// const { check, validationResult } = require('express-validator/check');

// router.use(express.json());

/**
 * @route	GET  api/university/testuniversity
 * @desc	Tests users route
 * @access	public
*/
router.get('/testuniversity', (req, res,err) => res.json("university Works"));

/**
 * @route	GET  api/university/
 * @desc	Get all universities
 * @access	public
*/
router.get('/', (req, res) => {
    let sql = 'SELECT * from university';
  
    pool.query(sql, (err, results) => {
      if(err) throw err;
      res.send(results);
    });
  });

/**
 * @route	POST  api/university/registeruni
 * @desc	add uni
 * @access	public
*/
router.post('/registeruni', (req, res) => {
  let sql = "INSERT INTO universities (university_id, name, location, description, email_domain) VALUES ('123456', 'fsu', 'florida', 'school stuff', 'aschool@aol.com')";

  pool.query(sql, (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log("1 record inserted");
  });

});

/**
 * @route	DELETE  api/university/deleteuni
 * @desc	delete uni
 * @access	public
*/
router.delete('/deleteuni', (req, res) => {
  let sql = "DELETE FROM universities WHERE university_id = 123456"

  pool.query(sql, (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log("1 record inserted");
  });

});
  
module.exports = router;