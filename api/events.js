const express = require("express");
const router = express.Router();
const pool = require("../connection");

router.get("/testevents", (req, res, err) => res.json("events Works"));

/**
 * @route	GET  api/events
 * @desc	Get all events
 * @access	public
 *
 */
router.get("/getevents", (req, res) => {
  let sql = "SELECT * from events";

  pool.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
    console.log("all events returned");
  });
});

/**
 * @route	GET  api/events
 * @desc	Get all events
 * @access	public
 *
 */
router.get("/getevent/:id", (req, res) => {
  let sql = "SELECT * from events WHERE event_id = " + req.params.id;

  pool.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
    console.log("all events returned");
  });
});

/**
 * @route	delete  api/events
 * @desc	delete one event
 * @access	public
 *
 */
router.delete("/deleteevent/:id", (req, res) => {
  const id = req.params.id;

  let sql = "DELETE FROM events WHERE event_id = ?";

  pool.query(sql, id, (err, results) => {
    if (err) throw err;
    res.send(results);
    console.log("1 event deleted");
  });
});

/* --------------------------------------------------- */

// PUBLIC EVENTS

/**
 * @route	GET  api/events/getpublic
 * @desc	Get all approved events
 * @access	public
 */
router.get("/getapprovedpub", (req, res) => {

let sql = "SELECT * FROM events LEFT JOIN public_events ON events.event_id = public_events.event_id WHERE (public_events.approved = 1)";
  pool.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
    console.log("approved public events returned");
  });
});

/**
 * @route	POST api/events/addpublic
 * @desc	Add a public event
 * @access	public
 */
router.post("/addpublic", (req, res) => {
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
  };

  let loc_sql = "SELECT * from events WHERE location_id = " + req.body.location_id;

  pool.query(loc_sql, (err, results) => {
    if (err) throw err;
    let notOverlapping = true;

    results.forEach((re) => {
      if(((new Date(re.end_time ) - (new Date(req.body.start_time))) > 0) && ((new Date(req.body.end_time)) - new Date(re.start_time)) > 0) {
        notOverlapping = false;
      } 
    })
    
    if(notOverlapping) {
      let sql = "INSERT INTO events SET ?";

      pool.query(sql, event, (err, results) => {
        if (err) throw err;
    
        const public = {
          event_id: results.insertId,
          approved: 0
        };
    
        let sql2 = "INSERT INTO public_events SET ?";
        pool.query(sql2, public, (err, results) => {
          if (err) throw err;
          res.send(results);
          console.log("1 public event added");
        });
      });

    } else {
      res.json("Could not add. Time overlaps");
    }
  });

});

/**
 * @route	DELETE api/events/deletepublic/event_id
 * @desc	delete a public event
 * @access	public
 */

router.delete("/deletepublic/:id", (req, res) => {
  const id = req.params.id;

  let sql = "DELETE FROM events WHERE event_id = ?";

  pool.query(sql, id, (err, results) => {
    if (err) throw err;

    let sql2 = "DELETE FROM public_events WHERE event_id = ?";
    pool.query(sql2, id, (err, results) => {
      if (err) throw err;
      res.send(results);
      console.log("event deleted. public event deleted.");
    });
  });
});

/* --------------------------------------------------- */

// PRIVATE EVENTS

/**
 * @route	GET api/events/getprivate/id
 * @desc	get all approved private events by uni_id
 * @access	public
 */
router.get("/getapprovedprivate/:id", (req, res) => {
  const id = req.params.id;

  let sql = "SELECT * FROM private_events LEFT JOIN events ON events.event_id = private_events.event_id WHERE (private_events.approved = 1 AND university_id = ?)";

  pool.query(sql, id, (err, results) => {
    if (err) throw err;
    res.send(results); 
    console.log("approved results returned");
  });
});

/**
 * @route	POST api/events/privateevents
 * @desc	Add a private event
 * @access	public
 */
router.post("/addprivate", (req, res) => {
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
  };

  let loc_sql = "SELECT * from events WHERE location_id = " + req.body.location_id;

  pool.query(loc_sql, (err, results) => {
    if (err) throw err;
    let notOverlapping = true;

    results.forEach((re) => {
      if(((new Date(re.end_time ) - (new Date(req.body.start_time))) > 0) && ((new Date(req.body.end_time)) - new Date(re.start_time)) > 0) {
        notOverlapping = false;
      } 
    })

    if(notOverlapping) {
      let sql = "INSERT INTO events SET ?";

      pool.query(sql, event, (err, results) => {
        if (err) throw err;
    
        const private = {
          event_id: results.insertId,
          approved: 0
        };
    
        let sql2 = "INSERT INTO private_events SET ?";
        pool.query(sql2, private, (err, results) => {
          if (err) throw err;
          res.send(results);
          console.log("1 private event added");
        });
      });
    } else {
      res.json("Could not add. Time overlaps");
    }
  });

});

/**
 * @route	DELETE api/events/privateevents
 * @desc	Delete a private event
 * @access	public
 */
router.delete("/deleteprivate/:id", (req, res) => {
  const id = req.params.id;

  let sql = "DELETE FROM events WHERE event_id = ?";

  pool.query(sql, id, (err, results) => {
    if (err) throw err;

    let sql2 = "DELETE FROM private_events WHERE event_id = ?";
    pool.query(sql2, id, (err, results) => {
      if (err) throw err;
      res.send(results);
      console.log("event deleted. private event deleted.");
    });
  });
});

/* --------------------------------------------------- */

// RSO EVENT

/**
 * @route	GET  api/events/getrsoevents
 * @desc	Get all rso events by user_id
 * @access	public
 */
// the id passed is user id
router.get("/getrsoevents/:id", (req, res) => {
  const id = req.params.id;

  let sql =
    "SELECT * FROM rso_events WHERE event_id IN (SELECT event_id FROM rso_members WHERE user_id = ?)"; // this is getting all rso events

  pool.query(sql, id, (err, results) => {
    if (err) throw err;
    res.send(results);
    console.log("rso event returned");
  });
});



router.post("/addrso", (req, res) => {
  const rso_id = req.body.rso_id;
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
  };

  const loc_sql = "SELECT * from events WHERE location_id = ?";

  pool.query(loc_sql, event.location_id, (err, results) => {
    if (err) throw err;
    let notOverlapping = true;

    results.forEach((re) => {
      if(((new Date(re.end_time ) - (new Date(req.body.start_time))) > 0) && ((new Date(req.body.end_time)) - new Date(re.start_time)) > 0) {
        notOverlapping = false;
      } 
    })

    if(notOverlapping) {
      let sql = "INSERT INTO events SET ?";

      pool.query(sql, event, (err, results) => {
        if (err) throw err;
    
        const rso_event = {
          event_id: results.insertId,
          rso_id: rso_id
        };
    
        let sql2 = "INSERT INTO rso_event SET ?";
        pool.query(sql2, rso_event, (err, results) => {
          if (err) throw err;
          res.json(results);
          console.log("1 rso event added");
        });
      });
    } else {
      res.send("Could not add. Time overlaps");
    }
  });
});

/**************************************************************************/
// APPROVING EVENTS

// get unapproved by uni_id
router.get("/getunapprovedpub/:id", (req, res) => {
  const id = req.params.id;

  let sql =
    "SELECT * FROM events LEFT JOIN public_events ON events.event_id = public_events.event_id WHERE (public_events.approved = 0 AND events.university_id = ?)";

  pool.query(sql, id, (err, results) => {
    if (err) throw err;
    res.send(results);
    console.log("unapproved public events returned");
  });
});

// approve public by id
router.post("/approvepublic/:id", (req, res) => {
  const id = req.params.id;

  let sql = "UPDATE public_events SET approved = 1 WHERE event_id = ?";

  pool.query(sql, id, (err, results) => {
    if (err) throw err;
    res.send(results);
    console.log("event approved");
  });
});

// approve private by event id
router.post("/approveprivate/:id", (req, res) => {
  const id = req.params.id;

  let sql = "UPDATE private_events SET approved = 1 WHERE event_id = ?";

  pool.query(sql, id, (err, results) => {
    if (err) throw err;
    res.send(results);
    console.log("event approved");
  });
});

// get all unapproved private events by uni_id
router.get("/getunapprovedprivate/:id", (req, res) => {
  const id = req.params.id;

  let sql = "SELECT * FROM private_events LEFT JOIN events ON events.event_id = private_events.event_id WHERE (private_events.approved = 0 AND university_id = ?)";

  pool.query(sql, id, (err, results) => {
    if (err) throw err;
    res.send(results);
    console.log("unapproved public events returned");
  });
});

router.post("/geteventsbyloc/:id", (req, res) => {
  const id = req.params.id;
  const e2 = new Date(req.body.end_time);
  const s2 = new Date(req.body.start_time);
  let loc_sql = "SELECT * from events WHERE location_id = " + id;

  pool.query(loc_sql, (err, results) => {
    if (err) throw err;
    let c = true;

    results.forEach((re) => {
      if(((new Date(re.end_time ) - s2) > 0) && (e2 - new Date(re.start_time)) > 0) {
        c = false;
      } 
    })
    res.send(c);
  });
});

module.exports = router;
