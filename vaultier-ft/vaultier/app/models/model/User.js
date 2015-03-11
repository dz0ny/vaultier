ApplicationKernel.namespace('Vaultier.dal.model');

/**
 * @module vaultier-dal-model
 * @class Vaultier.dal.model.User
 * @extends RL.Model
 */
Vaultier.dal.model.User = RL.Model.extend(
    Vaultier.dal.mixin.CreatedUpdatedMixin,
    Vaultier.dal.mixin.RollbackMixin,
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

/**
 * @module model
 * @class Vaultier.dal.model.UserKey
 * @extends RL.Model
 */
Vaultier.dal.model.UserKey = RL.Model.extend({
        public_key: RL.attr('string'),
        membership: RL.attr('object')
    });

Vaultier.dal.model.UserKey.reopenClass({
    resourceDetailFormat: '{rootPath}/users/{id}/key/'
})

