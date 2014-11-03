ApplicationKernel.namespace('Service');

Service.Invitations = Ember.Object.extend({

    SESSION_KEY: 'invitations',

    /**
     * @DI service:session
     */
    session: null,
    /**
     * @DI service:auth
     */
    auth: null,
    /**
     * @DI store:main
     */
    store: null,
    /**
     * @DI router:main
     */
    router: null,

    init: function () {
        this._super();
    },


    _memberPromise: function (workspace, emailOrId, send, resend) {
        var id = emailOrId.indexOf('@') < 0 ? parseInt(emailOrId) : null;

        if (id) {
            // do get - resend invitation
            return Utils.RSVPAjax({
                url: '/api/members/' + id + '/',
                type: 'get'
            });
        } else {
            // do post - invite - send invitation
            return Utils.RSVPAjax({
                url: '/api/members/',
                type: 'post',
                data: {
                    workspace: Utils.E.recordId(workspace),
                    email: emailOrId,
                    send: send,
                    resend: resend
                }
            });
        }


    },

    _invitePromise: function (member, role, params) {
        var data = {
            member: member.id,
            level: role,
            to_workspace: Utils.E.recordId(params.to_workspace),
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
                    return this._memberPromise(workspace, emailOrId, send, resend);
                }.bind(this))

            .then(
                function (member) {
                    return this._invitePromise(member, role, params);
                }.bind(this));
    },

    _storeInvitationToSession: function (id, hash, data) {
        return new Ember.RSVP.Promise(function (resolve, reject) {
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

    hasInvitationsInSession: function () {
        var invitations = this.session.get(this.SESSION_KEY, null);
        return invitations !== null;
    },

    acceptInvitationsInSession: function (invitations) {
        if (invitations) {
            invitations = Ember.RSVP.resolve(invitations);
        } else {
            invitations = this.fetchInvitationsInSession();
        }

        var promise = invitations
            .then(function (invitations) {
                var promises = [];
                invitations.forEach(function (invitation) {
                    invitation.set('status', 200);
                    promises.push(invitation.saveRecord());
                });
                return Ember.RSVP.all(promises);
            });
        return promise;
    },

    clearInvitationsInSession: function () {
        this.session.set(this.SESSION_KEY, null);
    },


    _validateInvitation: function (id, hash) {
        return Ember.RSVP.resolve();
    },


    /**
     * Fetches all invitations stored in session from server
     */
    fetchInvitationsInSession: function () {
        var invitations = this.session.get(this.SESSION_KEY, {});
        var promises = [];
        var store = this.get('store');

        for (i in invitations) {
            if (invitations.hasOwnProperty(i)) {
                promises.push(store.find('Invitation', invitations[i].hash));
            }
        }

        return Ember.RSVP.all(promises);
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
                    return this.get('router').transitionTo('Invitation.accept');
                } else {
                    return this.get('router').transitionTo('Invitation.anonymous');
                }
            }.bind(this));

    }


});
