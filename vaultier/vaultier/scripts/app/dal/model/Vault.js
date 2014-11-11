ApplicationKernel.namespace('Vaultier.dal.model');

/**
 * @module vaultier-dal-model
 * @class Vaultier.dal.model.Vault
 * @extends RL.Model
 */
Vaultier.dal.model.Vault = RL.Model.extend(
    Vaultier.dal.mixin.CreatedUpdatedMixin,
    Vaultier.dal.mixin.RollbackMixin,
    {
        name: RL.attr('string'),
        color: RL.attr('string'),
        slug: RL.attr('string'),
        workspace: RL.attr('number'),
        description: RL.attr('string'),
        perms: RL.attr('object'),

        objectType: function () {
            return Vaultier.dal.model.Role.proto().types['TO_VAULT'].value;
        }.property()

    });

