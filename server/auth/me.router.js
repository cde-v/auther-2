var router = require('express').Router();
var User = require('../api/users/user.model');

router.put('/', function(req, res, next) {
  var userId = req.body.userId;
  // console.log("sessionID", req.sessionID);

  User.findOne({
      _id: userId,
      //note this may be different with use of passport
      sessionID: req.sessionID
    })
    .then(function(user) {
      // console.log("/login POST", user);
      if(!user) {
        res.sendStatus(401);
      } else {
        req.session.userId = user._id;
        req.session.cookie.maxAge = 1000000;
        // console.log('session', req.session);
        res.status(200).json({"val": user._id, "admin":user.isAdmin})
      }
    })
    .then(null, next);
});

module.exports = router;