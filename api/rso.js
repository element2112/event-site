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
router.get('/getrso', (req, res) => {
  let sql = 'SELECT * from rso';

  pool.query(sql, (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log('all rso events returned');
  })  
});

/**
 * @route	GET  api/rso/allrso
 * @desc	Get an rsos
 * @access	public
*/
router.get('/getrso/:id', (req, res) => {
  
  var id = req.params.id;

  let sql = 'SELECT * from rso WHERE rso_id = ?';

  pool.query(sql, id, (err, results) => {
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

  var fields = {
    rso_id: req.body.rso_id,
    name: req.body.name,
    admin: req.body.name,
    university: req.body.university
  }

  let sql = 'INSERT INTO rso SET ?';

pool.query(sql, fields, (err, results) => {
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
router.delete('/deleterso/:id', (req, res) => {

  var id = req.params.id;

  let sql = 'DELETE FROM rso WHERE rso_id = ?';

  pool.query(sql, id, (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log('1 rso deleted');
  });
  
});
  
module.exports = router;