var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.send('aaaa')
});

module.exports = router;