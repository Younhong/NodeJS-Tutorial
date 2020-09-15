var express = require('express');
var session = require('express-session');

var app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.get('/', function (req, res, next) {
  res.send('Hello session');
});

app.listen(3000, function() {
    console.log("Example app listening on port 3000!");
});