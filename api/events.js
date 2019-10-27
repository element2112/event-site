const express = require('express');
const router = express.Router();
// const gravatar = require('gravatar');
// const bcrypt = require('bcryptjs');
// const { check, validationResult } = require('express-validator/check');

// router.use(express.json());


router.get('/testevents', (req, res,err) => res.json("events Works"));

module.exports = router;