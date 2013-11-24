Vaultier.WorkspaceRoute = Ember.Route.extend(
    Utils.ErrorAwareRouteMixin,
    {

        /**
         * @DI Service.Members
         */
        member: null,

        model: function (params, transition) {
            var promise = this.get('store').find('Workspace', params.workspace);

            // handle errors
            promise.then(null, this.handleErrors(transition))

            // select working workspace
            promise.then(function (workspace) {
                this.get('members').selectWorkspace(workspace)
            }.bind(this));

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
    redirect: function () {
        this.transitionTo('Vaults.index')
    }
})
