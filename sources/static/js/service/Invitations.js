Po.NS('Service');

Service.Invitations = Ember.Object.extend({

    _memberPromise: function (workspace, email, send, resend) {
        return Ember.$.ajax({
            url: '/api/members/',
            type: 'post',
            data: {
                workspace: workspace.id,
                email: email,
                send: send,
                resend: resend
            }
        })
    },

    _invitePromise: function (member, role, params) {
        var data = {
            member: member.id,
            level: role,
            to_workspace: (params.to_workspace instanceof Vaultier.Workspace) ? params.to_workspace.get('id') : params.to_workspace,
            to_vault: (params.to_vault instanceof Vaultier.Workspace ) ? params.to_vault.get('id') : params.to_vault,
            to_card: (params.to_card instanceof Vaultier.Workspace ) ? params.to_card.get('id') : params.to_card
        };
        return  Ember.$.ajax({
            url: '/api/roles/',
            type: 'post',
            data: data
        });
    },


    invite: function (workspace, email, role, params, send, resend) {
        send = Po.F.optional(send, false);
        resend = Po.F.optional(resend, false);

        return Ember.RSVP.resolve()
            .then(
                function () {
                    return this._memberPromise(workspace, email, send, resend)
                }.bind(this))

            .then(
                function (member) {
                    return this._invitePromise(member, role, params);
                }.bind(this))
    }


})
;
Service.Invitations.reopenClass(Utils.Singleton);
