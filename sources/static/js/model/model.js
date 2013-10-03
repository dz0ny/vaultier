Vaultier.Vault = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    created_at: DS.attr('date'),
    updated_at: DS.attr('date'),
    updatedAgo: function () {
        var u = this.get('updated_at');
        return moment(u).fromNow();
    }.property('updatedAgo'),

    becameInvalid: function() {
        console.log('invalid');
    }


});

Vaultier.Vault.FIXTURES = [
    {
        id: 1,
        title: 'VAULT1',
        isCompleted: true
    },
    {
        id: 2,
        title: 'VAULT2',
        isCompleted: false
    },
    {
        id: 3,
        title: 'VAULT3',
        isCompleted: false
    }
];
