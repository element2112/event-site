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
    console.log('all events returned');
  })  
});

/**
 * @route	delete  api/events
 * @desc	Get all events
 * @access	public
 * 
*/
router.delete('/deleteevent/:id', (req, res) => {
  
  const id = req.params.id;

  let sql = "DELETE FROM events WHERE event_id = ?"

  pool.query(sql, id, (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log("1 event deleted");
  });

});

/* --------------------------------------------------- */

// PUBLIC EVENTS

/**
 * @route	GET  api/events/publicevents
 * @desc	Get a public events
 * @access	public
*/
router.get('/getpublic/:approved', (req, res) => {
  
  const approved = req.params.approved;
  
  let sql = 'SELECT * from public_events WHERE approved = ?';

  pool.query(sql, approved, (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log('approved or unapproved results returned');
  })
  
});

/**
 * @route	POST api/events/publicevents
 * @desc	Add a public event
 * @access	public
*/
router.post('/addpublic', (req, res) => {
  
  const event = {
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    contact_phone: req.body.contact_phone,
    contact_email: req.body.contact_email,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    location_id: req.body.location_id,
    university_id: req.body.university_id
  }

  let sql = "INSERT INTO events SET ?";

  pool.query(sql, event, (err, results) => {
    
    if(err) throw err;

    const public = {
      event_id: results.insertId,
      approved: 0
    }

    let sql2 = "INSERT INTO public_events SET ?"
    pool.query(sql2, public, (err, results) => {
      if(err) throw err;
      res.send(results);
      console.log("1 public event added");
    });

  });

});

router.delete('/deletepublic/:id', (req, res) => {
  
  const id = req.params.id;

  let sql = "DELETE FROM events WHERE event_id = ?"

  pool.query(sql, id, (err, results) => {
    if(err) throw err;

    let sql2 = "DELETE FROM public_events WHERE event_id = ?"
    pool.query(sql2, id, (err, results) => {
      if (err) throw err;
      res.send(results);
      console.log("event deleted. public event deleted.");
    })
    
  });

});

// /* --------------------------------------------------- */

// // PRIVATE EVENTS


router.get('/getprivate/:id', (req, res) => {
  
  const id = req.params.id;
  
  let sql = 'SELECT * from private_events WHERE uni_id = ? AND approved = 1';

  pool.query(sql, id, approved, (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log('approved or unapproved results returned');
  })
  
});

/**
* @route	POST api/events/privateevents
* @desc	Add a private event
* @access	public
*/
router.post('/addprivate', (req, res) => {
  
  const event = {
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    contact_phone: req.body.contact_phone,
    contact_email: req.body.contact_email,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    location_id: req.body.location_id,
    university_id: req.body.university_id
  }

  let sql = "INSERT INTO events SET ?";

  pool.query(sql, event, (err, results) => {
    
    if(err) throw err;

    const private = {
      event_id: results.insertId,
      approved: 0
    }

    let sql2 = "INSERT INTO private_events SET ?"
    pool.query(sql2, private, (err, results) => {
      if(err) throw err;
      res.send(results);
      console.log("1 private event added");
    });

  });

});

/**
* @route	DELETE api/events/privateevents
* @desc	Delete a private event
* @access	public
*/
router.delete('/deleteprivate/:id', (req, res) => {
  
  const id = req.params.id;

  let sql = "DELETE FROM events WHERE event_id = ?"

  pool.query(sql, id, (err, results) => {
    if(err) throw err;

    let sql2 = "DELETE FROM private_events WHERE event_id = ?"
    pool.query(sql2, id, (err, results) => {
      if (err) throw err;
      res.send(results);
      console.log("event deleted. private event deleted.");
    })
    
  });

});


/* --------------------------------------------------- */

// RSO EVENT

/**
 * @route	GET  api/events/rsoevents
 * @desc	Get all rso events
 * @access	public
*/
// the id passed is user id
router.get('/getrsoevents/:id', (req, res) => {
  
  const id = req.params.id;

  let sql = 'SELECT * FROM events WHERE event_id IN (SELECT event_id FROM rso_members WHERE user_id = ?)';

  pool.query(sql, id, (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log('rso event returned');
  })
  
});


/**************************************************************************/
// APPROVE EVENTS

// get unapproved by uni_id
router.get('/getunapprovedpub/:id', (req, res) => {

  const id = req.params.id;

  let sql = "SELECT event_id FROM public_events WHERE approved = 0";

  pool.query(sql, id, (err, results) => {
    if(err) throw err;

    let sql2 = ""
    res.send(results);
    console.log("unapproved events returned");
  });

})

// approve public by id
router.post('/approvepublic/:id', (req, res) => {

  const id = req.params.id;

  let sql = "UPDATE public_events SET approved = 1 WHERE event_id = ?"

  pool.query(sql, id, (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log("event approved");

  });


});

// approve private by event id
router.post('/approveprivate/:id', (req, res) => {

  const id = req.params.id;

  let sql = "UPDATE private_events SET approved = 1 WHERE event_id = ?"

  pool.query(sql, id, (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log("event approved");

  });

});



module.exports = router;