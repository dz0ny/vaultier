Vaultier.WorkspaceRoute = Ember.Route.extend(
    Utils.ErrorAwareRouteMixin,
    {

        model: function (params, transition) {
            var promise = this.get('store').find('Workspace', params.workspace);
            promise.then(null, this.handleErrors(transition))

            return promise;
        },

        afterModel: function (workspace) {
            Service.Environment.current().set('workspace', workspace);
        },

        deactivate: function () {
            Service.Environment.current().set('workspace', null);
        },

        serialize: function (model) {
            return {
                workspace: model.get('id')
            }
        }

    });

Vaultier.WorkspaceIndexRoute = Ember.Route.extend({
    redirect: function() {
        this.transitionTo('Vaults.index')
    }
})
