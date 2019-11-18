<<<<<<< HEAD
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
router.get('/getcomments/:id', (req, res) => {

    const event_id = req.params.id;

    let sql = 'select * from comments left join users on comments.user_id = users.user_id where event_id = ?';
  
    pool.query(sql, event_id, (err, results) => {
      if(err) throw err;
      res.send(results);
      console.log('all comments returned');
    });
    
  });

// get comments by user id for an event
router.post('/getusercommentsbyevent/:id', (req, res) => {
  const user_id = req.params.id;
  const event_id = req.body.event_id;

  const sql = "select * from comments where user_id = " + user_id + " and event_id = " + event_id;

  pool.query(sql , (err, results) => {
    if(err) throw err
    res.json(results)
  })
})

/**
 * @route	POST  api/comments/postcomment
 * @desc	add a comment
 * @access	public
*/
router.post('/addcomment', (req, res) => {
  
  let sql = "INSERT INTO comments SET ?";

  const fields = {
    text: req.body.text,
    timestamp: req.body.timestamp,
    rating: req.body.rating,
    event_id: req.body.event_id,
    user_id: req.body.user_id
  };

  pool.query(sql, fields, (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log('1 comment added');
  });

});


/**
 * @route	delete  api/comments/deletecomment
 * @desc	delete a comment
 * @access	public
*/
router.delete('/deletecomment/:id', (req, res) => {
  
  const id = req.params.id;
  const uid = req.body.user_id;
  
  let sql = "DELETE FROM comments WHERE comment_id = ? AND user_id = ?";

  pool.query(sql, [id, uid], (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log('1 comment deleted');
  });

});

/**
 * @route	Edit  api/comments/editcomment
 * @desc	edit a comment
 * @access	public
*/
router.patch('/editcomment/:id', (req, res) => {
  
  const commid = req.params.id;
  const uid = req.body.user_id;
  const text = req.body.text;
  
  let sql = "UPDATE comments SET text = ? WHERE comment_id = ? AND user_id = ?";

  pool.query(sql, [text, commid, uid], (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log('1 comment updated');
  });

});


/**
 * @route	GET  api/comments/geteventrating
 * @desc	Get average event rating
 * @access	public
*/
router.get('/geteventrating/:id', (req, res) => {

  const eid = req.params.id;

  let sql = 'SELECT AVG(rating) FROM comments WHERE event_id = ?';

  pool.query(sql, eid, (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log('average event rating returned');
  });
  
});
  
=======
const express = require('express');
const router = express.Router();
const pool = require('../connection');
const record = require('./record');
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
    });
    
  });

// get comment by id
router.get('/getcomments/:comment_id', (req, res) => {
  const { comment_id } = req.params;
  const sql = 'SELECT text from comments WHERE comment_id = ?'

  pool.query(sql , comment_id, (err, results) => {
    if(err) throw err
    res.json(results)
  })
})

/**
 * @route	POST  api/comments/postcomment
 * @desc	add a comment
 * @access	public
*/
router.post('/addcomment', (req, res) => {
  
  let sql = "INSERT INTO comments SET ?";

  const fields = {
    comment_id: req.body.comment_id,
    text: req.body.text,
    timestamp: req.body.timestamp,
    rating: req.body.rating,
    event_id: req.body.event_id,
    user_id: req.body.user_id
  };

  pool.query(sql, fields, (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log('1 comment added');
  });

});

// router.post('/addcomment-eventid', (req, res) => {
//   const comment = {text, timestamp, rating, event_id, user_id} = req.body  
//   const sql = 'INSERT INTO comments SET ? WHERE event_id = ?'
//   const values = [text, event_id]

//   const addedComment = record.addComment(values, sql);
//   res.json(addedComment)
// })


router.get('/ratings/:event_id', async (req, res) => {
  
  const sql = 'SELECT * FROM comments WHERE event_id = ?'
  const event_id = req.params.event_id
  let avgRating = 0;

  const getRating = await record.getAvgRating(event_id, sql);
  
  for(let i = 0; i< getRating.length; i++){
    avgRating += getRating[i].rating;
  }
  res.json(avgRating)
})


/**
 * @route	delete  api/comments/deletecomment
 * @desc	delete a comment
 * @access	public
*/
router.delete('/deletecomment/:id', (req, res) => {
  
  const id = req.params.id;
  const uid = req.body.user_id;
  
  let sql = "DELETE FROM comments WHERE comment_id = ? AND user_id = ?";

  pool.query(sql, [id, uid], (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log('1 comment deleted');
  });

});

/**
 * @route	Edit  api/comments/editcomment
 * @desc	edit a comment
 * @access	public
*/
router.patch('/editcomment/:id', (req, res) => {
  
  const commid = req.params.id;
  const uid = req.body.user_id;
  const text = req.body.text;
  
  let sql = "UPDATE comments SET text = ? WHERE comment_id = ? AND user_id = ?";

  pool.query(sql, [text, commid, uid], (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log('1 comment updated');
  });

});


/**
 * @route	GET  api/comments/geteventrating
 * @desc	Get average event rating
 * @access	public
*/
router.get('/geteventrating/:id', (req, res) => {

  const eid = req.params.id;

  let sql = 'SELECT AVG(rating) FROM comments WHERE event_id = ?';

  pool.query(sql, eid, (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log('average event rating returned');
  });

});
  
>>>>>>> 4238f71b988e8ebde57d3c82ddd83f46ba6c4d26
module.exports = router;