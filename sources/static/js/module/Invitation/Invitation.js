Vaultier.InvitationUseRoute = Ember.Route.extend(
    {
        model: function (params, transition) {
            transition.abort();
            return Service.Invitations.current().useInvitation(params.invitation, params.hash, params.data)
        }
    });


Vaultier.InvitationAcceptRoute = Ember.Route.extend(
    {

        model: function (params, transition) {
            var invitations = Service.Invitations.current();
            var promise = invitations.listRolesInSession();

            promise.fail(function() {
                transition.abort();
                invitations.clearInvitationsInSession()
                $.notify('There are no pending invitations', 'warning');
                this.transitionTo('index')
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
                var invitations =  Service.Invitations.current()
                invitations.acceptInvitationsInSession().
                    then(function () {
                        invitations.clearInvitationsInSession()
                        $.notify('You have accepted your invitations', 'success');
                        this.transitionTo('index')
                    }.bind(this))
            },

            rejectInvitations: function () {
                var invitations = Service.Invitations.current();
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
