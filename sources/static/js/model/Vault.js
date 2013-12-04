Vaultier.Vault = DS.Model.extend(
    CreatedUpdatedMixin,
    NonInvalidState,
    {
        pk: DS.attr('number'),
        name: DS.attr('string'),
        slug: DS.attr('string'),
        workspace: DS.attr('number'),
        description: DS.attr('string'),
        perms: DS.attr()

    });

