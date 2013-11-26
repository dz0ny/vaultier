Vaultier.Vault = DS.Model.extend(
    CreatedUpdatedMixin,
    NonInvalidState,
    {
        name: DS.attr('string'),
        workspace: DS.attr('number'),
        description: DS.attr('string'),
        perms: DS.attr()

    });

