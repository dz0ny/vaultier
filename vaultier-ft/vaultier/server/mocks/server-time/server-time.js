/* global require, module, __dirname */

module.exports = function (app) {
  var express = require('express');
  var fs = require('fs');
  var usersRouter = express.Router();

  usersRouter.get('/', function (req, res) {
    res.send(new Date().toISOString());
  });

  app.use('/api/server-time', usersRouter);
};
