import Ember from 'ember';
import RSVPAjax from 'vaultier/app/utils/rsvp-ajax';
import RESTAdapter from './../core/rest-adapter';


/**
 * @module vaultier-dal-adapter
 * @class Vaultier.dal.adapter.NodeBlobAdapter
 * @extends RL.Model
 */
export default RESTAdapter.extend({

    /**
     * Save data for node if it has been modified
     *
     * @method saveDirtyBlob
     * @param {Vaultier.dal.model.NodeBlob} nodeBlob
     * @returns {Ember.RSVP.Promise}
     */
    saveDirtyBlob: function (nodeBlob) {
        var params = {
            url: '/api/nodes/' + nodeBlob.get('id') + '/data/',
            type: 'PUT',
            data: nodeBlob.serialize(),
            processData: false,
            contentType: false
        };
        return RSVPAjax(params);
    }

});
