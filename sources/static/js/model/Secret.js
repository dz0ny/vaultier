Vaultier.Secret = RL.Model.extend(
    Vaultier.CreatedUpdatedMixin,
    Vaultier.RollbackMixin,
    {

        init: function () {
            this.set('workspacekey', Vaultier.__container__.lookup('service:workspacekey'))
            return this._super.apply(this, arguments);
        },

        /**
         * @DI service:workspacekey
         */
        workspacekey: null,


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
        /**
         * Holds information whether is blob marked to be saved
         */
        blobDirty: false,

        saveBlob: function () {
            return new Ember.RSVP.Promise(function (resolve) {
                console.log('saved')
                resolve();
            })
        },

        loadBlob: function () {
            if (blob) {
                return Ember.RSVP.resolve(this.get('blob'))
            } else {
                return new Ember.RSVP.Promise(function (resolve) {
                    console.log('loaded')
                    resolve();
                })
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

        encode: function () {
            var data;
            switch (this.get('type')) {

                case this.types['NOTE'].value:
                {
                    data = this.getProperties('note');
                    break;
                }
                case this.types['PASSWORD'].value:
                {
                    data = this.getProperties('password', 'url', 'note', 'username');
                    break;
                }
                case this.types['FILE'].value:
                {
                    data = this.getProperties('file', 'url', 'note', 'username');
                    break;
                }
                default:
                {
                    throw 'Unspecified secret type cannot be encoded';
                }

            }

            data = this.get('workspacekey').encryptWorkspaceData(data)
            this.set('data', data);

        },

        didLoad: function () {
            this.decode();
            return this._super();
        },

        didReload: function () {
            this.decode();
            return this._super();
        },

        saveRecord: function () {
            this.encode();
            return this._super.apply(this, arguments);
        }

    });

Vaultier.SecretFILEMixin = Ember.Mixin.create({
    isFile: function () {
        return this.get('type') == this.types['FILE'].value;
    }.property('type'),

    saveRecord: function () {
        this
            ._super.apply(this)

            .then(function () {
                return this.saveBlob()
            }.bind(this))

    }
})

Vaultier.SecretNOTEMixin = Ember.Mixin.create({
    note: null,

    isNote: function () {
        return this.get('type') == this.types['NOTE'].value;
    }.property('type')

})

Vaultier.SecretPASSWORDMixin = Ember.Mixin.create({
    password: null,
    username: null,
    url: null,
    note: null,

    isPassword: function () {
        return this.get('type') == this.types['PASSWORD'].value;
    }.property('type')

})


