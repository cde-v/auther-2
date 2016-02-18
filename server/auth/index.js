'use strict';

var router = require('express').Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../api/users/user.model');

// router.post('/login', function(req, res, next) {
//  passport.authenticate('local', function(err, user, info) {
//    if (err) { return next(err); }
//    if (!user) { return res.redirect('/login'); }
//    req.login(user, function(err) {
//      if (err) { return next(err); }
//      // next()
//      // return res.redirect('/users/' + user._id);
//    })
//    next();
//  })(req, res, next);
// });

passport.use(
  new GoogleStrategy({
      clientID: '904557065956-n0beojtbnuvk707l1nku6gm82vuib4n1.apps.googleusercontent.com',
      clientSecret: 'oveeJO7ygdXDPnFhZROm-8MU',
      callbackURL: '/auth/google/callback'
    },
    // google will send back the token and profile
    function(token, refreshToken, profile, done) {
      //the callback will pass back user profilie information and each service (Facebook, Twitter, and Google) will pass it back a different way. Passport standardizes the information that comes back in its profile object.
      console.log('google auth')

      User.findOne({
        'google.id': profile.id
      }, function(err, user) {

        if(err) return done(err);
        // console.log("/login POST", user);

        if(user) {
          return done(null, user)
        } else {
          //create user
          var newUser = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            photo: profile.photos[0].value,
            google: {
              id: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              token: token
            }
          })

          newUser.save(function(err) {
            if(err) done(err);
            else done(null, newUser);
          })
        }
      })
    })
);


passport.serializeUser(function(user, done) {
  console.log('serialize', user, done)
  done(null, user._id);
})

passport.deserializeUser(function(id, done) {
  User.findById(id, done);
})


router.use('/logout', require('./logout.router'));

router.use('/login', require('./login.router'));



router.use('/me', require('./me.router'));

//google authentication and login 
router.get('/google', passport.authenticate('google', {
  scope: 'email'
}));

// handle the callback after google has authenticated the user
router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/stories',
    failureRedirect: '/login'
  }));
module.exports = router;
