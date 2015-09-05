var express = require('express');
var acc = require('./acc');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var aid = String(Math.floor(10000000 * Math.random()));
  acc.createAccount(aid);
  res.render('index', { title: 'Hack the North Bank' , aid: aid });
});

module.exports = router;
