require('dotenv').config();
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

router.get('/', (req, res) => {

  const token = req.query.token;

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) { return res.status(500).json({ isTokenValid: false, message: 'Invalid token.' }) }

    res.send({ isTokenValid: true })

  });

});

module.exports = router;