const pgp = require('pg-promise')();
const db = pgp('postgres://dasboogaloo@localhost:5432/line_runner_db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSalt(10);

var login = function(req, res, next){
  var email = req.body.email;
  var password = req.body.password;
  var auth_error = 'Incorrect Email / Password!';

  db.one(
    "SELECT * FROM users WHERE email = $1",
    [email]
  ).catch(function(){
    res.error = auth_error;
    next();
  }).then(function(user){
    bcrypt.compare(
      password,
      user.password_digest,
      function(err, cmp){
        if(cmp){
          var response = {email: user.email}
          res.send(response)
          next();
        } else {
          res.error = auth_error;
          next();
        }
      }
    );
  });
};

var logout = function(req, res, next){
  req.session.user = null;
  next()
};

var create_user = function(req, res, next){
  console.log(req.body)
  var email = req.body.email;
  var password = req.body.password;

  bcrypt.hash(password, 10, function(err, hashed_password){
    db.none(
      "INSERT INTO users (email, password_digest) VALUES ($1, $2)",
      [email, hashed_password]
    ).catch(function(){
      res.error = 'Error. User could not be created.';
      next();
    }).then(function(user){
      console.log("This email address was created" + email)
      var response = {email: email}
      res.send(response)
      next();
    });
  });
};


var save_lines = function(arr, user, project){
  var user_email = user;
  var project = project;
  for (var i = 0; i < arr.length; i ++){
    var line = arr[i]
    db.none(
      "INSERT INTO scripts(user_email, project, script_line) VALUES($1, $2, $3)",[user_email, project, line]
    )
  }
}

var fetch_lines = function(req, res, next){
  var data = req.url
  var email = data.replace(/\W{2}/, "")

  var script=[];
  var project_error = "No projects found for that email";
  db.any(
    "SELECT * FROM scripts WHERE user_email=$1", [email]
  ).catch(function(){
    res.send(project_error);
  }).then(function(lines){
    script.push(lines)
    console.log(script)
    res.send(script)
    next();
  })
}

module.exports = { login, logout, create_user, save_lines, fetch_lines};
