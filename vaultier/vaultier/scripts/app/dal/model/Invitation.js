/**
 * @module model
 * @class Vaultier.Invitation
 * @extends RL.Model
 */
Vaultier.Invitation = RL.Model.extend(
    Vaultier.CreatedUpdatedMixin,
    {
        invitation_email: RL.attr('string'),
        invitation_hash: RL.attr('string'),
        status: RL.attr('number'),
        roles: RL.hasMany('Vaultier.InvitationRole')
    })

Vaultier.Invitation.reopenClass({
    primaryKey: 'invitation_hash'
});

/**
 * @module model
 * @class Vaultier.InvitationRole
 * @extends RL.Model
 */
Vaultier.InvitationRole = RL.Model.extend(
    Vaultier.CreatedUpdatedMixin,
    {
        to_name: RL.attr('string'),
        to_type: RL.attr('number'),

        name: function () {
            var Role = Vaultier.Role.proto();
            var type = this.get('to_type');
            var to_name = this.get('to_name');
            if (type == Role.types['TO_WORKSPACE'].value) {
                return 'Invited to workspace "{to_name}"'.replace('{to_name}', to_name)
            }

            if (type == Role.types['TO_VAULT'].value) {
                return 'Invited to vault "{to_name}"'.replace('{to_name}', to_name)
            }

            if (type == Role.types['TO_CARD'].value) {
                return 'Invited to card "{to_name}"'.replace('{to_name}', to_name)
            }

        }.property('to_name', 'to_type')


    })
