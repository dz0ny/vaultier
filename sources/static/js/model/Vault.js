Vaultier.Vault = RL.Model.extend(
    CreatedUpdatedMixin,
    {
        name: RL.attr('string'),
        slug: RL.attr('string'),
        workspace: RL.attr('number'),
        description: RL.attr('string'),
        perms: RL.attr('object')

    });

