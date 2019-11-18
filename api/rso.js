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

function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      next(err);
    }
  }
}

var fn = function asyncMultiplyBy2(user,sql){ // sample async action
  return new Promise(resolve => record.getUsers(user,sql));
};

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
  const sql = 'SELECT * from rso_members WHERE user_id IN (SELECT user_id FROM rso_members WHERE user_id = ?)';

  const sql2 = 'SELECT * from rsos WHERE rso_id IN (SELECT rso_id FROM rso_members WHERE rso_id = ?)'

  const user = await record.getStuff(user_id, sql)
  const rsos = await record.getStuff(user.rso_id, sql2)
  res.json(rsos)
});


// get rsos by rso_member id
router.get('/getrsosforuser/:user_id', (req, res) => {
  const { user_id } = req.params
  const sql = 'SELECT * from rso_members WHERE user_id = ?';


  pool.query(sql, user_id, (err, results) => {
    if (err) throw err;
    res.send(results);
  })
});

router.post("/reject-rso/:rso_id", async (req, res) => {
  const {
    rso_id
  } = req.params;

  const deleteRso = await record.deleteRso(rso_id);
  const deleteRsoUsers = await record.deleteRsoUsers(rso_id);
  const deleteRsoEvents = await record.deleteRsoEvents(rso_id);

  res.json({ message: "Everythin about the rso is deleted" })
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
  let rsoUsers = []
  const rso_members = req.body.rso_members.split(' ')
  const sql = 'SELECT * FROM users WHERE email = ?'
  const createRso = await record.createRso(fields);
  const getUsers = new Promise(resolve => rso_members.map(mem => record.getUsers(mem,sql)))
  // res.(getUsers)
  // const getInsertedRso = await record.getInsertedRso(fields.name);

 

  // rso_members.forEach(async(member, index, array) => {
  //     console.log(member)
  //     const temp = await record.getUsers(member);

  // });

  res.send(getUsers)
}))


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

router.post('/requestrso', (req, res) => {

  // request rso
  const rso = {
    approved: 0,
    active: 1,
    name: req.body.name,
    uni_id: req.body.uni_id
  }

  const members = req.body.members;

  let rsoSql = 'INSERT INTO rsos SET ?';

  pool.query(rsoSql, rso, (err, results) => {
    if (err) throw err;
    console.log('1 rso added');

    const rso_id = results.insertId;

    let membersIDSql = "select * from users where email in (?)";

    pool.query(membersIDSql, [members], (err, results) => {
      if (err) throw err;
      console.log("members ids retrieved")

      let queryMembers = [];

      // form user_id, rso_id pairs
      results.forEach(member => {
        queryMembers.push({"user_id": member.user_id, "rso_id": rso_id});
      });

      // front end must always send admin as first member
      const admin = {user_id: queryMembers[0].user_id, rso_id: rso_id};
    
      //let addMembersSql = "insert into rso_members (user_id, rso_id) VALUES ?"
      // insert members
      pool.query(
        'INSERT INTO rso_members (user_id, rso_id) VALUES ?',
        [queryMembers.map(item => [item.user_id, item.rso_id])],
        (error, results) => {
          console.log("members added")
        }
      );

      // insert admin
      let adminSql = "insert into admins set ?"
      pool.query(adminSql, admin, (err, results) => {
        if (err) throw err;
        res.send(results);
        console.log('admin added');
      });

    });

  });

});
router.post('/join', asyncHandler(async (req, res) => {
  const member = {
    rso_id: req.query.rso_id,
    user_id: req.query.user_id
  }

  const sql = "INSERT INTO rso_members (user_id, rso_id) VALUES (" + user_id + ", " + rso_id + ")"

  pool.query(sql, member, (err, results) => {
    if (err) throw err;
    res.send("test");
    console.log('rso joined');
  });
}))


router.post('/leave', asyncHandler(async (req, res) => {
 
  const user_id = req.body.user_id
  const rso_id = req.body.rso_id

  const sql1 = 'DELETE FROM rso_members WHERE user_id = ? AND rso_id = ?'
  const sql2 = 'DELETE FROM admins WHERE user_id = ? AND rso_id = ?'

  pool.query(sql1, [user_id, rso_id], (err, results) => {
    if (err) throw err;
    res.json(results);
    console.log('rso left');
  });

  pool.query(sql2, [user_id, rso_id], (err, results) => {
    if (err) throw err;
    console.log('admin left');
  });
}))




module.exports = router;