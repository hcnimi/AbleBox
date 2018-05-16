var express = require('express');
var bodyParser = require('body-parser');
var db = require('../db/index.js');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(__dirname + '/../client/dist'));

// app.post('', (req, res) => {

// });

app.get('/signin', (req, res) => {

});

app.listen(3000, () => {
  console.log('listening on port 3000');
});