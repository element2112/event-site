const express = require('express');
const router = express.Router();
const pool = require('../connection');
// const gravatar = require('gravatar');
// const bcrypt = require('bcryptjs');
// const { check, validationResult } = require('express-validator/check');

// router.use(express.json());

router.get('/testcomments', (req, res,err) => res.json("comments Works"));



/**
 * @route	GET  api/comments/getcomments
 * @desc	Get all comments
 * @access	public
*/
router.get('/getcomments', (req, res) => {
    let sql = 'SELECT * from comments';
  
    pool.query(sql, (err, results) => {
      if(err) throw err;
      res.send(results);
      console.log('all comments returned');
    })  
  });

/**
 * @route	POST  api/comments/postcomment
 * @desc	add a comment
 * @access	public
*/
router.post('/addcomment', (req, res) => {
  let sql = '';

  pool.query(sql, (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log('1 comment added');
  })  
});


/**
 * @route	delete  api/comments/deletecomment
 * @desc	delete a comment
 * @access	public
*/
router.delete('/deletecomment', (req, res) => {
  let sql = '';

  pool.query(sql, (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log('1 comment deleted');
  })  
});
  
  module.exports = router;