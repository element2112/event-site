const express = require('express');
const router = express.Router();
const pool = require('../connection');
// const gravatar = require('gravatar');
// const bcrypt = require('bcryptjs');
// const { check, validationResult } = require('express-validator/check');
// router.use(express.json());

/* --------------------------------------------------- */

router.get('/testevents', (req, res,err) => res.json("events Works"));

/**
 * @route	GET  api/events
 * @desc	Get all events
 * @access	public
 * 
*/
router.get('/allevents', (req, res) => {
  let sql = 'SELECT * from events';

  pool.query(sql, (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log('all events returned')
  })  
});

/* --------------------------------------------------- */

// PUBLIC EVENTS

/**
 * @route	GET  api/events/publicevents
 * @desc	Get all public events
 * @access	public
*/
router.get('/publicevents', (req, res) => {
    let sql = 'SELECT * from public_events';
  
    pool.query(sql, (err, results) => {
      if(err) throw err;
      res.send(results);
      console.log('all public events returned')
    })  
  });


/**
 * @route	POST api/events/publicevents
 * @desc	Add a public event
 * @access	public
*/
router.post('/publicevents', (req, res) => {
  let sql = '';

  pool.query(sql, (err, results) => {
    if(err) throw err;
    res.send(results);
  })  
});

/**
 * @route	DELETE api/events/publicevents
 * @desc	Delete a public event
 * @access	public
*/
router.delete('/publicevents', (req, res) => {
  let sql = '';

  pool.query(sql, (err, results) => {
    if(err) throw err;
    res.send(results);
  })  
});

/* --------------------------------------------------- */

// PRIVATE EVENTS

/**
 * @route	GET  api/events/privateevents
 * @desc	Get all public events
 * @access	public
*/
router.get('/privateevents', (req, res) => {
  let sql = 'SELECT * from private_events';

  pool.query(sql, (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log('all private events returned')
  })  
});


/**
* @route	POST api/events/privateevents
* @desc	Add a private event
* @access	public
*/
router.post('/privateevents', (req, res) => {
let sql = '';

pool.query(sql, (err, results) => {
  if(err) throw err;
  res.send(results);
})  
});

/**
* @route	DELETE api/events/privateevents
* @desc	Delete a private event
* @access	public
*/
router.delete('/privateevents', (req, res) => {
let sql = '';

pool.query(sql, (err, results) => {
  if(err) throw err;
  res.send(results);
})  
});


/* --------------------------------------------------- */

// RSO EVENT

/**
 * @route	GET  api/events/rsoevents
 * @desc	Get all rso events
 * @access	public
*/
router.get('/rsoevents', (req, res) => {
  let sql = 'SELECT * from rso_event';

  pool.query(sql, (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log('all rso events returned')
  })  
});


/**
* @route	POST api/events/rsoevents
* @desc	Add a rso event
* @access	public
*/
router.post('/rsoevents', (req, res) => {
let sql = '';

pool.query(sql, (err, results) => {
  if(err) throw err;
  res.send(results);
})  
});

/**
* @route	DELETE api/events/rsoevents
* @desc	Delete a rso event
* @access	public
*/
router.delete('/rsoevents', (req, res) => {
let sql = '';

pool.query(sql, (err, results) => {
  if(err) throw err;
  res.send(results);
})  
});



module.exports = router;