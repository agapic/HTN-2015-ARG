var express = require('express');
var router = express.Router();
var acc = require('./acc');

/* GET account. */
router.get('/:aid', function(req, res, next) {
  res.json(acc.openAccount(req.params.aid));
});

module.exports = router;
