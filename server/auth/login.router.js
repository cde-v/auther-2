var router = require('express').Router();
var User = require('../api/users/user.model');
var passport = require('passport');
var local = require('passport-local')

router.post('/', function(req, res, next) {

  var email = req.body.email;
  var password = req.body.password;
  console.log("sessionID", req.sessionID);

  User.findOne({
      email: email,
      password: password
    })
    .then(function(user) {
      // console.log("/login POST", user);
      if(!user) {
        res.sendStatus(401);
      } else {

        //do either this entire router.post OR a router.post using passport
        req.session.userId = user._id;
        req.session.cookie.maxAge = 1000000;
        // console.log('session', req.session);
        res.status(200).json({"val": user._id, "admin":user.isAdmin})
      }
    })
    .then(null, next);
});




module.exports = router;