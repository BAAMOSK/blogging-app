var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const {blogPostSchema} = require('./models');
var index = require('./routes/index');
var users = require('./routes/users');
const {PORT, DATABASE_URL} = require('./.env');
var app = express();
app.use(logger('combined'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/', (req, res) => {
  res.send('This is working.')
});

app.use(favicon(path.join(__dirname, 'public', '/images/cropped-favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);














app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, () => {`server is running on port ${PORT}`;});
module.exports = app;
