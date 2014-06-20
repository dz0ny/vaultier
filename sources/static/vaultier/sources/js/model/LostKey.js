'use strict';


Vaultier.LostKey = RL.Model.extend(
    Vaultier.CreatedUpdatedMixin,
    {
        email: RL.attr('string'),
        recover_type: RL.attr('integer'),
        hash: RL.attr('string'),
        public_key: RL.attr('key'),
        memberships: RL.hasMany('Vaultier.LostKeyMemberships'),
        recoverType: new Utils.ConstantList({
            'REBUILD': {
                value: 1,
                text: 'REBUILD'
            },
            'DISABLE': {
                value: 2,
                text: 'DISABLE'
            }
        })
    });

Vaultier.LostKeyMemberships = RL.Model.extend({
    workspace_name: RL.attr('string'),
    is_recoverable: RL.attr('boolean')
});
