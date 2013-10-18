Vaultier.WorkspaceRoute = Ember.Route.extend(
    Utils.ErrorAwareRouteMixin,
    {

        beforeModel: function (transition) {
            if (!Vaultier.Services.Auth.AuthService.current().get('isAuthenticated')) {
                $.notify('You do not have access to secured area. Please login', 'error');
                transition.abort();
                this.transitionToLogin(transition);
            }
        }

    });


Vaultier.WorkspaceIndexRoute = Ember.Route.extend(
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


Vaultier.WorkspaceIndexController = Ember.ArrayController.extend({
    actions: {
        createWorkspace: function () {
            this.set('sortAscending', !this.get('sortAscending'));
        }
    }
});

Vaultier.WorkspaceIndexView = Ember.View.extend({
    templateName: 'Workspace/WorkspaceIndex',
    layoutName: 'Layout/LayoutStandard'
});

Vaultier.WorkspaceIndexItemView = Ember.View.extend({
    templateName: 'Workspace/WorkspaceIndexItem'
});
