Vaultier.WorkspaceRoute = Ember.Route.extend(
    {

        /**
         * @DI Service.Members
         */
        member: null,

        model: function (params, transition) {
            var promise = this.get('store').find('Workspace', params.workspace);
            return promise;
        },

        afterModel: function (workspace, transition) {
            // select working workspace
            this.get('members').selectWorkspace(workspace)

            // set environments
            // @deprecated
            Service.Environment.current().set('workspace', workspace);
        },

        deactivate: function () {
            Service.Environment.current().set('workspace', null);
        },

        serialize: function (model) {
            // primitives
            if (typeof model == 'string' || typeof model == 'number') {
                return model
            }

            return {
                workspace: model.get('id')
            }
        }

    });

Vaultier.WorkspaceIndexRoute = Ember.Route.extend({
    beforeModel: function () {
        this.transitionTo('Vaults.index')
    }
})
