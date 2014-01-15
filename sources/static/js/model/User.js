Vaultier.User = RL.Model.extend(
    Vaultier.CreatedUpdatedMixin,
    Vaultier.RollbackMixin,
    {

        email: RL.attr('string'),
        nickname: RL.attr('string'),
        public_key: RL.attr('string')
    });

