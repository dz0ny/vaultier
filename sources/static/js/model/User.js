Vaultier.User = RL.Model.extend(
    Vaultier.CreatedUpdatedMixin,
    Vaultier.RollbackMixin,
    {
        email: RL.attr('string'),
        nickname: RL.attr('string'),
        public_key: RL.attr('string')
    });



Vaultier.UserKey = RL.Model.extend({
        public_key: RL.attr('string'),
        membership: RL.attr('object')
    });

Vaultier.UserKey.reopenClass({
    resourceDetailFormat: '{rootPath}/users/{id}/key/'
})

