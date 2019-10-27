const express = require('express');
const router = express.Router();
const pool = require('../connection');

// parse all JSON coming into these routes
// router.use(express.json());

/**
 * @route	GET  api/users/test
 * @desc	Tests users route
 * @access	public
*/
router.get('/testusers', (req, res,err) => res.json("users Works"));


/**
 * @route	GET  api/users/
 * @desc	Get all users
 * @access	public
*/
router.get('/', (req, res) => {
  let sql = 'SELECT * from users';

  pool.query(sql, (err, results) => {
    if(err) throw err;
    res.send(results);
  })  
})

module.exports = router;