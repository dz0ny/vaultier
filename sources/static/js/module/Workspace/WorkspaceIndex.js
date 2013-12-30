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
            var slug = model.get('slug')
            if (!slug || slug=='') {
                slug = false
            }

            return {
                workspace: slug ? slug :  model.get('pk')
            }
        }

    });

Vaultier.WorkspaceIndexRoute = Ember.Route.extend({
    redirect: function () {
        this.transitionTo('Vaults.index')
    }
})
