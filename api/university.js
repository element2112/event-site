const express = require('express');
const router = express.Router();
const pool = require('../connection');

/**
 * @route	GET  api/university/testuniversity
 * @desc	Tests users route
 * @access	public
*/
router.get('/testuniversity', (req, res,err) => res.json("university Works"));


/**
 * @route	GET  api/university/
 * @desc	Get all universities
 * @access	public
*/
router.get('/getunis', (req, res) => {
    let sql = 'SELECT * from universities';
  
    pool.query(sql, (err, results) => {
      if(err) throw err;
      res.send(results);
      console.log('all universities returned')
    });
  });

/**
 * @route	GET  api/university/getuni/uni_id
 * @desc	Get one university
 * @access	public
*/
router.get('/getuni/:id', (req, res) => {

  const id = req.params.id;

  let sql = 'SELECT * FROM universities WHERE uni_id = ?';

  pool.query(sql, id, (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log('1 university returned');
  });
});

/**
 * @route	POST  api/university/registeruni
 * @desc	add uni and superadmin
 * @access	public
*/
router.post('/registeruni', (req, res) => {
  
  const uni = {
    name: req.body.name,
    address: req.body.address,
    email_domain: req.body.email_domain
  };
 
  let sql = "INSERT INTO universities SET ?";
  
  pool.query(sql, uni, (err, results) => {
    if(err) throw err;

    console.log(results.insertId);

    const user = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      uni_id: results.insertId
    }

    const u_id = results.insertId;

    let sql2 = "INSERT INTO users SET ?"
    pool.query(sql2, user, (err, results) => {
      if (err) throw err;

      const superA = {
        user_id: results.insertId,
        uni_id: u_id
      }

      let sql3 = "INSERT INTO super_admins SET ?"

      pool.query(sql3, superA, (err, results) => {
        if (err) throw err;
        res.send(results);
        console.log("1 university added. 1 user added. 1 superadmin added.");
      });

    });
    
  });

});

/**
 * @route	DELETE  api/university/deleteuni/uni_id
 * @desc	delete uni
 * @access	public
*/
router.delete('/deleteuni/:id', (req, res) => {
  
  const id = req.params.id;

  let sql = "DELETE FROM universities WHERE uni_id = ?"

  pool.query(sql, id, (err, results) => {
    if(err) throw err;

    let sql2 = "DELETE FROM super_admins WHERE uni_id = ?"
    pool.query(sql2, id, (err, results) => {
      if (err) throw err;
      res.send(results);
      console.log("university deleted. super admin deleted.");
    })
    
    
  });

});
  
module.exports = router;