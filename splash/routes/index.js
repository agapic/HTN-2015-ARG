var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HTN' });
});

router.get('/~dglenn', function(req, res, next) {
  res.render('dglenn-index', { title: 'Don Glenn Home Page' });
});

router.get('/bank.php', function(req, res, next) {
  if (req.cookies.accesslevel !== undefined) {
    var authenticate = Number(req.cookies.accesslevel);
    res.render('ea', { title: 'Employee Area' , authorize: authenticate });
  } else {
    res.render('ea-login', { title: 'Please Log In' });
  }
});

router.post('/bank.php', function(req, res, next) {
  if (req.body.username === "jameson" && req.body.password === "hunter72") {
    res.cookie('accesslevel', 1);
    res.redirect(303, '/bank.php');
  } else {
    res.render('ea-login', { title: 'Sorry not right. Please Log In' });
  }
});

router.get('/~wscott/keys', function(req, res, next) {
  res.render('secret', { title: 'Secret Recombine' });
});

module.exports = router;
