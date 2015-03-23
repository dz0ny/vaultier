import Ember from 'ember';
import CreatedUpdatedMixin from '../mixin/created-updated-mixin';
import RollbackMixin from '../mixin/rollback-mixin';

/* global RL */

/**
 * @module vaultier-dal-model
 * @class Vaultier.dal.model.User
 * @extends RL.Model
 */
var User = RL.Model.extend(
  CreatedUpdatedMixin,
  RollbackMixin,
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

User.reopenClass({
  resourceName: 'user'
});

export default User;
