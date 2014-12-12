Vaultier.User = RL.Model.extend(
    Vaultier.CreatedUpdatedMixin,
    Vaultier.RollbackMixin,
    {
        email: RL.attr('string'),
        nickname: RL.attr('string'),
        public_key: RL.attr('string'),
        invitation_hash: RL.attr('string'),

        saveRecord: function (invitation) {
            var email = this.get('email');
            if (email) {
                this.set('email', email.toLowerCase());
            }
            if (invitation) {
                this.set('invitation_hash', invitation.get('invitation_hash'));
            }
            return this._super.apply(this, arguments);
        }

    });


Vaultier.UserKey = RL.Model.extend({
        public_key: RL.attr('string'),
        membership: RL.attr('object')
    });

Vaultier.UserKey.reopenClass({
    resourceDetailFormat: '{rootPath}/users/{id}/key/'
})

