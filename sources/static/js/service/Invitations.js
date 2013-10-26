Po.NS('Service');

Service.Invitations = Ember.Object.extend({

    _memberPromise: function (workspace, email, send, resend) {
        return Utils.RSVPAjax({
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
            //@todo: override this to some conversion function "model2id" - instanceof ds.model -> model.get(id)
            to_workspace: (params.to_workspace instanceof Vaultier.Workspace) ? params.to_workspace.get('id') : params.to_workspace,
            to_vault: (params.to_vault instanceof Vaultier.Workspace ) ? params.to_vault.get('id') : params.to_vault,
            to_card: (params.to_card instanceof Vaultier.Workspace ) ? params.to_card.get('id') : params.to_card
        };
        return  Utils.RSVPAjax({
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
    },

    useInvitation: function(transition, id, hash) {
        transition.abort();
        // store invitation
        // aborts transaction

        // if authenticatated executes acceptance of stored invitations
        // if authenticated redirects to accepted

        // if not authenticated, redirects to anonymous
        // if not authenticated - auth service executes acceptance of stored invitations

//        console.log(transition);
//        transition.router.replaceWith('Invitation.anonymous')

    }


})
;
Service.Invitations.reopenClass(Utils.Singleton);
