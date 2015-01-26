Vaultier.InvitationUseRoute = Ember.Route.extend(
    {

        /**
         * @DI service:invitations
         */
        invitations: null,

        model: function (params, transition) {
            transition.abort();
            return this.get('invitations').useInvitation(params.invitation, params.hash, params.data);
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
            var promise = invitations
                .fetchInvitationsInSession()
                .catch(function (error) {
                    transition.abort();
                    invitations.clearInvitationsInSession();

                    if (
                        (error && error.status == 400 && error.errors && error.errors.hash) // already accepted
                        || (error && error.status == 404) // not found
                        ) {
                        this.get('errors').consoleError(error)
                        this.get('errors').renderError({
                            title: 'Invalid invitation.',
                            message: 'this invitation cannot be used. Either it does not exist or it has been used by another member'
                        });
                    } else {
                        throw new Error('Invalid invitation');
                    }

                }.bind(this));

            return promise;
        },

        setupController: function (ctrl, model) {
            ctrl.set('content', model);
            var environment = this.get('environment');
            ctrl.set('breadcrumbs',
                Vaultier.Toolbar.create({router: this.get('router'), environment: environment})
                    .addHome()
                    .addText('List of invitations to accept')
            );
        },

        actions: {
            acceptInvitations: function () {
                var invitations = this.get('controller.content');
                var service = this.get('invitations');
                var promise = service.acceptInvitationsInSession(invitations).
                    then(function () {
                        service.clearInvitationsInSession();
                        $.notify('You have accepted your invitations', 'success');
                        this.transitionTo('index')
                    }.bind(this));

                ApplicationKernel.UI.showLoaderUponPromise(promise);
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
        setupController: function (ctrl, model) {
            ctrl.set('content', model);
            var environment = this.get('environment');
            ctrl.set('breadcrumbs',
                Vaultier.Toolbar.create({router: this.get('router'), environment: environment})
                    .addHome()
                    .addText('Accept invitation')
            );
        }
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
