ApplicationKernel.namespace('Vaultier.Mock');

/**
 * Object that mock member
 *
 * @module mock
 * @class Vaultier.Mock.MemberMock
 */
Vaultier.Mock.MemberMock = Vaultier.Mock.BaseMock.create({

    /**
     * @method run
     * @param {Ember.Application} app
     * @param {mixed} container
     */
    run: function (app, container) {
        this.mockGetSearchForMembers();

    },

    /**
     * Mock GET method for get childrens of node
     * example url: /api/members/?node=1&?search=Voj
     *
     * @method mockGetSearchForMembers
     */
    mockGetSearchForMembers: function () {
        var that = this;
        Ember.$.mockjax({
            url: /^\/api\/members\/$/,
            type: 'GET',
            data: { node: /([\d]+)/, search: /([\w]*)/ },
            response: function (settings) {
                this.responseText = that.fixtures;
            }
        });
    },

    fixtures: [
        {
            "created_at": "2014-12-12T08:59:20.337Z",
            "email": "vojtech.knaisl@rclick.cz",
            "id": 1,
            "nickname": "Vojtěch Knaisl",
            "status": 300,
            "updated_at": "2014-12-12T09:02:59.253Z",
            "user": 1,
            "node": 1
        },
        {
            "created_at": "2014-12-12T08:59:20.337Z",
            "email": "jakub.bokoc@rclick.cz",
            "id": 2,
            "nickname": "Jakub Bokoč",
            "status": 200,
            "updated_at": "2014-12-12T09:02:59.253Z",
            "user": 2,
            "node": 1
        },
        {
            "created_at": "2014-12-12T08:59:20.337Z",
            "email": "tomas.plesek@rclick.cz",
            "id": 3,
            "nickname": "Tomáš Plešek",
            "status": 300,
            "updated_at": "2014-12-12T09:02:59.253Z",
            "user": 3,
            "node": 1
        },
        {
            "created_at": "2014-12-12T08:59:20.337Z",
            "email": "jan.misek@rclick.cz",
            "id": 4,
            "nickname": "Jan Míšek",
            "status": 300,
            "updated_at": "2014-12-12T09:02:59.253Z",
            "user": 4,
            "node": 1
        },
        {
            "created_at": "2014-12-12T08:59:20.337Z",
            "email": "stepan.bokoc@rclick.cz",
            "id": 5,
            "nickname": "Štěpán Bokoč",
            "status": 300,
            "updated_at": "2014-12-12T09:02:59.253Z",
            "user": 5,
            "node": 1
        },
        {
            "created_at": "2014-12-12T08:59:20.337Z",
            "email": "jakub.randak@rclick.cz",
            "id": 6,
            "nickname": "Jakub Randák",
            "status": 200,
            "updated_at": "2014-12-12T09:02:59.253Z",
            "user": 6,
            "node": 1
        },
        {
            "created_at": "2014-12-12T08:59:20.337Z",
            "email": "jan.dvorak@rclick.cz",
            "id": 7,
            "nickname": "Jan Dvořák",
            "status": 100,
            "updated_at": "2014-12-12T09:02:59.253Z",
            "user": 7,
            "node": 1
        },
        {
            "created_at": "2014-12-12T08:59:20.337Z",
            "email": "ondrej.kmoch@rclick.cz",
            "id": 8,
            "nickname": "Ondřej Kmoch",
            "status": 300,
            "updated_at": "2014-12-12T09:02:59.253Z",
            "user": 8,
            "node": 1
        },
        {
            "created_at": "2014-12-12T08:59:20.337Z",
            "email": "marcel.mika@rclick.cz",
            "id": 9,
            "nickname": "Marcel Mika",
            "status": 300,
            "updated_at": "2014-12-12T09:02:59.253Z",
            "user": 9,
            "node": 1
        }

    ]

});

Vaultier.Mock.MockManager.registerMock(Vaultier.Mock.MemberMock);