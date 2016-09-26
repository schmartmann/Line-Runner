const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const multer = require('multer');
const upload = multer({dest: './uploads/'});
const fs = require('fs');
const db = require('../../db/db');

router.post('/', multer({ dest: './uploads/'}).single('upl'), function(req,res){
  if(!req.body.user_email){
    res.send('Sorry, you need to be logged in to do that.');
  } else {
    console.log(req.body)
  	console.log(req.file); //form files
    var user = req.body.user_email
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

router.get('/', db.fetch_lines, function(req, res, next){
  if  (res.error) {
    var errorMsg = "error!"
    res.send(errorMsg)
  }
})

module.exports = router;
