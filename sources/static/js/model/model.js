var CreatedUpdatedMixin = Ember.Mixin.create({
    created_at: DS.attr('date'),
    updated_at: DS.attr('date'),

    updated_ago: function () {
        var u = this.get('updated_at');
        return moment(u).fromNow();
    }.property('updated_at'),

    created_ago: function () {
        var u = this.get('updated_at');
        return moment(u).fromNow();
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
    description: DS.attr('string'),
    created_by: DS.attr()
});

Vaultier.Vault = DS.Model.extend(CreatedUpdatedMixin, {
    name: DS.attr('string'),
    description: DS.attr('string'),
    created_by: DS.attr()
});

