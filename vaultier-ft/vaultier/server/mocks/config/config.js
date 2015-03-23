/* global require, module */

module.exports = function (app) {
  var fs = require('fs');
  var express = require('express');
  var apiConfigRouter = express.Router();

  apiConfigRouter.get('/', function (req, res) {
    res.send({

      'VERSION': 'mock',
      'raven_key': null,
      'invitation_lifetime': 1000,
      'registration_allow': true,
      'registration_enforce': false,
      'dev_shared_key': true,
      'dev_shared_key_private': fs.readFileSync(__dirname+'/../../fixtures/keys/dev-shared-key.priv', 'utf-8'),
      'dev_shared_key_public': fs.readFileSync(__dirname+'/../../fixtures/keys/dev-shared-key.pub', 'utf-8'),
      'dev_show_token': true,
      'dev_email': 'jan.misek@rclick.cz'

    });

  });

  app.use('/api/config', apiConfigRouter);

};


