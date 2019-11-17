const express = require('express');
const router = express.Router();
const pool = require('../connection');
const record = require('./record');
// const gravatar = require('gravatar');
// const bcrypt = require('bcryptjs');
// const { check, validationResult } = require('express-validator/check');

// router.use(express.json());

/**
 * @route	GET  api/users/test
 * @desc	Tests users route
 * @access	public
*/

function asyncHandler(cb){
  return async (req,res, next) => {
      try {
          await cb(req, res, next);
      } catch(err) {
          next(err);
      }
  }
}


router.get('/testrso', (req, res, err) => res.json("rso Works"));

/**
 * @route	GET  api/rso/allrso
 * @desc	Get all rsos
 * @access	public
*/
router.get('/getrso', (req, res) => {
  let sql = 'SELECT * from rsos';

  pool.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
    console.log('all rsos returned');
  })

});

// get rso by user id
router.get('/getrso/:user_id', async (req, res) => {
  const user_id = req.params.user_id;
  const sql = 'SELECT * from rso_members WHERE user_id = ?';

  const sql2= 'SELECT * from rsos WHERE rso_id = ?'

  const user = await record.getStuff(user_id,sql)
  const rsos = await record.getStuff(user.rso_id,sql2)
  res.json(rsos)
});


// get rso by rso_member id
router.get('/getrso/:user_id', (req, res) => {
  const { user_id } = req.params
  const sql = 'SELECT * from rso_members WHERE user_id = ?';


  pool.query(sql, user_id, (err, results) => {
    if (err) throw err;
    res.send(results);
  })
});

router.post("/reject-rso", async (req, res) => {
  const {
    rso_id
  } = req.body;

  const deleteRso = await record.deleteRso(rso_id);
  const deleteRsoUsers = await record.deleteRsoUsers(rso_id);
  const deleteRsoEvents = await record.deleteRsoEvents(rso_id);

  res.json({message:"Everythin about the rso is deleted"})
})




// approve rso
router.post("/approverso/:id", (req, res) => {
  const { id } = req.params;

  let sql = "UPDATE rsos SET approved = 1 WHERE rso_id = ?";

  pool.query(sql, id, (err, results) => {
    if (err) throw err;
    res.send(results);
    console.log("rso approved");
  });
});




/**
 * @route	GET  api/rso/getrso/:id
 * @desc	Get all approved rsos by uni_id
 * @access	public
*/
router.get('/getApprovedRsos/:id', (req, res) => {

  var id = req.params.id;

  let sql = 'SELECT * from rsos WHERE uni_id = ? AND approved = 1';

  pool.query(sql, id, (err, results) => {
    if (err) throw err;
    res.send(results);
    console.log('all rsos returned');
  })
});

/**
 * @route	GET  api/rso/getrso/:id
 * @desc	Get all unapproved rsos by uni_id
 * @access	public
*/
router.get('/getUnapprovedRsos/:id', (req, res) => {

  var id = req.params.id;

  let sql = 'SELECT * from rsos WHERE uni_id = ? AND approved = 0';

  pool.query(sql, id, (err, results) => {
    if (err) throw err;
    res.send(results);
    console.log('all rsos returned');
  })
});

/**
* @route	POST  api/rso/addrso
* @desc	add an rso
* @access	public
*/
router.post('/addrso', asyncHandler(async (req, res) => {

  const fields = {
    approved: 0,
    active: 1,
    name: req.body.name,
    uni_id: req.body.uni_id
  }

  const rso_members = req.body.rso_members.split(' ')

  const createRso = await record.createRso(fields);
  const getInsertedRso = await record.getInsertedRso(fields.name);
  // await rso_members.forEach(async(member, index, array) => {
  //     console.log(member)
  //     const temp = await record.getUsers(member);
      
  // });


  // console.dir(rso_members[0])
  // const addAdmin = await record.addRsoAdmin(rso_members[0])
  // const rsoUsers = []
  // rso_members.forEach(async member => {
  //   rsoUsers.push(await record.getUsers(member))
  // })

  // console.dir(rsoUsers)
  res.send('boom')
  }))
    
// })

/**
* @route	delete  api/rso/deleterso
* @desc	delete an rso
* @access	public
*/
router.delete('/deleterso/:id', (req, res) => {

  var id = req.params.id;

  let sql = 'DELETE FROM rsos WHERE rso_id = ?';

  pool.query(sql, id, (err, results) => {
    if (err) throw err;
    res.send(results);
    console.log('1 rso deleted');
  });

});

module.exports = router;