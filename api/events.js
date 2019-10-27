const express = require('express');
const router = express.Router();
const pool = require('../connection');
// const gravatar = require('gravatar');
// const bcrypt = require('bcryptjs');
// const { check, validationResult } = require('express-validator/check');

// router.use(express.json());

router.get('/testevents', (req, res,err) => res.json("events Works"));

// THIS IS JUST SKETCHED BC IM TIRED. NEED TO BE TESTED

  /**
 * @route	GET  api/events/publicevents
 * @desc	Get all public events
 * @access	public
*/
router.get('/pubevents', (req, res) => {
    let sql = 'SELECT * from users WHERE user_id = 5555';
  
    pool.query(sql, (err, results) => {
      if(err) throw err;
      res.send(results);
    })  
  });

  /**
 * @route	GET  api/events/publicevents:id
 * @desc	Get specific public event
 * @access	public
*/
router.get('/pubevents:id', (req, res) => {
    let sql = 'SELECT * from users WHERE user_id = 5555';
  
    pool.query(sql, (err, results) => {
      if(err) throw err;
      res.send(results);
    })  
  });

  /**
 * @route	GET  api/events/rsoevents
 * @desc	Get rso events
 * @access	public
*/
router.get('/rsoevents', (req, res) => {
    let sql = 'SELECT * from users WHERE user_id = 5555';
  
    pool.query(sql, (err, results) => {
      if(err) throw err;
      res.send(results);
    })  
  });

  /**
 * @route	GET  api/events/rsoevents:id
 * @desc	Get specific rso event
 * @access	public
*/
router.get('/rsoevents:id', (req, res) => {
    let sql = 'SELECT * from users WHERE user_id = ?';
  
    pool.query(sql, (err, results) => {
      if(err) throw err;
      res.send(results);
    })  
  });

  /**
 * @route	GET  api/events/privateevents
 * @desc	Get all private events
 * @access	public
*/
router.get('/privateevents', (req, res) => {
    let sql = 'SELECT * from users WHERE user_id = 5555';
  
    pool.query(sql, (err, results) => {
      if(err) throw err;
      res.send(results);
    })  
  });

    /**
 * @route	GET  api/events/privateevents:id
 * @desc	Get specific private event
 * @access	public
*/
router.get('/privateevents:id', (req, res) => {
    let sql = 'SELECT * from users WHERE user_id = 5555';
  
    pool.query(sql, (err, results) => {
      if(err) throw err;
      res.send(results);
    })  
  });


module.exports = router;