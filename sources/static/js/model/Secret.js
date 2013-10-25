Vaultier.Secret = DS.Model.extend(
    CreatedUpdatedMixin, {
        types: {
            note: 1,
            password: 2,
            file: 3
        },

        name: DS.attr('string'),
        type: DS.attr('number'),
        data: DS.attr('string'),
        card: DS.attr('number'),
        created_by: DS.attr(),

        password: null,
        username: null,
        url: null,
        note: null,
        file: null,

        decode: function () {
            var data = this.get('data');
            var data = JSON.parse(data);
            this.setProperties(data);
        },

        encode: function () {
            var data;
            switch (this.get('type')) {

                case this.types.note:
                {
                    data = this.getProperties('note');
                    break;
                }
                case this.types.password:
                {
                    data = this.getProperties('password', 'url', 'note', 'username');
                    break;
                }
                case this.types.file:
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
            this.encode();
            return this._super(arguments);
        }

    });


