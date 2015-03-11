ApplicationKernel.namespace('Vaultier.dal.model');

/**
 * @module vaultier-dal-model
 * @class Vaultier.dal.model.Invitation
 * @extends RL.Model
 */
Vaultier.dal.model.Invitation = RL.Model.extend(
    Vaultier.dal.mixin.CreatedUpdatedMixin,
    {
        invitation_email: RL.attr('string'),
        invitation_hash: RL.attr('string'),
        status: RL.attr('number'),
        roles: RL.hasMany('Vaultier.dal.model.InvitationRole')
    })

Vaultier.dal.model.Invitation.reopenClass({
    primaryKey: 'invitation_hash'
});

/**
 * @module model
 * @class Vaultier.dal.model.InvitationRole
 * @extends RL.Model
 */
Vaultier.dal.model.InvitationRole = RL.Model.extend(
    Vaultier.dal.mixin.CreatedUpdatedMixin,
    {
        to_name: RL.attr('string'),
        to_type: RL.attr('number'),

        name: function () {
            var Role = Vaultier.dal.model.Role.proto();
            var type = this.get('to_type');
            var to_name = this.get('to_name');
            if (type == Role.types['TO_WORKSPACE'].value) {
                return 'Invited to workspace "{to_name}"'.replace('{to_name}', to_name)
            }

            if (type == Role.types['TO_VAULT'].value) {
                return 'Invited to vault "{to_name}"'.replace('{to_name}', to_name)
            }


        }.property('to_name', 'to_type')


    })
