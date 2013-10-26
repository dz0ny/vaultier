Vaultier.Member = DS.Model.extend(
    CreatedUpdatedMixin, {
        status: DS.attr('string'),
        email: DS.attr('string'),
        nickname: DS.attr('string'),
        user: DS.attr(),
        workspace: DS.attr(),

        statuses: new Utils.ConstantList({
            'INVITED': {
                value: 'i',
                text: 'Invited user'
            },
            'NON_APPROVED_MEMBER': {
                value: 'a',
                text: 'Non approved member'
            },
            'MEMBER': {
                value: 'm',
                text: 'Member'
            }
        })

    });

