var express = require('express');
var router = express.Router();

/*! http://mths.be/codepointat v0.1.0 by @mathias */
if (!String.prototype.codePointAt) {
  (function() {
    'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
    var codePointAt = function(position) {
      if (this == null) {
        throw TypeError();
      }
      var string = String(this);
      var size = string.length;
      // `ToInteger`
      var index = position ? Number(position) : 0;
      if (index != index) { // better `isNaN`
        index = 0;
      }
      // Account for out-of-bounds indices:
      if (index < 0 || index >= size) {
        return undefined;
      }
      // Get the first code unit
      var first = string.charCodeAt(index);
      var second;
      if ( // check if it’s the start of a surrogate pair
        first >= 0xD800 && first <= 0xDBFF && // high surrogate
        size > index + 1 // there is a next code unit
      ) {
        second = string.charCodeAt(index + 1);
        if (second >= 0xDC00 && second <= 0xDFFF) { // low surrogate
          // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
          return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
        }
      }
      return first;
    };
    if (Object.defineProperty) {
      Object.defineProperty(String.prototype, 'codePointAt', {
        'value': codePointAt,
        'configurable': true,
        'writable': true
      });
    } else {
      String.prototype.codePointAt = codePointAt;
    }
  }());
}

function shash(password) {
  hash = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  hash[15] = password.length % 256;
  for (var i = 0; i < password.length; i++) {
    var cp = password.codePointAt(i) ^ 0x55;
    hash[i % 15] ^= (cp << (i % 8)) + (cp >> (i % 8)) + cp;
    hash[i % 15] &= 255;
  }

  return hash.map(function(x) {
    return '0123456789abcdef'[Math.floor(x / 16)] + '0123456789abcdef'[x % 16];
  }).join('');
}

router.get('/~dglenn', function(req, res, next) {
  res.render('dglenn-index', { title: 'Don Glenn Home Page' });
});

router.get('/', function(req, res, next) {
  if (req.cookies.accesslevel !== undefined) {
    var authenticate = Number(req.cookies.accesslevel);
    res.render('ea', { title: 'Employee Area' , authorize: authenticate });
  } else {
    res.render('ea-login', { title: 'Please Log In' });
  }
});

router.post('/', function(req, res, next) {
  if (req.body.username === "jameson" && req.body.password === "hunter72") {
    res.cookie('accesslevel', 1);
    res.redirect(303, '/');
  } else {
    res.render('ea-login', { title: 'Sorry not right. Please Log In' });
  }
});

router.get('/~wscott/keys', function(req, res, next) {
  res.render('secret', { title: 'Secret Recombine' });
});

router.get('/~wscott/secret', function(req, res, next) {
  res.render('get-secret', { title: 'Please Authorize' });
});

router.post('/~wscott/secret', function(req, res, next) {
  if (shash(req.body.password.trim()) === "84c355da8831b62075d2ad9133ce6512") {
    res.render('got-secret', {
      title: 'Welcome, Wesley Scott',
      secret: '80200091cf180985fcc52693f6836af3a3f7c911cd83299ddf83c191279089ab982abcf6ba79754129ddb53f10ba651fae485aa09a647b243f34058127190'
    });
  } else {
    res.render('get-secret', {
      title: 'Incorrect. Please Authorize',
      shash: shash(req.body.password.trim())
    });
  }
});

module.exports = router;
