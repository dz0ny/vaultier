ApplicationKernel.namespace('Vaultier.dal.adapter');

/**
 * @module vaultier-dal-adapter
 * @class Vaultier.dal.adapter.NodeBlobAdapter
 * @extends RL.Model
 */
Vaultier.dal.adapter.NodeBlobAdapter = Vaultier.dal.core.RESTAdapter.extend({

    /**
     * Save data for node if it has been modified
     *
     * @method saveDirtyBlob
     * @param {Vaultier.dal.model.NodeBlob} nodeBlob
     * @returns {Ember.RSVP.Promise}
     */
    saveDirtyBlob: function (nodeBlob) {
        var params = {
            url: '/api/nodes/' + this.get('id') + '/data/',
            type: 'PUT',
            data: nodeBlob.serialize(),
            processData: false,
            contentType: false
        };
        return Utils.RSVPAjax(params)
    }

});
