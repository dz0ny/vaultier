Vaultier.Workspace = DS.Model.extend(
    CreatedUpdatedMixin, {
        name: DS.attr('string'),
        vaults: DS.attr('number'),
        description: DS.attr('string'),
        created_by: DS.attr()
    });

