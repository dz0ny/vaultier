import BaseMock from './base-mock';
import Ember from 'ember';

/**
 * Object that mock node
 *
 * @module mock
 * @class Vaultier.Mock.NodeMock
 */
export default BaseMock.create({

    /**
     * An abstract method which must be implemented. It is the start point for running mock
     *
     * @method run
     * @param {Ember.Application} app
     * @param {mixed} container
     */
    run: function (app, container) {
        this.mockSearch();
        this.mockGetDetail();
        this.mockGetParent();
        this.mockGetChildren();
        this.mockGet();
        this.mockPost();
        this.mockPut();
        this.mockDelete();
        this.lastId = 20;
    },

    /**
     * Mock GET method for list root nodes
     * example url: /api/nodes/
     *
     * @method mockGet
     */
    mockGet: function () {
        var that = this;
        Ember.$.mockjax({
            url: /^\/api\/nodes\/$/,
            type: 'GET',
            response: function (settings) {
                this.responseText = that.findRootNodes();
            }
        });
    },

    /**
     * Mock GET method for detail
     * example url: /api/nodes/1/
     *
     * @method mockGetDetail
     */
    mockGetDetail: function () {
        var that = this;
        Ember.$.mockjax({
            url: /^\/api\/nodes\/([\d]+)\/$/,
            urlParams: ['nodeId'],
            type: 'GET',
            response: function (settings) {
                this.responseText = that.findById(settings.urlParams.nodeId);
            }
        });
    },

    /**
     * Mock GET method for get parents of node
     * example url: /api/nodes/1/path
     *
     * @method mockGetParent
     */
    mockGetParent: function () {
        var that = this;
        Ember.$.mockjax({
            url: /^\/api\/nodes\/([\d]+)\/path$/,
            urlParams: ['nodeId'],
            type: 'GET',
            response: function (settings) {
                this.responseText = that.findParentNodes(settings.urlParams.nodeId);
            }
        });
    },

    /**
     * Mock GET method for get childrens of node
     * example url: /api/nodes/?parent=1
     *
     * @method mockGetChildren
     */
    mockGetChildren: function () {
        var that = this;
        Ember.$.mockjax({
            url: /^\/api\/nodes\/$/,
            type: 'GET',
            data: { parent: /([\d]+)/ },
            response: function (settings) {
                this.responseText = that.findChildrenNodes(settings.data.parent);
            }
        });
    },

    /**
     * Mock POST method for create node
     * url: /api/nodes/1/
     *
     * @method mockGetParent
     */
    mockPost: function () {
        var that = this;
        Ember.$.mockjax({
            url: /^\/api\/nodes\/$/,
            urlParams: ['nodeId'],
            type: 'POST',
            response: function (settings) {
                console.log(settings);
                console.log(settings.data);

                var node = JSON.parse(settings.data);

                var fixtureNode = {};
                fixtureNode.id = that.lastId++;
                fixtureNode.name = node.name ? node.name : null;
                fixtureNode.type = node.type ? node.type : null;
                fixtureNode.data = node.data ? node.data : null;
                fixtureNode.color = node.color ? node.color : null;
                fixtureNode.enc_version = node.enc_version ? node.enc_version : null;
                fixtureNode.created_by = node.created_by ? node.created_by : null;
                fixtureNode.created_at = node.created_at ? node.created_at : null;
                fixtureNode.updated_at = node.updated_at ? node.updated_at : null;
                fixtureNode.parent = node.parent ? node.parent : null;
                fixtureNode.perms = {
                    "read": true,
                    "create": true,
                    "update": true,
                    "delete": true,
                    "invite": true
                };

                console.log(fixtureNode);

                that.fixtures.pushObject(fixtureNode);
                this.responseText = fixtureNode;
            }
        });
    },


    /**
     * Mock DELETE method for detail
     * example url: /api/nodes/1/
     *
     * @method mockGetDetail
     */
    mockDelete: function () {
        var that = this;
        Ember.$.mockjax({
            url: /^\/api\/nodes\/([\d]+)\/$/,
            urlParams: ['nodeId'],
            type: 'DELETE',
            response: function (settings) {
                var fixtureNode = that.findById(settings.urlParams.nodeId);

                //remove children
                var childrenToRemove = that._removeNode(Ember.A(), fixtureNode);
                childrenToRemove.forEach(function (child) {
                    that.fixtures.removeObject(child);
                });

                //remove itself
                that.fixtures.removeObject(fixtureNode);

                this.responseText = null;
            }
        });
    },

    /**
     * Mock GET method for searching nodes
     * example url: /api/nodes/?search=facebook
     *
     * @method mockSearch
     */
    mockSearch: function () {
        var that = this;
        Ember.$.mockjax({
            url: /^\/api\/nodes\/$/,
            type: 'GET',
            data: { search: /([\w]*)/ },
            response: function (settings) {
                this.responseText = [];
                for (var i = 0; i < that.fixtures.length; i++) {
                    if (that.fixtures[i].name.toLowerCase().search(settings.data.search.toLowerCase()) >= 0) {
                        if (this.responseText.length === 4) {
                            break;
                        }
                        this.responseText.pushObject(that.fixtures[i]);
                    }
                }
                //Utils.Logger.log.debug(this.responseText);
            }
        });
    },

    /**
     * Return all child node (recursively) from example data according to given id
     *
     * @method findChildrenNodes
     * @returns {*}
     */
    _removeNode: function (childrenArray, node) {
        this.fixtures.forEach(function (fixture) {
            if (fixture.parent === node.id) {
                childrenArray.pushObject(fixture);
                var children = this._removeNode(childrenArray, fixture);
            }
        }.bind(this));
        return childrenArray;
    },

    /**
     * Return root nodes from example data
     *
     * @method findRootNodes
     * @returns {*}
     */
    findRootNodes: function () {
        var fixtureToReturn = Ember.A();
        this.fixtures.forEach(function (fixture) {
            if (fixture.parent == null) {
                fixtureToReturn.pushObject(fixture);
            }
        });
        return fixtureToReturn;
    },

    /**
     * Return parents node from example data according to given id
     *
     * @method findParentNodes
     * @returns {*}
     */
    findParentNodes: function (id) {
        var node = this.findById(id);
        var fixtureToReturn = null;
        if (node.parent) {
            fixtureToReturn = this.getParents(this.findById(node.parent));
        } else {
            fixtureToReturn = [];
        }

        console.log(fixtureToReturn);
        return fixtureToReturn;
    },

    /**
     * Recursive method for finding all parents for given node
     *
     * @method _getParents
     * @param node
     * @returns {Array}
     * @private
     */
    getParents: function (node) {
        var parents = null;
        console.log(node);
        if (node.parent) {
            parents = this.getParents(this.findById(node.parent));
            parents.pushObject(node);
            return parents;
        } else {
            parents = new Ember.A();
            parents.pushObject(node);
            return parents;
        }
    },

    /**
     * Return child node from example data according to given id
     *
     * @method findChildrenNodes
     * @returns {*}
     */
    findChildrenNodes: function (parentNodeId) {
        var fixtureToReturn = Ember.A();
        this.fixtures.forEach(function (fixture) {
            if (fixture.parent === parentNodeId) {
                fixtureToReturn.pushObject(fixture);
            }
        });
        return fixtureToReturn;
    },



});

//Vaultier.Mock.MockManager.registerMock(Vaultier.Mock.NodeMock);
