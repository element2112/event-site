const express = require('express');
const router = express.Router();
const pool = require('../connection');
// const gravatar = require('gravatar');
// const bcrypt = require('bcryptjs');
// const { check, validationResult } = require('express-validator/check');

// router.use(express.json());

router.get('/testlocation', (req, res,err) => res.json("location Works"));


/**
 * @route	GET  api/location/getlocations
 * @desc	Get all locations
 * @access	public
*/
router.get('/getlocations', (req, res) => {
    let sql = 'SELECT * from locations';
  
    pool.query(sql, (err, results) => {
      if(err) throw err;
      res.send(results);
      console.log('locations returned');
    })  
});

/**
 * @route	GET  api/location/getlocation/:id
 * @desc	Get a location
 * @access	public
*/
router.get('/getlocations/:id', (req, res) => {
  
  var id = req.params.id;
  
  let sql = 'SELECT * from locations WHERE location_id = ?';

  pool.query(sql, id, (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log(' 1 location returned');
  })  
});

/**
 * @route	post  api/location/addlocation
 * @desc	add a location
 * @access	public
*/
router.post('/addlocation', (req, res) => {
  
  var fields = {
    location_id: req.body.location_id,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    building: req.body.building,
    room: req.body.room,
    name: req.body.name
  };

  let sql = "INSERT INTO locations SET ?";

  pool.query(sql, fields, (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log('1 location added');
  })  
});


/**
 * @route	post  api/location/deletelocation
 * @desc	delete a location
 * @access	public
*/
router.delete('/deletelocation/:id', (req, res) => {
  
  var id = req.params.id;

  let sql = "DELETE FROM locations WHERE location_id = ?";

  pool.query(sql, id, (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log('location deleted');
  })  
});
  

module.exports = router;