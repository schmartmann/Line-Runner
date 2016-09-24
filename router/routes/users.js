const express = require('express');
const router = express.Router();
const db = require('../../db/db');

router.get('/new', function (req, res) {
  var error = req.flash('error')[0];
  res.render('users/new', { 'error': error });
});

router.post('/create', db.create_user, function (req, res) {
  if(res.error)
    var errorMsg = "error!"
    res.send(errorMsg)
});

module.exports = router;
