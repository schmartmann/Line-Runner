const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const multer = require('multer');
const upload = multer({dest: '../../uploads/'});
const fs = require('fs');
const formatter = require("../../formatter.js");
const db = require('../../db/db');

router.post('/', multer({ dest: '../../uploads/'}).single('upl'), function(req,res){
	console.log(req.file); //form files
  let filePath = req.file.path
	res.status(204).end();
  fs.readFile(filePath, 'utf8', function (err, data){
    if (err) {
      res.send(err)
    } else {
      formatter.lineBreakFormat(data);
    }
  })
});

module.exports = router;
