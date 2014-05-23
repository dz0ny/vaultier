Vaultier.Card = RL.Model.extend(
    Vaultier.CreatedUpdatedMixin,
    Vaultier.RollbackMixin,
    {
        name: RL.attr('string'),
        slug: RL.attr('string'),
        description: RL.attr('string'),
        vault: RL.attr('number'),
        perms: RL.attr('object')
    });
