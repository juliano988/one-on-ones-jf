require('dotenv').config();
var express = require('express');
var router = express.Router();
var passport = require('passport');

var JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = function (req,res,next) {

  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.SECRET;
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    return done(null, { aaa: 'bbbbb' });
  }));
  
  next();

}