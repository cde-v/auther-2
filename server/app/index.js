'use strict';

var app = require('express')();
var path = require('path');
var session = require('express-session');
var passport = require('passport');
// var bodyParser = require('body-parser');


app.use(require('./logging.middleware'));

app.use(require('./requestState.middleware'));

app.use(session({secret: 'tongiscool'}));

app.use(passport.initialize());
app.use(passport.session());


app.use(function (req, res, next) {
  // console.log('session', req.session);
  // if (!req.session.counter) req.session.counter = 0;
  // console.log('counter', req.sessionID, ++req.session.counter);
  next();
});

app.use(require('./statics.middleware'));

app.use('/api', require('../api/api.router'));
// console.log("i hate life when auths dont work");
app.use('/auth', require('../auth/index'));

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];

var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
validFrontendRoutes.forEach(function(stateRoute) {
  app.get(stateRoute, function(req, res) {
    res.sendFile(indexPath);
  });
});

app.use(require('./error.middleware'));

module.exports = app;
