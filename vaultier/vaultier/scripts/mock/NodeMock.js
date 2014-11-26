ApplicationKernel.namespace('Vaultier.Mock');

/**
 * Object that mock node
 *
 * @module mock
 * @class Vaultier.Mock.NodeMock
 */
Vaultier.Mock.NodeMock = Vaultier.Mock.BaseMock.create({

    /**
     * An abstract method which must be implemented. It is the start point for running mock
     *
     * @method run
     * @param {Ember.Application} app
     * @param {mixed} container
     */
    run: function (app, container) {
        this.mockGetDetail();
        this.mockGetParent();
        this.mockGetChildren();
        this.mockGet();
    },

    /**
     * Mock GET method for list root nodes
     * url: /api/nodes/
     *
     * @method mockGet
     */
    mockGet: function () {
        var that = this;
        Ember.$.mockjax({
            url: /^\/api\/nodes\/$/,
            urlParams: ['nodeId'],
            type: 'GET',
            response: function (settings) {
                this.responseText = that.findRootNodes();
            }
        });
    },

    /**
     * Mock GET method for detail
     * url: /api/nodes/1/
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
     * url: /api/nodes/1/path
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
     * url: /api/nodes/?parent=1
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
        var fixtureToReturn = Ember.A();
        this.fixtures.forEach(function (fixture) {
            if (fixture.parent == id) {
                fixtureToReturn.pushObject(fixture);
            }
        });
        return fixtureToReturn;
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
            if (fixture.parent == parentNodeId) {
                fixtureToReturn.pushObject(fixture);
            }
        });
        return fixtureToReturn;
    },

    fixtures: [
        {
            "id": 1,
            "name": "rClick",
            "meta": "some-encrypted-data",
            "node_subtype": 100,
            "data": null,
            "color": "blue",
            "enc_version": 1,
            "created_by": 1,
            "created_at": "2014-05-28T10:10:30.501Z",
            "updated_at": "2014-05-28T10:10:30.501Z",
            "parent": null
        },
        {
            "id": 2,
            "name": "Cloudsoftphone",
            "meta": "some-encrypted-data",
            "node_subtype": 100,
            "data": "http://example.com/1",
            "color": "blue",
            "enc_version": 1,
            "created_by": 1,
            "created_at": "2014-05-30T22:22:22.501Z",
            "updated_at": "2015-05-30T23:23:23.501Z",
            "parent": 1
        },
        {
            "id": 3,
            "name": "Production server",
            "meta": "some-encrypted-data",
            "node_subtype": 100,
            "data": "http://example.com/1",
            "color": "green",
            "enc_version": 1,
            "created_by": 1,
            "created_at": "2014-05-30T22:22:22.501Z",
            "updated_at": "2015-05-30T23:23:23.501Z",
            "parent": 2
        },
        {
            "id": 4,
            "name": "Beta server",
            "meta": "some-encrypted-data",
            "node_subtype": 100,
            "data": "http://example.com/1",
            "color": "purple",
            "enc_version": 1,
            "created_by": 1,
            "created_at": "2014-05-30T22:22:22.501Z",
            "updated_at": "2015-05-30T23:23:23.501Z",
            "parent": 2
        },
        {
            "id": 5,
            "name": "Jira",
            "meta": "some-encrypted-data",
            "node_subtype": 100,
            "data": "http://example.com/1",
            "color": "orange",
            "enc_version": 1,
            "created_by": 1,
            "created_at": "2014-05-30T22:22:22.501Z",
            "updated_at": "2015-05-30T23:23:23.501Z",
            "parent": 2
        },
        {
            "id": 6,
            "name": "Sentry",
            "meta": "some-encrypted-data",
            "node_subtype": 100,
            "data": "http://example.com/1",
            "color": "red",
            "enc_version": 1,
            "created_by": 1,
            "created_at": "2014-05-30T22:22:22.501Z",
            "updated_at": "2015-05-30T23:23:23.501Z",
            "parent": 2
        },
        {
            "id": 7,
            "name": "Readme",
            "meta": "some-encrypted-data",
            "node_subtype": 400,
            "data": "http://example.com/1",
            "color": "blue",
            "enc_version": 1,
            "created_by": 1,
            "created_at": "2014-05-30T22:22:22.501Z",
            "updated_at": "2015-05-30T23:23:23.501Z",
            "parent": 2
        },
        {
            "id": 8,
            "name": "Vaultier",
            "meta": "some-encrypted-data",
            "node_subtype": 100,
            "data": "http://example.com/1",
            "color": "blue",
            "enc_version": 1,
            "created_by": 1,
            "created_at": "2014-05-30T22:22:22.501Z",
            "updated_at": "2015-05-30T23:23:23.501Z",
            "parent": 1
        },
        {
            "id": 9,
            "name": "File server",
            "meta": "some-encrypted-data",
            "node_subtype": 100,
            "data": "http://example.com/1",
            "color": "blue",
            "enc_version": 1,
            "created_by": 1,
            "created_at": "2014-05-30T22:22:22.501Z",
            "updated_at": "2015-05-30T23:23:23.501Z",
            "parent": 1
        },
        {
            "id": 10,
            "name": "Prod03",
            "meta": "some-encrypted-data",
            "node_subtype": 100,
            "data": "http://example.com/1",
            "color": "blue",
            "enc_version": 1,
            "created_by": 1,
            "created_at": "2014-05-30T22:22:22.501Z",
            "updated_at": "2015-05-30T23:23:23.501Z",
            "parent": 1
        },
        {
            "id": 11,
            "name": "Confluence",
            "meta": "some-encrypted-data",
            "node_subtype": 100,
            "data": "http://example.com/1",
            "color": "blue",
            "enc_version": 1,
            "created_by": 1,
            "created_at": "2014-05-30T22:22:22.501Z",
            "updated_at": "2015-05-30T23:23:23.501Z",
            "parent": 1
        },
        {
            "id": 12,
            "name": "CVUT",
            "meta": "some-encrypted-data",
            "node_subtype": 100,
            "data": "http://example.com/1",
            "color": "purple",
            "enc_version": 1,
            "created_by": 1,
            "created_at": "2014-05-30T22:22:22.501Z",
            "updated_at": "2015-05-30T23:23:23.501Z",
            "parent": null
        },
        {
            "id": 13,
            "name": "Personal",
            "meta": "some-encrypted-data",
            "node_subtype": 100,
            "data": "http://example.com/1",
            "color": "blue",
            "enc_version": 1,
            "created_by": 1,
            "created_at": "2014-05-30T22:22:22.501Z",
            "updated_at": "2015-05-30T23:23:23.501Z",
            "parent": null
        },
        {
            "id": 14,
            "name": "Certificate",
            "meta": "some-encrypted-data",
            "node_subtype": 400,
            "data": "http://example.com/1",
            "enc_version": 1,
            "created_by": 1,
            "created_at": "2014-05-30T22:22:22.501Z",
            "updated_at": "2015-05-30T23:23:23.501Z",
            "parent": 13
        },
        {
            "id": 15,
            "name": "Facebook",
            "meta": "some-encrypted-data",
            "node_subtype": 300,
            "data": "http://example.com/1",
            "enc_version": 1,
            "created_by": 1,
            "created_at": "2014-05-30T22:22:22.501Z",
            "updated_at": "2015-05-30T23:23:23.501Z",
            "parent": 13
        },
        {
            "id": 16,
            "name": "Readme",
            "meta": "some-encrypted-data",
            "node_subtype": 400,
            "data": "http://example.com/1",
            "enc_version": 1,
            "created_by": 1,
            "created_at": "2014-05-30T22:22:22.501Z",
            "updated_at": "2015-05-30T23:23:23.501Z",
            "parent": 13
        },
        {
            "id": 17,
            "name": "Certificate iOS",
            "meta": "some-encrypted-data",
            "node_subtype": 200,
            "data": "http://example.com/1",
            "enc_version": 1,
            "created_by": 1,
            "created_at": "2014-05-30T22:22:22.501Z",
            "updated_at": "2015-05-30T23:23:23.501Z",
            "parent": 13
        }


    ]

});

Vaultier.Mock.MockManager.registerMock(Vaultier.Mock.NodeMock);