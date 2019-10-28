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

router.post("/posturl",function(req,res,next){
  
  console.log(req.body);
  res.send(req.body);
})

/**
 * @route	GET  api/university/
 * @desc	Get all universities
 * @access	public
*/
router.get('/getuni', (req, res) => {
    let sql = 'SELECT * from universities';
  
    pool.query(sql, (err, results) => {
      if(err) throw err;
      res.send(results);
    });
  });

/**
 * @route	GET  api/university/getuni:id
 * @desc	Get one university
 * @access	public
*/

router.get('/getuni/:id', (req, res) => {

  var id = req.params.id;

  let sql = 'SELECT * FROM universities WHERE university_id = ?';

  pool.query(sql, id, (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log('1 university returned')
  });
});

/**
 * @route	POST  api/university/registeruni
 * @desc	add uni
 * @access	public
*/
router.post('/registeruni', (req, res) => {
  
  var fields = {
    university_id: req.body.university_id,
    name: req.body.name,
    location: req.body.location,
    description: req.body.description,
    email_domain: req.body.email_domain
  };
 
  let sql = "INSERT INTO universities SET ?";
  
  pool.query(sql, fields, (err, results) => {
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
router.delete('/deleteuni/:id', (req, res) => {
  
  var id = req.params.id;

  let sql = "DELETE FROM universities WHERE university_id = ?"

  pool.query(sql, id, (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log("1 record deleted");
  });

});
  
module.exports = router;