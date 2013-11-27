Vaultier.InvitationUseRoute = Ember.Route.extend(
    {

        /**
         * @DI service:invitations
         */
        invitations: null,

        model: function (params, transition) {
            transition.abort();
            return this.get('invitations').useInvitation(params.invitation, params.hash, params.data)
        }
    });


Vaultier.InvitationAcceptRoute = Ember.Route.extend(
    {

       /**
         * @DI service:invitations
         */
        invitations: null,

        model: function (params, transition) {
            var invitations = this.get('invitations');
            var promise = invitations.listRolesInSession();

            promise = promise.fail(function (error) {
                console.error(error.stack)
                transition.abort();
                invitations.clearInvitationsInSession()

                if (error && error.status == 400 && error.errors && error.errors.hash) {
                    this.get('errors').renderError({
                            title: 'Invalid invitation.',
                            message: 'this invitation cannot be used. It was already used by other member'
                        })
                } else {
                    throw new Error('Invalid invitation');
                }

            }.bind(this))

            return promise;
        },

        setupController: function (ctrl, model) {
            ctrl.set('content', model)
            ctrl.set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router')})
                    .addHome()
                    .addText('List of invitations to accept')
            );
        },

        actions: {
            acceptInvitations: function () {
                var invitations = this.get('invitations')
                invitations.acceptInvitationsInSession().
                    then(function () {
                        invitations.clearInvitationsInSession()
                        $.notify('You have accepted your invitations', 'success');
                        this.transitionTo('index')
                    }.bind(this))
            },

            rejectInvitations: function () {
                var invitations = this.get('invitations');
                invitations.clearInvitationsInSession();
                $.notify('You have rejected your pending invitations', 'warning');
                this.transitionTo('index')
            }
        }
    });

Vaultier.InvitationAnonymousRoute = Ember.Route.extend(
    {
    });


Vaultier.InvitationAcceptView = Ember.View.extend({
    templateName: 'Invitation/InvitationAccept',
    layoutName: 'Layout/LayoutStandard'
});

Vaultier.InvitationListView = Ember.View.extend({
    templateName: 'Invitation/InvitationList',
    layoutName: 'Layout/LayoutStandard'
});


Vaultier.InvitationAnonymousView = Ember.View.extend({
    templateName: 'Invitation/InvitationAnonymous',
    layoutName: 'Layout/LayoutStandard'
});
