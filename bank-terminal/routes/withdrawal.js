var express = require('express');
var router = express.Router();
var acc = require('./acc');

/* GET withdraw. */
router.post('/:aid', function(req, res, next) {
  var account = acc.openAccount(req.params.aid);
  if (account.chequing < 20000) {
    res.send("You must have $200 or more in chequing to withdraw.\n" +
             "The current interest rate is 0.05% per annum. Wait a few decades and you will be eligible to withdraw funds.");
  } else {
    account.chequing -= 20000;
    acc.storeAccount(account);
    res.send("Withdraw complete.\n" +
             "YOU REALLY ARE GOOD AT THIS. CONGRATULATIONS.\n" +
             "YOU'LL NEED THIS TO MOVE ON THOUGH.");
  }
});

module.exports = router;
