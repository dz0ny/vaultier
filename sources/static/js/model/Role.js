Vaultier.Role = DS.Model.extend(
    CreatedUpdatedMixin,
    {
        level: DS.attr('string'),
        member: DS.attr(),
        to_workspace: DS.attr(),
        to_vault: DS.attr(),
        to_card: DS.attr(),

        roles: [
            {
                value: '0',
                text: 'Denied'
            },
            {
                value: 'r',
                text: 'Read'
            },
            {
                value: 'c',
                text: 'Create'
            },
            {
                value: 'w',
                text: 'Write'
            },

            {
                value: 'a',
                text: 'Admin'
            }
        ]
    });


