var express = require('express');
var bodyParser = require('body-parser');
var db = require('./models/index.js');
var path = require('path');
var session = require('express-session');
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

});

app.post('/login', (req, res) => {

});

app.post('/signup', (req, res) => {
  db.checkUserExists(req.body, (err, results) => {
    if(results.length) {
      res.status(500).send({error: 'username already exists!'});
    } else {
      db.createUser(req.body, (err, results) => {
        if(err) {
          res.status(500).send({error: 'please fill in all mandotary fields'});
        };
        req.session.regenerate(() => {
        req.session.isAuthenticated = true;
        res.send('successfully signed up');
      });
    })
    }
  });

});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../client/dist/index.html'));
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});