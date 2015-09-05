var express = require('express');
var router = express.Router();
var acc = require('./acc');

/* GET transfer. */
router.post('/:aid/:mode/:amt', function(req, res, next) {
  var account = JSON.parse(JSON.stringify(acc.openAccount(req.params.aid)));
  var cts = req.params.mode === "1";
  var amt = Number(req.params.amt);
  var f = cts ? 'chequing' : 'savings';
  var t = cts ? 'savings' : 'chequing';

  if (account[f] >= amt) {
    res.send("Your transfer will be completed within the next ten seconds.");
    setTimeout(function() {
      account = acc.openAccount(req.params.aid);
      account[f] -= amt;
      account[t] += amt;
      acc.storeAccount(req.params.aid, account);
    }, 7000);
  } else {
    res.send("Insufficient funds.");
  }
});

module.exports = router;
