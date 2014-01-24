Vaultier.WorkspaceRoute = Ember.Route.extend(
    {

        /**
         * @DI service:workspacekey
         */
        workspacekey: null,

        model: function (params, transition) {
            var promise = this.get('store').find('Workspace', params.workspace)

            return promise;
        },

        afterModel: function (workspace, transition) {
            // select working workspace
            this.get('workspacekey').selectWorkspace(workspace)

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
                workspace: model.get('slug')
            }
        },

        actions: {
            deleteWorkspace: function (workspace) {
                Vaultier.confirmModal(this, 'Are you sure?', function () {
                    var promise = workspace
                        .deleteRecord()
                        .then(
                            function () {
                                $.notify('Your workspace has been successfully deleted.', 'success');
                                this.transitionTo('Workspaces.select');
                            }.bind(this))
                        .catch(function (error) {
                            $.notify('Oooups! Something went wrong.', 'error');
                            throw error
                        }.bind(this))
                    
                    ApplicationLoader.promise(promise);

                }.bind(this));
            }
        }
    });

Vaultier.WorkspaceIndexRoute = Ember.Route.extend({
    beforeModel: function () {
        this.transitionTo('Vaults.index')
    }
})
