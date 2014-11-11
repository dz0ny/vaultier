var decryptedField = Vaultier.EncryptedModel.decryptedField;

/**
 * @module model
 * @class Vaultier.Secret
 * @extends RL.Model
 */
Vaultier.Secret = RL.Model.extend(
    Vaultier.CreatedUpdatedMixin,
    Vaultier.EncryptedModel.Mixin,
    Vaultier.MutableModel.Mixin,
    {
        mutableModelTypeField: 'type',
        mutableModelMapping: {
            100: 'Vaultier.SecretNoteMixin',
            200: 'Vaultier.SecretPasswordMixin',
            300: 'Vaultier.SecretFileMixin'
        },

        types: new Utils.ConstantList({
            'NOTE': {
                value: 100,
                text: 'NOTE'
            },
            'PASSWORD': {
                value: 200,
                text: 'PASSWORD'
            },
            'FILE': {
                value: 300,
                text: 'FILE'
            }
        }),

        type: RL.attr('number'),
        data: RL.attr('string'),
        blob_meta: RL.attr('string'),
        card: RL.attr('number'),
        perms: RL.attr('object'),
        name: RL.attr('string')

    });

/**
 * @module model
 * @class Vaultier.SecretNoteMixin
 */
Vaultier.SecretNoteMixin = Ember.Mixin.create({
    note: decryptedField('data', 'note'),

    isNote: function () {
        return this.get('type') == this.types['NOTE'].value;
    }.property('type')

})

/**
 * @module model
 * @class Vaultier.SecretPasswordMixin
 */
Vaultier.SecretPasswordMixin = Ember.Mixin.create({
    password: decryptedField('data', 'password'),
    username: decryptedField('data', 'username'),
    url: decryptedField('data', 'url'),
    note: decryptedField('data', 'note'),

    isPassword: function () {
        return this.get('type') == this.types['PASSWORD'].value;
    }.property('type')
})

/**
 * @module model
 * @class Vaultier.SecretFileMixin
 */
Vaultier.SecretFileMixin = Ember.Mixin.create({
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
        this.set('blob', new Vaultier.SecretBlob({
            id: this.get('id')
        }));
    },


    loadBlob: function () {
        var blob = this.get('blob');
        if (!blob.get('isNew')) {
            return Ember.RSVP.resolve(blob)
        } else {
            var promise = this.get('store')
                .find('SecretBlob', this.get('id'))
                .then(function (blob) {
                    this.set('blob', blob);
                    return blob;
                }.bind(this));
            return promise;
        }
    },

    saveRecord: function () {
        var blob = this.get('blob');
        return this
            ._super.apply(this, arguments)
            .then(function () {
                blob.set('id', this.get('id'))
                return blob.saveRecord();
            }.bind(this))
            .then(this.emptyBlob.bind(this))
    }

})

/**
 * @module model
 * @class Vaultier.SecretBlob
 * @extends RL.Model
 */
Vaultier.SecretBlob = RL.Model.extend(
    Vaultier.EncryptedModel.Mixin,
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

        serialize: function () {
            data = this._super.apply(this, arguments)
            var formData = new FormData()
            formData.append('blob_data', new Blob([data['blob_data']], { type: 'application/octet-stream'}))
            formData.append('blob_meta', data['blob_meta']);
            return formData
        },

        saveRecord: function () {
            if (this.get('isDirty')) {
                var params = {
                    url: '/api/secret_blobs/' + this.get('id') + '/',
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
    });
