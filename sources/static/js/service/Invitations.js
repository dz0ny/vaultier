Po.NS('Service');

Service.Invitations = Ember.Object.extend({

    SESSION_KEY : 'invitations',

    session: null,
    /**
     * @DI Service.Auth
     */
    auth: null,
    env: null,
    store: null,

    init: function () {
        this._super();
        this.session = Service.Session.current();
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
            to_workspace: Utils.E.recordId(params.to_workspace) ,
            to_vault: Utils.E.recordId(params.to_vault),
            to_card: Utils.E.recordId(params.to_card)
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

            var invitations = this.get('session').get(this.SESSION_KEY, {});
            invitations[id] = invitation;
            this.session.set(this.SESSION_KEY, invitations);

            resolve(invitation);
        }.bind(this));
    },

    hasInvitationsInSession: function() {
       var invitations = this.session.get(this.SESSION_KEY, null);
        return invitations !== null;
    },

    acceptInvitationsInSession: function () {
        var invitations = this.session.get(this.SESSION_KEY, {});

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

    clearInvitationsInSession: function() {
        this.session.set(this.SESSION_KEY, null);
    },


    _validateInvitation: function (id, hash) {
        return Ember.RSVP.resolve();
    },


    /**
     * List all roles related to invitation in session
     */
    listRolesInSession: function () {
        var invitations = this.session.get(this.SESSION_KEY, {});
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
                ).fail(reject)
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
                    return this.get('env.router').transitionTo('Invitation.accept')
                } else {
                    return this.get('env.router').transitionTo('Invitation.anonymous')
                }
            }.bind(this))
    }


})
;
Service.Invitations.reopenClass(Utils.Singleton);
