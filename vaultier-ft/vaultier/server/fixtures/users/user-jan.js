/* global require, module, __dirname */

module.exports = function (app) {

  var fs = require('fs');

  return {
    id: 1,
    email: 'jan.misek@rclick.cz',
    nickname: 'jan',
    public_key: fs.readFileSync(__dirname + '/../keys/dev-shared-key.pub', 'utf-8')
  };
}
