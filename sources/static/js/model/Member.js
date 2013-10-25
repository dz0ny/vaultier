Vaultier.Member = DS.Model.extend(
    CreatedUpdatedMixin, {
        status: DS.attr('string'),
        email: DS.attr('string'),
        nickname: DS.attr('string'),
        user: DS.attr(),
        workspace: DS.attr(),
    });

