Vaultier.Vault = DS.Model.extend(
    CreatedUpdatedMixin, {
        name: DS.attr('string'),
        workspace: DS.attr('number'),
        description: DS.attr('string'),
    });

