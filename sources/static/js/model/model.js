Vaultier.Vault = DS.Model.extend({
    title: DS.attr('string'),
    isCompleted: DS.attr('boolean')
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
