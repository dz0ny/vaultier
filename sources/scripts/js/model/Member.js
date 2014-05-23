'use strict';

Vaultier.Member = RL.Model.extend(
    Vaultier.CreatedUpdatedMixin,
    {
        status: RL.attr('number'),
        email: RL.attr('string'),
        nickname: RL.attr('string'),
        user: RL.attr('object'),
        workspace: RL.attr('object'),

        statuses: new Utils.ConstantList({
            'INVITED': {
                value: 100,
                text: 'INVITED'
            },
            'MEMBER_WITHOUT_WORKSPACE_KEY': {
                value: 200,
                text: 'MEMBER_WITHOUT_WORKSPACE_KEY'
            },
            'MEMBER': {
                value: 300,
                text: 'MEMBER'
            }
        })

    });


