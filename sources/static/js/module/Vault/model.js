Vaultier.Vault = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    created_at: DS.attr('date'),
    updated_at: DS.attr('date'),
    updatedAgo: function () {
        var u = this.get('updated_at');
        return moment(u).fromNow();
    }.property('updatedAgo'),
});
