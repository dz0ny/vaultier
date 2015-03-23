/* global require, module, __dirname */

module.exports = function (app) {
  var express = require('express');
  var user = require(__dirname+'/../../fixtures/users/user-jan');
  var usersRouter = express.Router();

  usersRouter.post('/', function (req, res) {
    res.send({
      user: 1,
      token: 1
    });
  });

  usersRouter.delete('/:id', function (req, res) {
    res.status(204).end();
  });

  app.use('/api/tokens', usersRouter);
};
