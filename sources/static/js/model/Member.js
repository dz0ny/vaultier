Vaultier.Member = DS.Model.extend(
    CreatedUpdatedMixin, {
        status: DS.attr('number'),
        email: DS.attr('string'),
        nickname: DS.attr('string'),
        user: DS.attr(),
        workspace: DS.attr(),

        statuses: new Utils.ConstantList({
            'INVITED': {
                value: 100,
                text: 'INVITED'
            },
            'NON_APPROVED_MEMBER': {
                value: 200,
                text: 'NON_APPROVED_MEMBER'
            },
            'MEMBER': {
                value: 300,
                text: 'MEMBER'
            }
        })

    });

