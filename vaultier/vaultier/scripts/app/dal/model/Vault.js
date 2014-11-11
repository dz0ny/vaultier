/**
 * @module model
 * @class Vaultier.Vault
 * @extends RL.Model
 */
Vaultier.Vault = RL.Model.extend(
    Vaultier.CreatedUpdatedMixin,
    Vaultier.RollbackMixin,
    {
        name: RL.attr('string'),
        color: RL.attr('string'),
        slug: RL.attr('string'),
        workspace: RL.attr('number'),
        description: RL.attr('string'),
        perms: RL.attr('object'),

        objectType: function () {
            return Vaultier.Role.proto().types['TO_VAULT'].value;
        }.property()

    });

