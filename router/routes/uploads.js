const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const multer = require('multer');
const upload = multer({dest: './uploads/'});
const fs = require('fs');
const db = require('../../db/db');

router.post('/', multer({ dest: './uploads/'}).single('upl'), function(req,res){
  if(!req.session.user){
    res.redirect('sessions/new');
  } else {
  	console.log(req.file); //form files
    var user = req.session.user.email
    var project = req.body.project
    console.log("Current project: "+project)
    console.log("Current user: "+user)

    let filePath = req.file.path
  	res.status(204).end();
    fs.readFile(filePath, 'utf8', function (err, data){
      if (err) {
        res.send(err)
      } else {
        var script = data.split("\n");
        db.save_lines(script, user, project);
      }
    })
  }
});

module.exports = router;
