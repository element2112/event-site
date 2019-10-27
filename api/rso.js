const express = require('express');
const router = express.Router();
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
 * @route	GET  api/users/
 * @desc	Get all users
 * @access	public
*/
router.get('/', (req, res) => {
    let sql = 'SELECT * from rso';
  
    pool.query(sql, (err, results) => {
      if(err) throw err;
      res.send(results);
    })  
  })
  
  
  module.exports = router;