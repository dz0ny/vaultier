Vaultier.Workspace = DS.Model.extend(
    CreatedUpdatedMixin, {
        name: DS.attr('string'),
        vaults: DS.attr('number'),
        description: DS.attr('string'),
        perms: DS.attr()
    });

