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


Vaultier.User = DS.Model.extend(CreatedUpdatedMixin, {
    email: DS.attr('string'),
    nickname: DS.attr('string')
})

Vaultier.AuthenticatedUser = Vaultier.User.extend({
    public_key: DS.attr('string')
});

Vaultier.Workspace = DS.Model.extend(CreatedUpdatedMixin, {
    name: DS.attr('string'),
    vaults: DS.attr('number'),
    description: DS.attr('string'),
    created_by: DS.attr()
});

Vaultier.Vault = DS.Model.extend(CreatedUpdatedMixin, {
    name: DS.attr('string'),
    workspace: DS.attr('number'),
    description: DS.attr('string'),
    created_by: DS.attr()
});


Vaultier.Card = DS.Model.extend(CreatedUpdatedMixin, {
    name: DS.attr('string'),
    vault: DS.attr('number'),
    description: DS.attr('string'),
    created_by: DS.attr()
});

