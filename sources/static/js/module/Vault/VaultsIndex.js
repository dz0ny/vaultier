Vaultier.VaultsIndexRoute = Ember.Route.extend({

    workspace: null,

    model: function (params, queryParams) {
        var workspace = this.modelFor('Workspace');

        // retrieve vaults
        var store = this.get('store');
        return store.find('Vault', {workspace: workspace.get('pk')});
    },

    setupController: function (ctrl, vaults) {
        ctrl.set('content', vaults);

        // retrieve workspace
        var workspace = this.modelFor('Workspace');
        this.set('workspace', workspace);
        ctrl.set('workspace', workspace);

        // set breadcrumbs
        ctrl.set('breadcrumbs',
            Vaultier.Breadcrumbs.create({router: this.get('router')})
                .addHome()
                .addWorkspace()
        )
    },

    actions: {
        deleteWorkspace: function (workspace) {
            Vaultier.confirmModal(this, 'Are you sure?', function () {
                workspace.deleteRecord();

                workspace.save().then(
                    function () {
                        $.notify('Your workspace has been successfully deleted.', 'success');
                        this.transitionTo('index');
                    }.bind(this),
                    function (error) {
                        this.get('errors').logError(error);
                        workspace.rollback();
                        $.notify('Oooups! Something went wrong.', 'error');
                    }.bind(this)
                );
            }.bind(this));


        }

    }
});

Vaultier.VaultsIndexController = Ember.ArrayController.extend({
    breadcrumbs: null
});


Vaultier.VaultsIndexView = Ember.View.extend({
    templateName: 'Vault/VaultsIndex',
    layoutName: 'Layout/LayoutStandard'
});


Vaultier.VaultIndexItemView = Ember.View.extend({
    templateName: 'Vault/VaultsIndexItem'
});
