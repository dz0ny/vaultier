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

