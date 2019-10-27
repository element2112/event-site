const express = require('express');
const router = express.Router();
const pool = require('../connection');
// const gravatar = require('gravatar');
// const bcrypt = require('bcryptjs');
// const { check, validationResult } = require('express-validator/check');

// router.use(express.json());

/**
 * @route	GET  api/users/test
 * @desc	Tests users route
 * @access	public
*/

router.get('/testrso', (req, res,err) => res.json("rso Works"));

/**
 * @route	GET  api/rso/allrso
 * @desc	Get all rsos
 * @access	public
*/
router.get('/allrso', (req, res) => {
  let sql = 'SELECT * from rso_event';

  pool.query(sql, (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log('all rso events returned');
  })  
});

/**
* @route	POST  api/rso/addrso
* @desc	add an rso
* @access	public
*/
router.post('/addrso', (req, res) => {
let sql = '';

pool.query(sql, (err, results) => {
  if(err) throw err;
  res.send(results);
  console.log('1 rso added');
})  
});


/**
* @route	delete  api/rso/deleterso
* @desc	delete an rso
* @access	public
*/
router.delete('/deleterso', (req, res) => {
let sql = '';

pool.query(sql, (err, results) => {
  if(err) throw err;
  res.send(results);
  console.log('1 rso deleted');
})  
});
  
module.exports = router;