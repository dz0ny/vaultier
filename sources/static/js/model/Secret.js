Vaultier.Secret = DS.Model.extend(
    CreatedUpdatedMixin, {

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
            var data = this.get('data');
            var data = JSON.parse(data);
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

            this.set('data', JSON.stringify(data));

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


