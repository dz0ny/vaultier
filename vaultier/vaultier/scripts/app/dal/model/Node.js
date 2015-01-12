ApplicationKernel.namespace('Vaultier.dal.model');

var decryptedField = Vaultier.dal.mixin.EncryptedModel.decryptedField;

/**
 * @module vaultier-dal-model
 * @class Vaultier.dal.model.Node
 * @extends RL.Model
 */
Vaultier.dal.model.Node = RL.Model.extend(
    Vaultier.dal.mixin.CreatedUpdatedMixin,
    Vaultier.dal.mixin.EncryptedModel.Mixin,
    Vaultier.dal.mixin.PolymorphicModel.Mixin,
    {
        init: function () {
            this.set('workspacekey', Vaultier.__container__.lookup('service:workspacekey'));
            return this._super.apply(this, arguments);
        },

        /**
         * @DI service:workspacekey
         */
        workspacekey: null,

        polymorphicModelTypeField: 'type',
        polymorphicModelMapping: {
            100: 'Vaultier.dal.model.NodeFolderMixin',
            200: 'Vaultier.dal.model.NodeNoteMixin',
            300: 'Vaultier.dal.model.NodePasswordMixin',
            400: 'Vaultier.dal.model.NodeFileMixin'
        },

        types: new Utils.ConstantList({
            'FOLDER': {
                value: 100,
                text: 'folder'
            },
            'NOTE': {
                value: 200,
                text: 'note'
            },
            'PASSWORD': {
                value: 300,
                text: 'password'
            },
            'FILE': {
                value: 400,
                text: 'file'
            }
        }),

        name: RL.attr('string'),

        type: RL.attr('number'),
        data: RL.attr('object'),

        blob_meta: RL.attr('object'),

        enc_version: RL.attr('number'),
        created_by: RL.attr('object'),
        parent: RL.attr('number'),
        color: RL.attr('string'),

        perms: RL.attr('object'),
        membership: RL.attr('object', { readOnly: true }),

        /**
         * Managed by Service.WorkspaceKey, True when key cannot be decrypted
         */
        keyError: false,

        saveRecord: function () {
            var isNew = this.get('isNew');
            Utils.Logger.log.debug(this.get('workspacekey'));

            if (isNew) {
                //set enc_version when we create new node
                this.set('enc_version', 1);
            }

            //save
            var promise = this._super.apply(this, arguments);


            var node = this;
            Utils.Logger.log.debug(node);
            if (isNew && !this.get('parent')) {
                // after save, approve workspace
                promise = promise
                    .then(function () {
                        Utils.Logger.log.debug("promise = promise.then(function () {");
                        Utils.Logger.log.debug(this.get('workspacekey'));
                        return this.get('workspacekey').transferKeyToCreatedNode(node);
                    }.bind(this))
                    .then(function () {
                        return node.reloadRecord();
                    }.bind(this))
            }

            return promise;
        }


    });

Vaultier.dal.model.NodeFolderMixin = Ember.Mixin.create({

});

/**
 * @module vaultier-dal-model
 * @class Vaultier.dal.model.NodeNoteMixin
 */
Vaultier.dal.model.NodeNoteMixin = Ember.Mixin.create({
    note: decryptedField('data', 'note')
});

/**
 * @module vaultier-dal-model
 * @class Vaultier.dal.model.NodePasswordMixin
 */
Vaultier.dal.model.NodePasswordMixin = Ember.Mixin.create({
    password: decryptedField('data', 'password'),
    username: decryptedField('data', 'username'),
    url: decryptedField('data', 'url'),
    note: decryptedField('data', 'note')
});

/**
 * @module vaultier-dal-model
 * @class Vaultier.dal.model.NodeFileMixin
 */
Vaultier.dal.model.NodeFileMixin = Ember.Mixin.create({

    /**
     * blob_meta encrypted attrs
     */
    filename: decryptedField('blob_meta', 'filename'),
    filesize: decryptedField('blob_meta', 'filesize'),
    filetype: decryptedField('blob_meta', 'filetype'),

    /**
     * data encrypted attrs
     */
    password: decryptedField('data', 'password'),
    username: decryptedField('data', 'username'),
    url: decryptedField('data', 'url'),
    note: decryptedField('data', 'note'),

    blob: null,

    /**
     * @DI store:main
     */
    store: null,

    init: function () {
        this.set('store', Vaultier.__container__.lookup('store:main'))
        this.on('didLoad', this, this.emptyBlob)
        this.on('didReload', this, this.emptyBlob)
        this.emptyBlob();
    },

    isFile: function () {
        return this.get('type') == this.types['FILE'].value;
    }.property('type'),

    emptyBlob: function () {
        this.set('blob', new Vaultier.dal.model.NodeBlob({
            id: this.get('id')

        }));
        this.set('blob.membership', this.get('membership'));
        Utils.Logger.log.debug(this.get('blob'));
        Utils.Logger.log.debug(this.get('membership'));
    },


    loadBlob: function () {
        var blob = this.get('blob');
        if (!blob.get('isNew')) {
            return Ember.RSVP.resolve(blob)
        } else {
            Utils.Logger.log.debug("Tadada");
            return Utils.RSVPAjax({
                url: '/api/nodes/' + this.get('id') + '/data/',
                type: 'GET'
            }).then(function(nodeBlobData) {
                nodeBlobData.membership = this.get('membership');
                var nodeBlob = Vaultier.dal.model.NodeBlob.load(nodeBlobData);
                this.set('blob', nodeBlob);
                return nodeBlob;
            }.bind(this));
        }
    },

    saveRecord: function () {
        var blob = this.get('blob');
        Utils.Logger.log.debug(blob);
//        if (blob.get('_decrypted-data-blob_meta.data.filename')) {
//            this.set('filename', blob.get('_decrypted-data-blob_meta.data.filename'));
//        }
//        if (blob.get('_decrypted-data-blob_meta.data.filesize')) {
//            this.set('filesize', blob.get('_decrypted-data-blob_meta.data.filesize'));
//        }
//        if (blob.get('_decrypted-data-blob_meta.data.filetype')) {
//            this.set('filetype', blob.get('_decrypted-data-blob_meta.data.filetype'));
//        }
        Utils.Logger.log.debug(this.get('filename'));
        return this
            ._super.apply(this, arguments)
            .then(function () {
                blob.set('id', this.get('id'))
                return blob.saveRecord();
            }.bind(this))
            .then(this.emptyBlob.bind(this))
    }
});

/**
 * @module vaultier-dal-model
 * @class Vaultier.dal.model.NodeBlob
 * @extends RL.Model
 */
Vaultier.dal.model.NodeBlob = RL.Model.extend(
    Vaultier.dal.mixin.EncryptedModel.Mixin,
    {
        blob_meta: RL.attr('string'),
        blob_data: RL.attr('string'),

        filename: decryptedField('blob_meta', 'filename'),
        filesize: decryptedField('blob_meta', 'filesize'),
        filetype: decryptedField('blob_meta', 'filetype'),
        filedata: decryptedField('blob_data', 'filedata'),

        /**
         * @DI service:workspacekey
         */
        workspacekey: null,

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
                var params = {
                    url: '/api/nodes/' + this.get('id') + '/data/',
                    type: 'PUT',
                    data: this.serialize(),
                    processData: false,
                    contentType: false
                };
                return Utils.RSVPAjax(params)
            } else {
                return Ember.RSVP.resolve(this);
            }
        }
    }
);
