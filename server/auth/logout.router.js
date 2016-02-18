var router = require('express').Router();
var User = require('../api/users/user.model');

router.delete('/logout', function(req, res, next) {
  delete req.sesson.userId;
  res.sendStatus(204);
});

module.exports = router;