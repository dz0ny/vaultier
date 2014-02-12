Vaultier.Secret = RL.Model.extend(
    Vaultier.CreatedUpdatedMixin,
    Vaultier.RollbackMixin,
    {

        init: function () {
            this.set('workspacekey', Vaultier.__container__.lookup('service:workspacekey'))
            this.set('store', Vaultier.__container__.lookup('store:main'))
            this.emptyBlob();

            return this._super.apply(this, arguments);

        },

        /**
         * @DI service:workspacekey
         */
        workspacekey: null,

        /**
         * @DI store:main
         */
        store: null,

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


        name: RL.attr('string'),
        type: RL.attr('number'),
        /**
         * Used to store encrypted data, small amount which is encrypted always
         */
        data: RL.attr('string'),
        card: RL.attr('number'),
        perms: RL.attr('object'),

        /**
         * Used to store large encrypted data. eg. file data. descrypted only on request
         */
        blob: null,

        blob_meta: RL.attr('string'),

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

        deferDecode: function () {
            var workspacekey = this.get('workspacekey');
            workspacekey.one('keyTransfered', function () {
                this.decode();
            }.bind(this))
        },

        doDecode: function () {
            var workspacekey = this.get('workspacekey');
            var data = this.get('data');
            data = workspacekey.decryptWorkspaceData(data)
            return data
        },

        decode: function () {
            this.set('decoded', false);
            var data;
            try {
                data = this.doDecode()
                this.set('decoded', true);
            } catch (e) {
                this.set('decoded', false);
                if (e instanceof Service.WorkspaceKeyDecryptSoftError) {
                    console.warn(e.stack);
                    this.deferDecode();
                } else {
                    console.error('Cannot decode');
                    console.error(e.stack);
                }
            }
            this.setProperties(data);
        },

        /**
         * Empty function - done by mixins
         */
        encode: Ember.K,


        applyMixinByType: function () {
            var type = this.get('type');
            var applied = this.get('applied')
            var clsName = 'Vaultier.Secret' + this.types.getKeyByValue(type) + 'Mixin';

            if (applied && applied != clsName) {
                throw new Error('Cannot apply mixin {mixin}, already applied {applied}'
                    .replace('{mixin}', clsName)
                    .replace('{applied}', appliedMixin)
                );
            }

            var cls = Ember.get(clsName);
            if (!cls)
                throw new Error('Cannot instantiate secret class mixin {mixin} for type {type}'
                    .replace('{type}', type)
                    .replace('{mixin}', clsName)
                );

            cls.apply(this);
            this.set('appliedMixin', clsName);

        }.observes('type'),

        didLoad: function () {
            this.decode();
            this.emptyBlob();
            return this._super();
        },

        didReload: function () {
            this.decode();
            this.emptyBlob();
            return this._super();
        },

        saveRecord: function () {
            var blob = this.get('blob');
            this.encode();
            return this
                ._super.apply(this, arguments)
                .then(function () {
                    blob.set('id', this.get('id'))
                    blob.saveRecord();
                }.bind(this))
                .then(this.emptyBlob.bind(this))
        }

    });

Vaultier.SecretFILEMixin = Ember.Mixin.create({
    isFile: function () {
        return this.get('type') == this.types['FILE'].value;
    }.property('type'),

    /**
     * blob_meta attrs
     */
    filename: null,
    filesize: null,
    filetype: null,

    /**
     * basic attrs
     */
    password: null,
    username: null,
    url: null,
    note: null,

    /**
     * Overriden doDecode to also decode blob meta
     * @param workspacekey
     * @returns {object} properties to set on object
     */
    doDecode: function () {
        var data = this._super.apply(this);
        var workspacekey = this.get('workspacekey');
        var blob_meta = this.get('blob_meta');
        if (blob_meta) {
            var blob_meta = workspacekey.decryptWorkspaceData(blob_meta);
            data.filename = blob_meta.filename;
            data.filesize = blob_meta.filesize;
            data.filetype = blob_meta.filetype;
        }
        return data
    },

    encode: function () {
        var data = this.getProperties('url', 'note', 'username', 'password');
        data = this.get('workspacekey').encryptWorkspaceData(data)
        this.set('data', data);
    }
})

Vaultier.SecretNOTEMixin = Ember.Mixin.create({
    note: null,

    encode: function () {
        var data = this.getProperties('note');
        data = this.get('workspacekey').encryptWorkspaceData(data)
        this.set('data', data);
    },

    isNote: function () {
        return this.get('type') == this.types['NOTE'].value;
    }.property('type')

})

Vaultier.SecretPASSWORDMixin = Ember.Mixin.create({
    password: null,
    username: null,
    url: null,
    note: null,

    encode: function () {
        var data = this.getProperties('password', 'url', 'note', 'username');
        data = this.get('workspacekey').encryptWorkspaceData(data)
        this.set('data', data);
    },

    isPassword: function () {
        return this.get('type') == this.types['PASSWORD'].value;
    }.property('type')
})

Vaultier.SecretBlob = RL.Model.extend(
    {

        init: function () {
            this.set('workspacekey', Vaultier.__container__.lookup('service:workspacekey'))
            this._super.apply(this, arguments);
        },

        /**
         * @DI service:workspacekey
         */
        workspacekey: null,

        serialize: function (data) {
            var workspacekey = this.get('workspacekey');
            var plainData = this.get('plainData');
            var plainMeta = this.get('plainMeta');
            var encryptedData = workspacekey.encryptWorkspaceData(plainData);
            var encryptedMeta = workspacekey.encryptWorkspaceData(plainMeta);

            var formData = new FormData()
            formData.append('blob_data', new Blob([encryptedData], { type: 'application/octet-stream'}))
            formData.append('blob_meta', encryptedMeta);

//            testing
//            var words = CryptoJS.enc.Utf8.parse(plain);
//            var encrypted = CryptoJS.enc.Base64.stringify(words);

            return formData
        },

        deserialize: function (data) {
            // put, patch and post returns no data
            // so serialization is skipped
            if (data.blob_data && data.blob_meta) {

                var encryptedData = data.blob_data
                var encryptedMeta = data.blob_meta
                var workspacekey = this.get('workspacekey');
                var plainData = workspacekey.decryptWorkspaceData(encryptedData);
                var plainMeta = workspacekey.decryptWorkspaceData(encryptedMeta);

                if (!plainMeta) {
                    plainMeta = {}
                }
//            testing
//            var words = CryptoJS.enc.Base64.parse(encrypted);
//            var data = CryptoJS.enc.Utf8.stringify(words);


                this.set('plainData', plainData);
                this.set('plainMeta', plainMeta)
                this.set('blob_data', encryptedData);
                this.set('blob_meta', encryptedMeta);
            }

            return this
        },

        saveRecord: function () {
            if (this.get('_plainDirty')) {
                // force saving
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
        },

        blob_data: RL.attr('string'),
        blob_meta: RL.attr('object'),

        _plainDirty: false,
        _plainData: null,
        _plainMeta: {},

        plainDirty: function () {
            return this.get('_plainDirty');
        }.property('_plainDirty'),

        plainData: function (key, value) {
            if (arguments.length > 1) {
                this.set('_plainData', value);
                this.set('_plainDirty', true);
            }
            return this.get('_plainData');
        }.property('_plainData'),

        plainMeta: function (key, value) {
            if (arguments.length > 1) {
                this.set('_plainMeta', value);
                this.set('_plainDirty', true);
            }
            return this.get('_plainMeta');
        }.property('_plainMeta')


    });
