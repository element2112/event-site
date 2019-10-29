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
router.get('/getevents', (req, res) => {
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
router.get('/getpublic', (req, res) => {
    let sql = 'SELECT * from public_events';
  
    pool.query(sql, (err, results) => {
      if(err) throw err;
      res.send(results);
      console.log('all public events returned')
    })  
});

/**
 * @route	GET  api/events/publicevents
 * @desc	Get a public events
 * @access	public
*/
router.get('/getpublic/:id', (req, res) => {
  
  var id = req.params.id;
  
  let sql = 'SELECT * from public_events WHERE event = ?';

  pool.query(sql, id, (err, results) => {
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
router.post('/addpublic', (req, res) => {
  
  var fields = {
    event: req.body.events,
    approver: req.body.approver,
    approved: req.body.approved
  }

  let sql = "INSERT INTO public_events SET ?";

  pool.query(sql, fields, (err, results) => {
    if(err) throw err;
    res.send(results);
  })  
});

/**
 * @route	DELETE api/events/publicevents
 * @desc	Delete a public event
 * @access	public
*/
router.delete('/deletepublic/:id', (req, res) => {

  var id = req.params.id;

  let sql = "DELETE FROM public_events WHERE event = ?";

  pool.query(sql, id, (err, results) => {
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
router.get('/getprivate', (req, res) => {
  let sql = 'SELECT * from private_events';

  pool.query(sql, (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log('all private events returned')
  })  
});

/**
 * @route	GET  api/events/privateevents
 * @desc	Get all public events
 * @access	public
*/
router.get('/getprivate/:id', (req, res) => {

  var id = req.params.id;

  let sql = 'SELECT * FROM private_events WHERE events_id = ?';

  pool.query(sql, id, (err, results) => {
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
router.post('/addprivate', (req, res) => {
  
  var fields = {
    events_id: req.body.events_id,
    approver_id: req.body.approver_id,
    approved: req.body.approved
  }
  
  let sql = "INSERT INTO private_events WHERE events_id = ?";

  pool.query(sql, fields, (err, results) => {
    if(err) throw err;
    res.send(results);
  });

});

/**
* @route	DELETE api/events/privateevents
* @desc	Delete a private event
* @access	public
*/
router.delete('/deleteprivate/:id', (req, res) => {
  
  var id = req.params.id;
  
  let sql = "DELETE FROM private_events WHERE events_id = ?";

  pool.query(sql, id, (err, results) => {
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
router.get('/getrsoevents', (req, res) => {
  let sql = 'SELECT * from rso_event';

  pool.query(sql, (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log('all rso events returned')
  })  
});

/**
 * @route	GET  api/events/rsoevents
 * @desc	Get all rso events
 * @access	public
*/
router.get('/getrsoevents/:id', (req, res) => {
  
  var id = req.params.id;
  
  let sql = 'SELECT * from rso_event WHERE rso_org = ?';

  pool.query(sql, id, (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log('all rso events returned')
  });

});


/**
* @route	POST api/events/rsoevents
* @desc	Add a rso event
* @access	public
*/
router.post('/addrsoevents', (req, res) => {
  
  var fields = {
    rso_org: req.body.rso_org,
    rso_event_id: req.body.rso_event_id
  }
  
  let sql = "INSERT INTO rso_event SET ?";

  pool.query(sql, fields, (err, results) => {
    if(err) throw err;
    res.send(results);
  }); 
});

/**
* @route	DELETE api/events/rsoevents
* @desc	Delete a rso event
* @access	public
*/
router.delete('/deletersoevents/:id', (req, res) => {

  var id = req.params.id;

  let sql = 'DELETE FROM rso_event WHERE rso_event_id = ?';

  pool.query(sql, id, (err, results) => {
    if(err) throw err;
    res.send(results);
  });
});



module.exports = router;