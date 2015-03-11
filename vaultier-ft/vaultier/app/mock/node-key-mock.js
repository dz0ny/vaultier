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
     * Mock PUT method for update node
     * example: url: /api/nodes/1/
     *
     * @method mockGetParent
     */
    mockPut: function () {
        var that = this;
        Ember.$.mockjax({
            url: /^\/api\/nodes\/([\d]+)\/$/,
            urlParams: ['nodeId'],
            type: 'PUT',
            response: function (settings) {
                console.log(settings);
                console.log(settings.data);
                var node = JSON.parse(settings.data);
                console.log(node);

                var fixtureNode = that.findById(node.id);
                console.log(fixtureNode);
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

    fixtures: [
        {
            "id": 1,
            "name": "rClick",
            "type": 100,
            "data": null,
            "color": "blue",
            "enc_version": 1,
            "created_by": {
                "id": 1,
                "email": "vojtech.knaisl@rclick.cz",
                "nickname": "Vojtech Knaisl"
            },
            "created_at": "2014-05-28T10:10:30.501Z",
            "updated_at": "2014-05-28T10:10:30.501Z",
            "parent": null,
            "perms": {
                "read": true,
                "create": true,
                "update": true,
                "delete": true,
                "invite": true
            },
            "membership": {
                "id": 23,
                "status": 300,
                "workspace_key": "QiJIXGEj0tMPllpksp/0lTBy6HaxmaEVhqAWrtwgdvkm0"
            }
        },
        {
            "id": 2,
            "name": "Cloudsoftphone",
            "type": 100,
            "data": null,
            "color": "blue",
            "enc_version": 1,
            "created_by": {
                "id": 1,
                "email": "jakub.bokoc@rclick.cz",
                "nickname": "Jakub Bokoč"
            },
            "created_at": "2014-05-30T22:22:22.501Z",
            "updated_at": "2014-12-15T23:23:23.501Z",
            "parent": 1,
            "perms": {
                "read": true,
                "create": true,
                "update": true,
                "delete": true,
                "invite": true
            },
            "membership": {
                "id": 23,
                "status": 300,
                "workspace_key": "QiJIXGEj0tMPllpksp/0lTBy6HaxmaEVhqAWrtwgdvkm0"
            }
        },
        {
            "id": 3,
            "name": "Production server",
            "type": 100,
            "data": null,
            "color": "green",
            "enc_version": 1,
            "created_by": {
                "id": 1,
                "email": "vojtech.knaisl@rclick.cz",
                "nickname": "Vojtech Knaisl"
            },
            "created_at": "2014-05-30T22:22:22.501Z",
            "updated_at": "2014-12-14T23:23:23.501Z",
            "parent": 2,
            "perms": {
                "read": true,
                "create": true,
                "update": true,
                "delete": true,
                "invite": true
            },
            "membership": {
                "id": 23,
                "status": 300,
                "workspace_key": "QiJIXGEj0tMPllpksp/0lTBy6HaxmaEVhqAWrtwgdvkm0"
            }
        },
        {
            "id": 19,
            "name": "Database",
            "type": 100,
            "data": null,
            "color": "red",
            "enc_version": 1,
            "created_by": {
                "id": 1,
                "email": "stepan.bokoc@rclick.cz",
                "nickname": "Štěpán Bokoč"
            },
            "created_at": "2014-05-30T22:22:22.501Z",
            "updated_at": "2014-11-16T23:23:23.501Z",
            "parent": 3,
            "perms": {
                "read": true,
                "create": true,
                "update": true,
                "delete": true,
                "invite": true
            },
            "membership": {
                "id": 23,
                "status": 300,
                "workspace_key": "QiJIXGEj0tMPllpksp/0lTBy6HaxmaEVhqAWrtwgdvkm0"
            }
        },
        {
            "id": 4,
            "name": "Beta server",
            "type": 100,
            "data": null,
            "color": "purple",
            "enc_version": 1,
            "created_by": {
                "id": 1,
                "email": "jan.misek@rclick.cz",
                "nickname": "Jan Míšek"
            },
            "created_at": "2014-05-30T22:22:22.501Z",
            "updated_at": "2014-12-16T23:23:23.501Z",
            "parent": 2,
            "perms": {
                "read": true,
                "create": true
            },
            "membership": {
                "id": 23,
                "status": 300,
                "workspace_key": "QiJIXGEj0tMPllpksp/0lTBy6HaxmaEVhqAWrtwgdvkm0"
            }
        },
        {
            "id": 5,
            "name": "Jira",
            "type": 100,
            "data": null,
            "color": "orange",
            "enc_version": 1,
            "created_by": {
                "id": 1,
                "email": "vojtech.knaisl@rclick.cz",
                "nickname": "Vojtech Knaisl"
            },
            "created_at": "2014-05-30T22:22:22.501Z",
            "updated_at": "2014-12-16T23:23:23.501Z",
            "parent": 2,
            "perms": {
                "read": true,
                "create": true,
                "update": true,
                "delete": true
            },
            "membership": {
                "id": 23,
                "status": 300,
                "workspace_key": "QiJIXGEj0tMPllpksp/0lTBy6HaxmaEVhqAWrtwgdvkm0"
            }
        },
        {
            "id": 6,
            "name": "Sentry",
            "type": 100,
            "data": null,
            "color": "red",
            "enc_version": 1,
            "created_by": {
                "id": 1,
                "email": "jakub.bokoc@rclick.cz",
                "nickname": "Jakub Bokoč"
            },
            "created_at": "2014-05-30T22:22:22.501Z",
            "updated_at": "2014-12-16T23:23:23.501Z",
            "parent": 2,
            "perms": {
                "read": true,
                "invite": true
            },
            "membership": {
                "id": 23,
                "status": 300,
                "workspace_key": "QiJIXGEj0tMPllpksp/0lTBy6HaxmaEVhqAWrtwgdvkm0"
            }
        },
        {
            "id": 7,
            "name": "Readme",
            "type": 400,
            "data": {
                "password": "heslo",
                "username": "uzivatelske jmeno",
                "url": "adresa",
                "note": "poznamka"
            },
            blob_meta: {
                "filename": "nazev",
                "filesize": "velikost",
                "filetype": "typ"
            },
            "color": "blue",
            "enc_version": 1,
            "created_by": {
                "id": 1,
                "email": "stepan.bokoc@rclick.cz",
                "nickname": "Štěpán Bokoč"
            },
            "created_at": "2014-05-30T22:22:22.501Z",
            "updated_at": "2014-12-16T23:23:23.501Z",
            "parent": 2,
            "perms": {
                "read": true,
                "create": true,
                "update": true,
                "delete": true,
                "invite": true
            },
            "membership": {
                "id": 23,
                "status": 300,
                "workspace_key": "QiJIXGEj0tMPllpksp/0lTBy6HaxmaEVhqAWrtwgdvkm0"
            }
        },
        {
            "id": 8,
            "name": "Vaultier",
            "type": 100,
            "data": null,
            "color": "blue",
            "enc_version": 1,
            "created_by": {
                "id": 3,
                "email": "vojtech.knaisl@rclick.cz",
                "nickname": "Vojtech Knaisl"
            },
            "created_at": "2014-05-30T22:22:22.501Z",
            "updated_at": "2014-05-16T23:23:23.501Z",
            "parent": 1,
            "perms": {
                "read": true,
                "create": true,
                "update": true,
                "delete": true,
                "invite": true
            },
            "membership": {
                "id": 23,
                "status": 300,
                "workspace_key": "QiJIXGEj0tMPllpksp/0lTBy6HaxmaEVhqAWrtwgdvkm0"
            }
        },
        {
            "id": 9,
            "name": "File server",
            "type": 100,
            "data": null,
            "color": "blue",
            "enc_version": 1,
            "created_by": {
                "id": 1,
                "email": "jan.misek@rclick.cz",
                "nickname": "Jan Míšek"
            },
            "created_at": "2014-05-30T22:22:22.501Z",
            "updated_at": "2014-08-01T23:23:23.501Z",
            "parent": 1,
            "perms": {
                "read": true,
                "create": true,
                "update": true,
                "delete": true,
                "invite": true
            },
            "membership": {
                "id": 23,
                "status": 300,
                "workspace_key": "QiJIXGEj0tMPllpksp/0lTBy6HaxmaEVhqAWrtwgdvkm0"
            }
        },
        {
            "id": 10,
            "name": "Prod03",
            "type": 100,
            "data": null,
            "color": "blue",
            "enc_version": 1,
            "created_by": {
                "id": 1,
                "email": "vojtech.knaisl@rclick.cz",
                "nickname": "Vojtech Knaisl"
            },
            "created_at": "2014-05-30T22:22:22.501Z",
            "updated_at": "2014-10-20T23:23:23.501Z",
            "parent": 1,
            "perms": {
                "read": true,
                "create": true,
                "update": true,
                "delete": true,
                "invite": true
            },
            "membership": {
                "id": 23,
                "status": 300,
                "workspace_key": "QiJIXGEj0tMPllpksp/0lTBy6HaxmaEVhqAWrtwgdvkm0"
            }
        },
        {
            "id": 11,
            "name": "Confluence",
            "type": 100,
            "data": null,
            "color": "blue",
            "enc_version": 1,
            "created_by": {
                "id": 1,
                "email": "jan.misek@rclick.cz",
                "nickname": "Jan Míšek"
            },
            "created_at": "2014-05-30T22:22:22.501Z",
            "updated_at": "2014-12-16T23:23:23.501Z",
            "parent": 1,
            "perms": {
                "read": true,
                "create": true,
                "update": true,
                "delete": true,
                "invite": true
            },
            "membership": {
                "id": 23,
                "status": 300,
                "workspace_key": "QiJIXGEj0tMPllpksp/0lTBy6HaxmaEVhqAWrtwgdvkm0"
            }
        },
        {
            "id": 12,
            "name": "CVUT",
            "type": 100,
            "data": null,
            "color": "purple",
            "enc_version": 1,
            "created_by": {
                "id": 1,
                "email": "vojtech.knaisl@rclick.cz",
                "nickname": "Vojtech Knaisl"
            },
            "created_at": "2014-05-30T22:22:22.501Z",
            "updated_at": "2014-12-16T23:23:23.501Z",
            "parent": null,
            "perms": {
                "read": true,
                "create": true,
                "update": true,
                "delete": true,
                "invite": true
            },
            "membership": {
                "id": 23,
                "status": 300,
                "workspace_key": "QiJIXGEj0tMPllpksp/0lTBy6HaxmaEVhqAWrtwgdvkm0"
            }
        },
        {
            "id": 13,
            "name": "Personal",
            "type": 100,
            "data": null,
            "color": "blue",
            "enc_version": 1,
            "created_by": {
                "id": 1,
                "email": "vojtech.knaisl@rclick.cz",
                "nickname": "Vojtech Knaisl"
            },
            "created_at": "2014-05-30T22:22:22.501Z",
            "updated_at": "2014-12-16T23:23:23.501Z",
            "parent": null,
            "perms": {
                "read": true,
                "create": true,
                "update": true,
                "delete": true,
                "invite": true
            },
            "membership": {
                "id": 23,
                "status": 300,
                "workspace_key": "QiJIXGEj0tMPllpksp/0lTBy6HaxmaEVhqAWrtwgdvkm0"
            }
        },
        {
            "id": 14,
            "name": "Supr veci",
            "type": 100,
            "data": null,
            "color": "green",
            "enc_version": 1,
            "created_by": {
                "id": 1,
                "email": "vojtech.knaisl@rclick.cz",
                "nickname": "Vojtech Knaisl"
            },
            "created_at": "2014-05-30T22:22:22.501Z",
            "updated_at": "2014-12-16T23:23:23.501Z",
            "parent": 13,
            "perms": {
                "read": true,
                "create": true
            },
            "membership": {
                "id": 23,
                "status": 300,
                "workspace_key": "QiJIXGEj0tMPllpksp/0lTBy6HaxmaEVhqAWrtwgdvkm0"
            }
        },
        {
            "id": 16,
            "name": "Facebook",
            "type": 300,
            "data": {
                "username": "uzivatelske jmeno",
                "password": "heslo",
                "url": "adresa",
                "note": "poznamka"
            },
            "enc_version": 1,
            "created_by": {
                "id": 1,
                "email": "vojtech.knaisl@rclick.cz",
                "nickname": "Vojtech Knaisl"
            },
            "created_at": "2014-05-30T22:22:22.501Z",
            "updated_at": "2015-05-30T23:23:23.501Z",
            "parent": 13,
            "perms": {
                "read": true,
                "create": true,
                "update": true,
                "delete": true,
                "invite": true
            },
            "membership": {
                "id": 23,
                "status": 300,
                "workspace_key": "QiJIXGEj0tMPllpksp/0lTBy6HaxmaEVhqAWrtwgdvkm0"
            }
        },
        {
            "id": 15,
            "name": "Certificate",
            "type": 400,
            "data": {
                "password": "heslo",
                "username": "uzivatelske jmeno",
                "url": "adresa",
                "note": "poznamka"
            },
            blob_meta: {
                "filename": "nazev",
                "filesize": "velikost",
                "filetype": "typ"
            },
            "enc_version": 1,
            "created_by": {
                "id": 1,
                "email": "vojtech.knaisl@rclick.cz",
                "nickname": "Vojtech Knaisl"
            },
            "created_at": "2014-05-30T22:22:22.501Z",
            "updated_at": "2014-12-16T23:23:23.501Z",
            "parent": 13,
            "perms": {
                "read": true
            },
            "membership": {
                "id": 23,
                "status": 300,
                "workspace_key": "QiJIXGEj0tMPllpksp/0lTBy6HaxmaEVhqAWrtwgdvkm0"
            }
        },
        {
            "id": 17,
            "name": "Readme",
            "type": 400,
            "data": {
                "username": "uzivatelske jmeno",
                "password": "heslo",
                "url": "adresa",
                "note": "poznamka"
            },
            blob_meta: {
                "filename": "nazev",
                "filesize": "velikost",
                "filetype": "typ"
            },
            "enc_version": 1,
            "created_by": {
                "id": 1,
                "email": "vojtech.knaisl@rclick.cz",
                "nickname": "Vojtech Knaisl"
            },
            "created_at": "2014-05-30T22:22:22.501Z",
            "updated_at": "2014-12-16T23:23:23.501Z",
            "parent": 13,
            "perms": {
                "read": true,
                "create": true,
                "update": true,
                "delete": true,
                "invite": true
            },
            "membership": {
                "id": 23,
                "status": 300,
                "workspace_key": "QiJIXGEj0tMPllpksp/0lTBy6HaxmaEVhqAWrtwgdvkm0"
            }
        },
        {
            "id": 18,
            "name": "Certificate iOS",
            "type": 200,
            "data": {
                "note": "poznamka"
            },
            "enc_version": 1,
            "created_by": {
                "id": 1,
                "email": "vojtech.knaisl@rclick.cz",
                "nickname": "Vojtech Knaisl"
            },
            "created_at": "2014-05-30T22:22:22.501Z",
            "updated_at": "2014-12-16T23:23:23.501Z",
            "parent": 13,
            "perms": {
                "read": true,
                "create": true,
                "update": true,
                "delete": true,
                "invite": true
            },
            "membership": {
                "id": 23,
                "status": 300,
                "workspace_key": "QiJIXGEj0tMPllpksp/0lTBy6HaxmaEVhqAWrtwgdvkm0"
            }
        }


    ]

});

Vaultier.Mock.MockManager.registerMock(Vaultier.Mock.NodeMock);
