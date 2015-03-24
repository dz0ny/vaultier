/* global require, module, __dirname */

module.exports = function (app) {
  var express = require('express');
  var nodes = require(__dirname + '/../../fixtures/nodes/nodes')();
  var nodesRouter = express.Router();

  var bodyParser = require('body-parser');
  nodesRouter.use( bodyParser.json() );       // to support JSON-encoded bodies
  nodesRouter.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  }));


  nodesRouter.get('/', function (req, res) {
    //res.send([user()]);
  });

  nodesRouter.post('/', function (req, res) {
    var body = req.body;

    var node = {};
    node.id = new Date().getTime();
    node.name = body.name ? body.name : null;
    node.type = body.type ? body.type : null;
    node.data = body.data ? body.data : null;
    node.color = body.color ? body.color : null;
    node.enc_version = body.enc_version ? body.enc_version : null;
    node.created_by = body.created_by ? body.created_by : null;
    node.created_at = body.created_at ? body.created_at : null;
    node.updated_at = body.updated_at ? body.updated_at : null;
    node.parent = body.parent ? body.parent : null;
    node.perms = {
      "read": true,
      "create": true,
      "update": true,
      "delete": true,
      "invite": true
    };

    nodes.push(node);

    res.send(node);
  });

  nodesRouter.put('/:id', function (req, res) {
    console.log(req);
    var fixtureNode = this.findById(node.id);
    fixtureNode.id = node.id;
    fixtureNode.name = node.name;
    fixtureNode.type = node.type;
    fixtureNode.data = node.data;
    fixtureNode.color = node.color;
    fixtureNode.enc_version = node.enc_version;
    fixtureNode.created_by = node.created_by;
    fixtureNode.created_at = node.created_at;
    fixtureNode.updated_at = node.updated_at;
    fixtureNode.parent = node.parent;
    that.fixtures.pushObject(node);
    this.responseText = node;


    res.send(user());
  });

  nodesRouter.post('/', function (req, res) {
    res.send(user());
    res.status(204).end();
  });

  nodesRouter.delete('/:id', function (req, res) {
    res.status(204).end();
  });

  app.use('/api/nodes', nodesRouter);
};
