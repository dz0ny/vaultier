Vaultier.User = DS.Model.extend(
    CreatedUpdatedMixin,
    ExposeCleanAttributesMixin,
    NonInvalidState,
    {



        email: DS.attr('string'),
        nickname: DS.attr('string'),
        public_key: DS.attr('string')
    });

