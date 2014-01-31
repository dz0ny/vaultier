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
        /**
         * Used to store large encrypted data. eg. file data. descrypted only on request
         */
        card: RL.attr('number'),
        perms: RL.attr('object'),

        /**
         * Holds cached data from blob
         */
        blob: null,

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

        decode: function () {
            this.set('decoded', false);
            var workspacekey = this.get('workspacekey');

            var data = this.get('data');
            try {
                data = workspacekey.decryptWorkspaceData(data)
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

    filename: null,
    filesize: null,
    filetype: null,
    password: null,
    username: null,
    url: null,
    note: null,

    encode: function () {
        var data = this.getProperties('filesize', 'filename', 'filetype', 'url', 'note', 'username', 'password');
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


//            function JSONtoBase64(jsonObj) {
//        return Crypto.util.bytesToBase64(Crypto.charenc.UTF8.stringToBytes(Object.toJSON(jsonObj)));
//    };
//
//    function base64ToJSON(bytes) {
//        var jsonString = Crypto.charenc.UTF8.bytesToString(Crypto.util.base64ToBytes(bytes));
//        return jsonString.evalJSON();
//    };

        serialize: function (data) {
            var workspacekey = this.get('workspacekey');
            var plain = this.get('plain');
//            var encrypted = workspacekey.encryptWorkspaceData(plain);

            var words = CryptoJS.enc.Utf8.parse(plain);
            var encrypted = CryptoJS.enc.Base64.stringify(words);

            return {blob: {data: encrypted}}
        },

        deserialize: function (data) {
            var encrypted = data.blob.data
            var workspacekey = this.get('workspacekey');
            //var data = workspacekey.decryptWorkspaceData(encrypted);

            var words = CryptoJS.enc.Base64.parse(encrypted);
            var data = CryptoJS.enc.Utf8.stringify(words);

            var byteArray = []
            var hex = []
            for (var offset = 0; offset < data.length; offset++) {
                byteArray[offset] = data.charCodeAt(offset);
                hex[offset] = byteArray[offset].toString(16)
            }
            console.log(byteArray);
            console.log(hex);

            this.set('plainData', data);
            this.set('plainDirty', false);
            this.set('data', encrypted);

            return this
        },

        saveRecord: function () {
            if (this.get('plainDirty')) {
                // force saving
                this.set('isDirty', true);
                // call super saveRecord
                return this._super.apply(this)
            } else {
                return Ember.RSVP.resolve(this);
            }
        },

        decoded: false,

        data: RL.attr('string'),

        plainData: null,
        plainDirty: false,

        plain: function (key, value) {
            // setter
            if (arguments.length > 1) {
                this.set('plainData', value);
                this.set('plainDirty', true);
            }

            // getter
            return this.get('plainData');
        }.property('plainData', 'plainDirty')


    });
