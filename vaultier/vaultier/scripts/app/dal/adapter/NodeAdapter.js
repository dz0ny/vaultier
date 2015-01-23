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
    }

});


