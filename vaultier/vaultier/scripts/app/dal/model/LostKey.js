ApplicationKernel.namespace('Vaultier.dal.model');

/**
 * @module vaultier-dal-model
 * @class Vaultier.dal.model.LostKey
 * @extends RL.Model
 */
Vaultier.dal.model.LostKey = RL.Model.extend(
    Vaultier.dal.mixin.CreatedUpdatedMixin,
    {
        email: RL.attr('string'),
        recover_type: RL.attr('integer'),
        hash: RL.attr('string'),
        public_key: RL.attr('key'),
        memberships: RL.hasMany('Vaultier.dal.model.LostKeyMemberships'),
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

/**
 * @module model
 * @class Vaultier.dal.model.LostKeyMemberships
 * @extends RL.Model
 */
Vaultier.dal.model.LostKeyMemberships = RL.Model.extend({
    document_name: RL.attr('string'),
    is_recoverable: RL.attr('boolean')
});
