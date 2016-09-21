const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mustacheExpress = require('mustache-express');
const fs = require('fs');
const formatter = require("./formatter.js");
const session = require('express-session');
const flash = require('connect-flash');

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use("/", express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: 'demo-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(flash());

app.listen(3000, function () {
  console.log('He say "You Blade Runner".');
});

app.use(function(err, req, res, next){
  res.status(err.status || 500);
});

const router = require('./router')(app);
