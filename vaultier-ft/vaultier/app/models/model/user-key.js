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

