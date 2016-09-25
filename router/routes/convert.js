const express = require('express');
const router = express.Router();
const fs = require('fs');
const bodyParser = require("body-parser");
const watson = require('watson-developer-cloud');

var text_to_speech = watson.text_to_speech({
  username: process.env.WATSON_USERNAME,
  password: process.env.WATSON_PASS,
  version: 'v1'
});

var params = {
  text: 'Hello world.',
  voice: 'en-US_AllisonVoice',
  accept: 'audio/wav'
};

router.post('/', function(req, res){
  // console.log(req.body.text);
  // var params = req.body.text;
  // text_to_speech.synthesize(params).pipe(fs.createWriteStream(Date.now+'text.wav'))
  // res.send("THE ANGELS ARE NICE")
})

module.exports = router;
