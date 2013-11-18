Po.NS('Service');

Service.Invitations = Ember.Object.extend({

    session: null,
    auth: null,
    env: null,
    store: null,

    init: function () {
        this._super();
        this.session = Service.Session.current();
        this.auth = Service.Auth.current();
        this.env = Service.Environment.current()
        this.store = Vaultier.__container__.lookup('store:main');
    },


    _memberPromise: function (workspace, emailOrId, send, resend) {
        var id = parseInt(emailOrId)

        if (id) {
            // do get retrieve
            return Utils.RSVPAjax({
                url: '/api/members/' + id + '/',
                type: 'get'
            });
        } else {
            // do post - invite
            return Utils.RSVPAjax({
                url: '/api/members/',
                type: 'post',
                data: {
                    workspace: workspace.id,
                    email: emailOrId,
                    send: send,
                    resend: resend
                }
            })
        }


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


    invite: function (workspace, emailOrId, role, params, send, resend) {
        send = Po.F.optional(send, false);
        resend = Po.F.optional(resend, false);

        return Ember.RSVP.resolve()
            .then(
                function () {
                    return this._memberPromise(workspace, emailOrId, send, resend)
                }.bind(this))

            .then(
                function (member) {
                    return this._invitePromise(member, role, params);
                }.bind(this))
    },

    _storeInvitationToSession: function (id, hash, data) {
        return Ember.RSVP.Promise(function (resolve, reject) {
            var invitation = {
                id: id,
                hash: hash
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
                url: '/api/members/' + id + '/accept/',
                type: 'post',
                data: {
                    hash: invitation.hash
                }
            }))
        }

        return Ember.RSVP.all(promises);

    },

    _validateInvitation: function (id, hash) {
        return Ember.RSVP.resolve();
    },


    /**
     * List all roles related to invitation in session
     */
    listRolesInSession: function () {
        var invitations = this.session.get('invitations', {});
        var promises = []

        for (id in invitations) {
            promises.push(this.store.find('MemberRole', invitations[id]))
        }

        var promise = Ember.RSVP.Promise(function (resolve, reject) {

            if (promises.length) {
                result = [];
                Ember.RSVP.all(promises).then(
                    function (all) {
                        all.forEach(function (populatedDataStore) {
                            result = result.concat(populatedDataStore.toArray())
                        });
                        resolve(result)
                    }
                )
            } else {
                resolve([]);
            }

        });

        return promise
    },


    /**
     *   Function encapsulates using of url invitation
     *
     *   transition has to be aborted before use
     *
     *   Workflow provided
     *
     *   - store invitation to session
     *   - if authenticated redirects to list of invitations to accept
     *   - if not authenticated, redirects to page, where user is required to login before use of invitation
     *
     * @param id
     * @param hash
     * @returns {Ember.RSVP.Promise}
     */
    useInvitation: function (id, hash) {
        return Ember.RSVP.resolve()
            .then(function () {
                return this._validateInvitation(id, hash);
            }.bind(this))

            .then(function () {
                return this._storeInvitationToSession(id, hash);
            }.bind(this))

            .then(function () {
                if (this.get('auth').get('isAuthenticated')) {
                    return this.get('env.router').transitionTo('Invitation.list')
                } else {
                    return this.get('env.router').transitionTo('Invitation.anonymous')
                }
            }.bind(this))
    }


})
;
Service.Invitations.reopenClass(Utils.Singleton);
