/* global require, module */

module.exports = function (app) {
  var fs = require('fs');
  var express = require('express');
  var apiConfigRouter = express.Router();

  apiConfigRouter.get('/', function (req, res) {
    res.send({
      "auth_registration_allow": true
    });

  });

  app.use('/api/config', apiConfigRouter);

};


