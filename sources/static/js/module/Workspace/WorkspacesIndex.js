Vaultier.WorkspacesRoute = Ember.Route.extend(
    Utils.ErrorAwareRouteMixin,
    {

        beforeModel: function (transition) {
            // only authenticated user can access
            if (!this.get('auth.isAuthenticated')) {
                $.notify('You do not have access to secured area. Please login', 'error');
                transition.abort();
                this.transitionToLogin(transition);
                return;
            }

            // if any invitations store in session, user will be redirected
            if (Service.Invitations.current().hasInvitationsInSession()) {
                transition.abort();
                var url = transition.router.generate('Invitation.accept');
                this.router.replaceWith(url);
                return;
            }

        }

    });

Vaultier.WorkspacesIndexRoute = Ember.Route.extend(
    Utils.ErrorAwareRouteMixin,
    {
        model: function (params, transition) {
            var store = this.get('store');
            var promise = store.find('Workspace');
            promise.then(null, this.handleErrors(transition))
            return promise;
        },

        setupController: function (ctrl, model) {
            this._super(ctrl, model);

            ctrl.set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router')})
                    .addHome()
                    .addText('List of workspaces')
            );
        }

    });


Vaultier.WorkspacesIndexController = Ember.ArrayController.extend({
});

Vaultier.WorkspacesIndexView = Ember.View.extend({
    templateName: 'Workspace/WorkspacesIndex',
    layoutName: 'Layout/LayoutStandard'
});

Vaultier.WorkspacesIndexItemView = Ember.View.extend({
    templateName: 'Workspace/WorkspacesIndexItem'
});

Vaultier.WorkspacesIndexNotApprovedView = Ember.View.extend({
    templateName: 'Workspace/WorkspacesIndexNotApproved'
});
