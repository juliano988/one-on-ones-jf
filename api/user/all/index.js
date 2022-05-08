var express = require('express');
var router = express.Router();
var passport = require('passport');
const UserModel = require('../../../db/model.js').UserModel;

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {

  UserModel.find({}).select('name teamName').exec(function (err, data) {
    if (err) { return res.status(500).json({ message: 'Internal error', err: err }) }

    res.json({ users: data });

  })

});

module.exports = router;