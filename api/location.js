const express = require('express');
const router = express.Router();
const pool = require('../connection');
// const gravatar = require('gravatar');
// const bcrypt = require('bcryptjs');
// const { check, validationResult } = require('express-validator/check');

// router.use(express.json());

router.get('/testlocation', (req, res,err) => res.json("location Works"));


/**
 * @route	GET  api/location/totallocations
 * @desc	Get all locations
 * @access	public
*/
router.get('/locationsall', (req, res) => {
    let sql = 'SELECT * from locations';
  
    pool.query(sql, (err, results) => {
      if(err) throw err;
      res.send(results);
      console.log('locations returned');
    })  
  });

/**
 * @route	post  api/location/addlocation
 * @desc	add a location
 * @access	public
*/
router.post('/addlocation', (req, res) => {
  let sql = "";

  pool.query(sql, (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log('location added');
  })  
});


/**
 * @route	post  api/location/deletelocation
 * @desc	delete a location
 * @access	public
*/
router.delete('/deletelocation', (req, res) => {
  let sql = "";

  pool.query(sql, (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log('location deleted');
  })  
});
  

module.exports = router;