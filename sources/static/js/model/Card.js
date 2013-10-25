
Vaultier.Card = DS.Model.extend(
    CreatedUpdatedMixin, {
        name: DS.attr('string'),
        description: DS.attr('string'),
        vault: DS.attr('number'),
        created_by: DS.attr()
    });

