Vaultier.Secret = RL.Model.extend(
    CreatedUpdatedMixin,
    {

        init: function() {
            this.set('members', Vaultier.__container__.lookup('service:members'))
            return this._super.apply(this, arguments);
        },

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


        name: RL.attr('string'),
        type: RL.attr('number'),
        data: RL.attr('string'),
        card: RL.attr('number'),
        perms: RL.attr('object'),

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
            return this._super();
        },

        didReload: function () {
            this.decode();
            return this._super();
        },

        save: function () {
            if (this.get('currentState.stateName') != 'root.deleted.uncommitted') {
                this.encode();
            }
            return this._super();
        }

    });


