Vaultier.Card = DS.Model.extend(
    CreatedUpdatedMixin,
    NonInvalidState,
    {
        pk: DS.attr('number'),
        name: DS.attr('string'),
        slug: DS.attr('string'),
        description: DS.attr('string'),
        vault: DS.attr('number'),
        perms: DS.attr()
    });

