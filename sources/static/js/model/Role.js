Vaultier.Role = DS.Model.extend(
    CreatedUpdatedMixin,
    {
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


