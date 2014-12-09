ApplicationKernel.namespace('Vaultier.dal.adapter');

/**
 * @module vaultier-dal-adapter
 * @class Vaultier.dal.adapter.NodeAdapter
 * @extends RL.Model
 */
Vaultier.dal.adapter.NodeAdapter = Vaultier.dal.core.RESTAdapter.extend({

    findParents: function (id) {
        return Utils.RSVPAjax({
            url: '/api/nodes/' + id + '/path',
            type: 'get'
        }).then(function (parentObjects) {
            parentModels = [];
            parentObjects.forEach(function (parentObject) {
                var parentModel = Vaultier.dal.model.Node.create({
                    id: parentObject.id,
                    name: parentObject.name,
                    meta: parentObject.meta,
                    node_subtype: parentObject.node_subtype,
                    data: parentObject.data,
                    color: parentObject.color,
                    enc_version: parentObject.enc_version,
                    created_by: parentObject.created_by,
                    created_at: parentObject.created_at,
                    updated_at: parentObject.updated_at,
                    parent: parentObject.parent
                });
                parentModels.pushObject(parentModel);
                console.log(parentModel);
            });
            return parentModels;
        });
    }

})
