Po.NS('Service');

Service.Invitations = Ember.Object.extend({

    session: null,
    auth: null,
    env: null,

    init: function () {
        this._super();
        this.session = Service.Session.current();
        this.auth = Service.Auth.current();
        this.env = Service.Environment.current()
    },


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

    decodeInvitationData: function (data) {
        return data
    },

    encodeInvitationData: function (data) {
        return data
    },

    _storeInvitationToSession: function (id, hash, data) {
        return Ember.RSVP.Promise(function (resolve, reject) {
            var invitation = {
                id: id,
                hash: hash,
                data: this.decodeInvitationData(data)
            };

            //todo: validate invitation here, on error reject with appropriet status error

            var invitations = this.get('session').get('invitations', {});
            invitations[id] = invitation;
            this.session.set('invitations', invitations);

            resolve(invitation);
        }.bind(this));
    },

    acceptInvitationsInSession: function () {
        var invitations = this.session.get('invitations', {});

        var promises = [];
        for (id in invitations) {
            var invitation = invitations[id];
            promises.push(Utils.RSVPAjax({
               url: '/api/member/'+id+'/accept/',
               type: 'post',
               data: {
                   hash: invitation.hash
               }
            }))
        }

        return Ember.RSVP.all(promises);

    },

    _validateInvitation: function(id, hash,data) {
        return Ember.RSVP.resolve();
    },

    /**
     *   Function encapsulates using of url invitation
     *
     *   transition has to be aborted before use
     *   Workflow provided
     *
     *   - store invitation to session
     *
     *   - if authenticatated executes acceptance of stored invitations
     *   - if authenticated redirects to accepted
     *
     *   - if not authenticated, redirects to anonymous
     *   - if not authenticated - auth service executes acceptance of stored invitations
     *
     * @param id
     * @param hash
     * @param data
     * @returns {*|then}
     */
    useInvitation: function (id, hash, data) {
        return Ember.RSVP.resolve()
            .then(function () {
                return this._validateInvitation(id, hash, data);
            }.bind(this))

            .then(function () {
                return this._storeInvitationToSession(id, hash, data);
            }.bind(this))

            .then(function () {
                if (this.get('auth').get('isAuthenticated')) {
                    return this.acceptInvitationsInSession()
                } else {
                    return this.get('env.router').transitionTo('Invitation.anonymous')
                }
            }.bind(this))
    }


})
;
Service.Invitations.reopenClass(Utils.Singleton);
