var flatfile = require('flat-file-db');
var db = flatfile('/tmp/my.db');

module.exports = {
  openAccount: function(aid) {
    console.log('open', aid);
    return db.get(aid);
  },
  createAccount: function(aid) {
    db.put(aid, {chequing: 0, savings: 10000});
  },
  storeAccount: function(aid, account) {
    db.put(aid, account);
  }
};
