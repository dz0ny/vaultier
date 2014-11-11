ApplicationKernel.namespace('Vaultier.dal.model');

/**
 * @module vaultier-dal-model
 * @class Vaultier.dal.model.Card
 * @extends RL.Model
 * @deprecated
 */
Vaultier.dal.model.Card = RL.Model.extend(
    Vaultier.dal.mixin.CreatedUpdatedMixin,
    Vaultier.dal.mixin.RollbackMixin,
    {
        name: RL.attr('string'),
        slug: RL.attr('string'),
        description: RL.attr('string'),
        vault: RL.attr('number'),
        perms: RL.attr('object'),

        objectType: function () {
            return Vaultier.dal.model.Role.proto().types['TO_CARD'].value;
        }.property()
    });
