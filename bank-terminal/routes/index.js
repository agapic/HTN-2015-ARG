var express = require('express');
var acc = require('./acc');
var basicAuth = require('basic-auth');

var crypto = require('crypto');

/**
 * Simple basic auth middleware for use with Express 4.x.
 *
 * @example
 * app.use('/api-requiring-auth', authenticate('username', 'password'));
 *
 * @param   {string}   username Expected username
 * @param   {string}   password Expected password
 * @returns {function} Express 4 middleware requiring the given credentials
 */
var authenticate = function(username, password) {
  return function(req, res, next) {
    var user = basicAuth(req);

    if (!user || user.name !== username || crypto.createHash('md5').update(user.pass).digest('hex') !== password) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.sendStatus(401);
    }

    next();
  };
};

var router = express.Router();

/* GET home page. */
router.get('/', authenticate('bank', '3bc679fd1de57b54c0c834d46bea73c2'),
function(req, res, next) {
  var aid = String(Math.floor(10000000 * Math.random()));
  acc.createAccount(aid);
  res.render('index', { title: 'the North Bank' , aid: aid });
});

router.get('/JJJ/all-in-internal-network.txt', function(req, res, next) {
  res.sendFile('accounts.txt', {root: '..'});
});

module.exports = router;
