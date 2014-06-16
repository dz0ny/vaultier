'use strict';


Vaultier.LostKey = RL.Model.extend(
    Vaultier.CreatedUpdatedMixin,
    {
        email: RL.attr('string', {required: true}),
        recoverType: RL.attr('recoverType'), // enumeration - disable or recover
        hash: RL.attr('key'),
        public_key: RL.attr('key'),
        memberships: RL.hasMany('Vaultier.LostKeyMembership', {readOnly: true})
    });


Vaultier.LostKeyMembership = RL.Model.extend({
    workspaceName: RL.attr('string'),
    isRecoverable: RL.attr('boolean')
});
