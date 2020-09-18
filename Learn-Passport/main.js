var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var flash = require('connect-flash');

app.use(helmet());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(compression());
app.use(session({
  secret: 'asadlfkj!@#!@#dfgasdg',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}));
app.use(flash());

var passport = require('./lib/passport')(app);

app.get('*', function(request, response, next) {
  fs.readdir('./data', function(error, filelist) {
    request.list = filelist;
    next();
  });
});

var topicRouter = require('./routes/topic');
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth')(passport);

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