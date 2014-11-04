/**
 * @module model
 * @class Vaultier.User
 * @extends RL.Model
 */
Vaultier.User = RL.Model.extend(
    Vaultier.CreatedUpdatedMixin,
    Vaultier.RollbackMixin,
    {
        email: RL.attr('string'),
        nickname: RL.attr('string'),
        public_key: RL.attr('string'),

        saveRecord : function() {
            var email = this.get('email');
            if (email) {
                this.set('email', email.toLowerCase());
            }
            return this._super.apply(this, arguments);
        }

    });


/**
 * @module model
 * @class Vaultier.UserKey
 * @extends RL.Model
 */
Vaultier.UserKey = RL.Model.extend({
        public_key: RL.attr('string'),
        membership: RL.attr('object')
    });

Vaultier.UserKey.reopenClass({
    resourceDetailFormat: '{rootPath}/users/{id}/key/'
})

