var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', passport.authenticate('jwt', { session: false }),(req, res) => {

  delete req.user.password
  delete req.user.userName

  res.send(req.user)

});

module.exports = router;