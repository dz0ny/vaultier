Vaultier.Card = DS.Model.extend(
    CreatedUpdatedMixin,
    NonInvalidState,
    {
        name: DS.attr('string'),
        description: DS.attr('string'),
        vault: DS.attr('number'),
        perms: DS.attr()
    });

