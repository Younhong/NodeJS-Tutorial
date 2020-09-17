var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression');
var topicRouter = require('./routes/topic');
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var helmet = require('helmet');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

app.use(helmet());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(compression());
app.use(session({
  HttpOnly: true,
  secure: true,
  secret: 'asadlfkj!@#!@#dfgasdg',
  resave: false,
  saveUninitialized: true,
  store:new FileStore()
}));

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

app.post('/auth/login_process',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/auth/login',
                                   failureFlash: true })
);

app.get('*', function(request, response, next) {
  fs.readdir('./data', function(error, filelist) {
    request.list = filelist;
    next();
  });
});

app.use('/', indexRouter);
app.use('/topic', topicRouter);
app.use('/auth', authRouter);

app.use(function(request, response, next) {
  response.status(400).send("Sorry.. Can't find that!!");
});

app.use(function(err, request, response, next) {
  console.error(err.stack);
  response.status(500).send("Something broke!");
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000");
});