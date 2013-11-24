Vaultier.Secret = DS.Model.extend(
    CreatedUpdatedMixin, {

        /**
         * @DI Service.Members
         */
        members: null,


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


        name: DS.attr('string'),
        type: DS.attr('number'),
        data: DS.attr('string'),
        card: DS.attr('number'),
        perms: DS.attr(),

        password: null,
        username: null,
        url: null,
        note: null,
        file: null,

        isNote: function () {
            return this.get('type') == this.types['NOTE'].value;
        }.property('type'),

        isPassword: function () {
            return this.get('type') == this.types['PASSWORD'].value;
        }.property('type'),

        isFile: function () {
            return this.get('type') == this.types['FILE'].value;
        }.property('type'),

        decode: function () {
            var members = this.get('members');

            var data = this.get('data');
            try {
                data = members.decryptWorkspaceData(data)
            } catch (e) {
                console.error('Cannot decrypt data')
                console.error(e.stack);
            }
            this.setProperties(data);
        },

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

            data = this.get('members').encryptWorkspaceData(data)
            this.set('data', data);

        },

        didLoad: function () {
            this.decode();
            return this._super(arguments);
        },

        didReload: function () {
            this.decode();
            return this._super(arguments);
        },

        save: function () {
            if (this.get('currentState.stateName') != 'root.deleted.uncommitted') {
                this.encode();
            }
            return this._super(arguments);
        }

    });


