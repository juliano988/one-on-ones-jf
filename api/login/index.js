var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');


router.post('/', function (req, res) {

  var token = jwt.sign({ foo: 'bar' }, process.env.SECRET);

  res.send(token);

}
);

module.exports = router;