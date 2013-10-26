Vaultier.Role = DS.Model.extend(
    CreatedUpdatedMixin,
    {
        level: DS.attr('string'),
        member: DS.attr(),
        to_workspace: DS.attr(),
        to_vault: DS.attr(),
        to_card: DS.attr(),

        roles: new Utils.ConstantList({
            'DENIED': {
                value: '0',
                text: 'Denied'
            },
            'READ': {
                value: 'r',
                text: 'Read'
            },
            'CREATE': {
                value: 'c',
                text: 'Create'
            },
            'WRITE': {
                value: 'w',
                text: 'Write'
            },
            'ADMIN': {
                value: 'a',
                text: 'Admin'
            }
        })

    });


