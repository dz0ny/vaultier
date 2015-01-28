ApplicationKernel.namespace('Vaultier.dal.adapter');

/**
 * @module vaultier-dal-adapter
 * @class Vaultier.dal.adapter.NodeAdapter
 * @extends RL.Model
 */
Vaultier.dal.adapter.NodeAdapter = Vaultier.dal.core.RESTAdapter.extend({

    /**
     * Load data of node for given id
     *
     * @method loadData
     * @param {Integer} id
     * @returns {Ember.RSVP.Promise}
     */
    loadData: function(id) {
        return Utils.RSVPAjax({
            url: '/api/nodes/' + id + '/data/',
            type: 'GET'
        });
    },

    /**
     * It loads child nodes of given parent node and converts them to local node representation
     *
     * @method loadParents
     * @param {Integer} id
     * @returns {Ember.RSVP.Promise}
     */
    loadParents: function(id) {
        return Utils.RSVPAjax({
            url: '/api/nodes/' + id + '/path',
            type: 'get'
        }).then(function (parentObjects) {
            var parentClasses = [];
            parentObjects.forEach(function (parentObject) {
                var parentModel = Vaultier.dal.model.Node.load({
                    id: parentObject.id,
                    name: parentObject.name,
                    meta: parentObject.meta,
                    type: parentObject.type,
                    data: parentObject.data,
                    color: parentObject.color,
                    enc_version: parentObject.enc_version,
                    created_by: parentObject.created_by,
                    created_at: parentObject.created_at,
                    updated_at: parentObject.updated_at,
                    parent: parentObject.parent,
                    membership: parentObject.membership,
                    perms: parentObject.perms
                });
                parentClasses.pushObject(parentModel);
                Utils.Logger.log.debug(parentModel);
            });
            return parentClasses;
        });
    },

    /**
     * Search nodes by given query string
     *
     * @method searchNodesByQuery
     * @param {String} queryString
     * @returns {Ember.RSVP.Promise}
     */
    searchNodesByQuery: function(queryString) {
        return Utils.RSVPAjax({
            url: '/api/nodes/',
            type: 'GET',
            data: {
                search: queryString
            }
        }).then(function(nodeObjects) {
            var nodes = [];
            nodeObjects.forEach(function (nodeObject) {
                var nodeModel = Vaultier.dal.model.Node.load({
                    id: nodeObject.id,
                    name: nodeObject.name,
                    meta: nodeObject.meta,
                    type: nodeObject.type,
                    data: nodeObject.data,
                    color: nodeObject.color,
                    enc_version: nodeObject.enc_version,
                    created_by: nodeObject.created_by,
                    created_at: nodeObject.created_at,
                    updated_at: nodeObject.updated_at,
                    parent: nodeObject.parent,
                    membership: nodeObject.membership,
                    perms: nodeObject.perms
                });

                nodes.pushObject(nodeModel);
            });
            Utils.Logger.log.debug(nodes);
            return nodes;
        });
    }

});


