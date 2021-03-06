const express = require('express');
const router = express.Router();
const db = require('../../db/db');

router.get('/new', function(req, res){
  var error = req.flash('error')[0];
  res.render('sessions/new', { 'error': error });
});

router.post('/create', db.login, function(req, res){
  console.log(req.body)
  if(res.error)
    var errorMsg = "error!"
    res.send(errorMsg)
    // res.redirect('/');
});

router.get('/logout', db.logout, function(req, res){
  res.redirect('/');
});

module.exports = router;
