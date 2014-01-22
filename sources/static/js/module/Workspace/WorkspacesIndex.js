Vaultier.WorkspacesRoute = Ember.Route.extend(
    {

        beforeModel: function (transition) {


            // only authenticated user can access
            if (!this.get('auth').checkAuthenticatedOrLogin(transition)) {
                return false;
            }

            // if any invitations store in session, user will be redirected
            if (this.get('invitations').hasInvitationsInSession()) {
                transition.abort();
                var url = transition.router.generate('Invitation.accept');
                this.router.replaceWith(url);
                return;
            }
        }


    });

Vaultier.WorkspacesIndexRoute = Ember.Route.extend(
    {
        model: function (params, transition) {
            var store = this.get('store');
            var promise = store
                .find('Workspace')
                .then(function (workspaces) {
                    if (workspaces.get('length') == 1) {
                        var workspace = workspaces.objectAt(0);
                        this.transitionTo('Workspace.index', workspace.get('slug'));
                    } else {
                        this.transitionTo('Workspaces.select');
                    }
                }.bind(this))

            return promise
        }

    });


Vaultier.WorkspacesSelectRoute = Ember.Route.extend(
    {

        model: function () {
            var store = this.get('store');
            var promise = store.find('Workspace')
            return promise;
        },

        setupController: function (ctrl, model) {
            this._super(ctrl, model);

            ctrl.set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router')})
                    .addHome()
                    .addText('List of workspaces')
            );
        },

        renderTemplate: function () {
            this.render('WorkspacesIndex');
        }
    });


Vaultier.WorkspacesIndexView = Ember.View.extend({
    templateName: 'Workspace/WorkspacesIndex',
    layoutName: 'Layout/LayoutStandard'
});

Vaultier.WorkspacesIndexItemView = Ember.View.extend({
    templateName: 'Workspace/WorkspacesIndexItem'
});

Vaultier.WorkspacesIndexWithoutKeysView = Ember.View.extend({
    templateName: 'Workspace/WorkspacesIndexWithoutKeys'
});
