var express = require('express');
var bodyParser = require('body-parser');
var db = require('./models/index.js');
var path = require('path');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(__dirname + '/../client/dist'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

var checkUser = (req, res, next) => {
  if(session.id && session.isAuthenticated) {
    next();
  } else {
    res.redirect('/login');
  }
};

app.post('/home', checkUser, (req, res) => {
  res.status(200).end();
});

app.post('/signin', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  db.fetchUser(email, (err, result) => {
    if (err) {
      res.redirect(500, '/signin');
    } else if (!result) {
      res.redirect(401, '/signin');
    } else {
      bcrypt.compare(password, result[0].password, (err, match) => {
        if (!match) {
          res.redirect('/login');
        } else {
          req.session.regenerate(() => {
            req.session.isAuthenticated = true;
            res.redirect('/');
          });
        }
      })
    }
  });
});

app.post('/signup', (req, res) => {
  let userData = req.body;
  bcrypt.hash(userData.password, null, null, (err, hash) => {
    if (err) {
      res.redirect(500, '/signup');
    }
    userData.password = hash;
  });
  db.checkUserExists(userData, (err, results) => {
    if (err) {
      res.redirect(500, '/signup');
    }
    if (results.length) {
      res.status(500).send('username already exists!');
    } else {
      db.createUser(req.body, (err, results) => {
        if(err) {
          res.redirect(500, '/signup');
        } else {
          req.session.regenerate(() => {
            req.session.isAuthenticated = true;
            res.redirect('/home');
          });
        }
      });
    }
  });
});

app.post('/logout', checkUser, (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        next(err);
      } else {
        res.clearCookie('connect.sid');
        res.send('successfully logged out');
      }
    });
  }
});

app.post('/upload', (req, res) => {
  res.status(200).end();
});

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../client/dist/index.html'));
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
