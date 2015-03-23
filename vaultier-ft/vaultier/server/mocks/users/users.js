/* global require, module, __dirname */

module.exports = function (app) {
  var express = require('express');
  var user = require(__dirname+'/../../fixtures/users/user-jan');
  var usersRouter = express.Router();

  usersRouter.get('/', function (req, res) {
    res.send([user()]);
  });

  usersRouter.get('/:id', function (req, res) {
    res.send(user());
  });

  usersRouter.post('/', function (req, res) {
    res.send(user());
    res.status(204).end();
  });

  usersRouter.delete('/:id', function (req, res) {
    res.status(204).end();
  });

  app.use('/api/users', usersRouter);
};
