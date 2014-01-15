Vaultier.User = RL.Model.extend(
    CreatedUpdatedMixin,
    ExposeCleanAttributesMixin,
    {

        email: RL.attr('string'),
        nickname: RL.attr('string'),
        public_key: RL.attr('string')
    });

