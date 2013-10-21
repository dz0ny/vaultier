var CreatedUpdatedMixin = Ember.Mixin.create({
    created_at: DS.attr('date'),
    updated_at: DS.attr('date'),

    updated_ago: function () {
        var u = this.get('updated_at');
        var t;
        try {
            t = moment(u).fromNow();
        } catch (e) {
            console.error(e.stack)
        }
        return t;
    }.property('updated_at'),

    created_ago: function () {
        var u = this.get('created_at');
        var t;
        try {
            t = moment(u).fromNow();
        } catch (e) {
            console.error(e.stack)
        }
        return t;
    }.property('created_at')
});


Vaultier.User = DS.Model.extend(
    CreatedUpdatedMixin, {
        email: DS.attr('string'),
        nickname: DS.attr('string')
    })

Vaultier.AuthenticatedUser = Vaultier.User.extend({
    public_key: DS.attr('string')
});

Vaultier.Workspace = DS.Model.extend(
    CreatedUpdatedMixin, {
        name: DS.attr('string'),
        vaults: DS.attr('number'),
        description: DS.attr('string'),
        created_by: DS.attr()
    });

Vaultier.Vault = DS.Model.extend(
    CreatedUpdatedMixin, {
        name: DS.attr('string'),
        workspace: DS.attr('number'),
        description: DS.attr('string'),
        created_by: DS.attr()
    });


Vaultier.Card = DS.Model.extend(
    CreatedUpdatedMixin, {
        name: DS.attr('string'),
        description: DS.attr('string'),
        vault: DS.attr('number'),
        created_by: DS.attr()
    });

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
            console.log('load');
        },

        didReload: function () {
            console.log('reload');
        },

        save: function () {
            this.encode();
            return this._super(arguments);
        }

    });


