ApplicationKernel.namespace('Vaultier.Mock');

/**
 * Object that mock role
 *
 * @module mock
 * @class Vaultier.Mock.RoleMock
 */
Vaultier.Mock.RoleMock = Vaultier.Mock.BaseMock.create({

    /**
     * @method run
     * @param {Ember.Application} app
     * @param {mixed} container
     */
    run: function (app, container) {
        this.mockGetRolesForNode();
        this.mockGetRolesForParent();

    },

    /**
     * Mock GET method for get roles for given node
     * example url: /api/roles/?node=1
     *
     * @method mockGetRolesForNode
     */
    mockGetRolesForNode: function () {
        var that = this;
        Ember.$.mockjax({
            url: /^\/api\/roles\/$/,
            type: 'GET',
            data: { node: /([\d]+)/ },
            response: function (settings) {
                var response = [];
                response.pushObject(that.fixtures[0]);
                response.pushObject(that.fixtures[1]);
                response.pushObject(that.fixtures[2]);
                this.responseText = response;
            }
        });
    },

    /**
     * Mock GET method for get roles which have been inherit from parents
     * example url: /api/roles/?parent=1
     *
     * @method mockGetRolesForParent
     */
    mockGetRolesForParent: function () {
        var that = this;
        Ember.$.mockjax({
            url: /^\/api\/roles\/$/,
            type: 'GET',
            data: { parent_node: /([\d]+)/ },
            response: function (settings) {
                var response = [];
                response.pushObject(that.fixtures[3]);
                response.pushObject(that.fixtures[4]);
                response.pushObject(that.fixtures[5]);
                response.pushObject(that.fixtures[6]);
                response.pushObject(that.fixtures[7]);
                response.pushObject(that.fixtures[8]);
                this.responseText = response;
            }
        });
    },

    fixtures: [

    /*********************************
     ************ ACTUAL **************
     **********************************/

    /*** MANAGE ***/
        {
            "created_at": "2014-12-12T08:59:49.496Z",
            "id": 1,
            "level": 300,
            "member": {
                "created_at": "2014-12-12T08:59:20.337Z",
                "email": "vojtech.knaisl@rclick.cz",
                "id": 1,
                "nickname": "Vojtěch Knaisl",
                "status": 300,
                "updated_at": "2014-12-12T09:02:59.253Z",
                "user": 1,
                "node": 2
            },
            "updated_at": "2014-12-12T09:01:17.992Z",
            "node": 2
        },

    /*** READ ***/
        {
            "created_at": "2014-12-12T08:59:49.496Z",
            "id": 2,
            "level": 200,
            "member": {
                "created_at": "2014-12-12T08:59:20.337Z",
                "email": "jakub.bokoc@rclick.cz",
                "id": 2,
                "nickname": "Jakub Bokoč",
                "status": 200,
                "updated_at": "2014-12-12T09:02:59.253Z",
                "user": 2,
                "node": 2
            },
            "updated_at": "2014-12-12T09:01:17.992Z",
            "node": 2
        },

    /*** CREATE ***/
        {
            "created_at": "2014-12-12T08:59:49.496Z",
            "id": 3,
            "level": 100,
            "member": {
                "created_at": "2014-12-12T08:59:20.337Z",
                "email": "tomas.plesek@rclick.cz",
                "id": 3,
                "nickname": "Tomáš Plešek",
                "status": 300,
                "updated_at": "2014-12-12T09:02:59.253Z",
                "user": 3,
                "node": 2
            },
            "updated_at": "2014-12-12T09:01:17.992Z",
            "node": 2
        },


    /*********************************
     ************ INHERIT *************
     **********************************/

    /*** MANAGE ***/
        {
            "created_at": "2014-12-12T08:59:49.496Z",
            "id": 4,
            "level": 300,
            "member": {
                "created_at": "2014-12-12T08:59:20.337Z",
                "email": "jan.misek@rclick.cz",
                "id": 4,
                "nickname": "Jan Míšek",
                "status": 300,
                "updated_at": "2014-12-12T09:02:59.253Z",
                "user": 4,
                "node": 1
            },
            "updated_at": "2014-12-12T09:01:17.992Z",
            "node": 1
        },
        {
            "created_at": "2014-12-12T08:59:49.496Z",
            "id": 5,
            "level": 300,
            "member": {
                "created_at": "2014-12-12T08:59:20.337Z",
                "email": "stepan.bokoc@rclick.cz",
                "id": 5,
                "nickname": "Štěpán Bokoč",
                "status": 300,
                "updated_at": "2014-12-12T09:02:59.253Z",
                "user": 5,
                "node": 1
            },
            "updated_at": "2014-12-12T09:01:17.992Z",
            "node": 1
        },


    /*** READ ***/
        {
            "created_at": "2014-12-12T08:59:49.496Z",
            "id": 6,
            "level": 200,
            "member": {
                "created_at": "2014-12-12T08:59:20.337Z",
                "email": "jakub.randak@rclick.cz",
                "id": 6,
                "nickname": "Jakub Randák",
                "status": 200,
                "updated_at": "2014-12-12T09:02:59.253Z",
                "user": 6,
                "node": 1
            },
            "updated_at": "2014-12-12T09:01:17.992Z",
            "node": 1
        },
        {
            "created_at": "2014-12-12T08:59:49.496Z",
            "id": 7,
            "level": 200,
            "member": {
                "created_at": "2014-12-12T08:59:20.337Z",
                "email": "jan.dvorak@rclick.cz",
                "id": 7,
                "nickname": "Jan Dvořák",
                "status": 100,
                "updated_at": "2014-12-12T09:02:59.253Z",
                "user": 7,
                "node": 1
            },
            "updated_at": "2014-12-12T09:01:17.992Z",
            "node": 1
        },

    /*** CREATE ***/
        {
            "created_at": "2014-12-12T08:59:49.496Z",
            "id": 8,
            "level": 100,
            "member": {
                "created_at": "2014-12-12T08:59:20.337Z",
                "email": "ondrej.kmoch@rclick.cz",
                "id": 8,
                "nickname": "Ondřej Kmoch",
                "status": 300,
                "updated_at": "2014-12-12T09:02:59.253Z",
                "user": 8,
                "node": 1
            },
            "updated_at": "2014-12-12T09:01:17.992Z",
            "node": 1
        },
        {
            "created_at": "2014-12-12T08:59:49.496Z",
            "id": 9,
            "level": 100,
            "member": {
                "created_at": "2014-12-12T08:59:20.337Z",
                "email": "marcel.mika@rclick.cz",
                "id": 9,
                "nickname": "Marcel Mika",
                "status": 300,
                "updated_at": "2014-12-12T09:02:59.253Z",
                "user": 9,
                "node": 1
            },
            "updated_at": "2014-12-12T09:01:17.992Z",
            "node": 1
        }

    ]

});

Vaultier.Mock.MockManager.registerMock(Vaultier.Mock.RoleMock);