require('dotenv').config();
var passport = require('passport');
const UserModel = require('../db/model.js').UserModel;

var JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = function (req, res, next) {

  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.SECRET;
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {

    UserModel.findById(jwt_payload._id, null, { lean: true }, function (err, data) {

      if (err) { return done(err, false); }
      if (!data) { return done(err, false); }
      return done(null, data);

    })

  }));

  next();

}