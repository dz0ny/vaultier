ApplicationKernel.namespace('Vaultier.dal.model');

var decryptedField = Vaultier.dal.mixin.EncryptedModel.decryptedField;

/**
 * @module vaultier-dal-model
 * @class Vaultier.dal.model.NodeBlob
 * @extends RL.Model
 */
Vaultier.dal.model.NodeBlob = RL.Model.extend(
    Vaultier.dal.mixin.EncryptedModel.Mixin,
    {
        init: function () {
            this.set('adapter', Vaultier.__container__.lookup('adapter:nodeblob'));
            Utils.Logger.log.debug(this.get('adapter'));
            return this._super.apply(this, arguments);
        },

        blob_meta: RL.attr('string'),
        blob_data: RL.attr('string'),

        filename: decryptedField('blob_meta', 'filename'),
        filesize: decryptedField('blob_meta', 'filesize'),
        filetype: decryptedField('blob_meta', 'filetype'),
        filedata: decryptedField('blob_data', 'filedata'),

        /**
         * @DI adapter:nodeblob
         */
        adapter: null,

        membership: RL.attr('object', { readOnly: true }),

        serialize: function () {
            var data = this._super.apply(this, arguments)
            var formData = new FormData()
            formData.append('blob_data', new Blob([data['blob_data']], { type: 'application/octet-stream'}))
            formData.append('blob_meta', data['blob_meta']);
            return formData
        },

        saveRecord: function () {
            if (this.get('isDirty')) {
                return this.get('adapter').saveDirtyBlob(this);
            } else {
                return Ember.RSVP.resolve(this);
            }
        }
    }
);