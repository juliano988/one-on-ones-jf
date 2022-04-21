require('dotenv').config();
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../../db/model.js').UserModel


router.post('/', function (req, res) {

  const userName = req.body?.userName
  const password = req.body?.password

  UserModel.findOne({ userName: userName }, null, { lean: true }, function (err, data) {
    if (err) { return res.status(500).json({ message: 'Internal error.', err: err }) }
    if (!data) { return res.status(404).json({ message: 'User not found or wrong password!' }) }

    bcrypt.compare(password, data?.password, function (err, result) {
      if (err) { return res.status(500).json({ message: 'Internal error.', err: err }) }
      if (!result) { return res.status(404).json({ message: 'User not found or wrong password!' }) }

      var token = jwt.sign(data, process.env.SECRET);

      res.status(200).json({ token: token, message: 'Success!' });

    });

  })

}
);

module.exports = router;