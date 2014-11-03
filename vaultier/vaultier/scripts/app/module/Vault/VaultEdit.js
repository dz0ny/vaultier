Vaultier.VaultEditRoute = Ember.Route.extend(
    Vaultier.WorkspaceKeysMixin,
    {

        beforeModel: function() {
            this.checkWorkspaceKeys();
        },

        model: function (params, transition) {
            var vault = this.modelFor('Vault');

            if (!this.get('auth').checkPermissions(transition, function () {
                return vault.get('perms.update');
            }.bind(this), true)) {
                return;
            }

            return vault
        },

        setupController: function (ctrl, model) {
            this._super(ctrl, model);

            var environment = this.get('environment');
            environment.set('vault', model);
            // set breadcrumbs
            ctrl.set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router'), environment: environment})
                    .addHome()
                    .addWorkspace()
                    .addVault()
                    .addText('Edit vault')
            )
        },

        actions: {
            save: function () {
                var record = this.get('controller.content');
                var promise = record
                    .saveRecord()
                    .then(function () {
                        $.notify('Your changes has been saved successfully.', 'success');
                        history.go(-1);
                    }.bind(this))
                    .catch(function (error) {
                        $.notify('Ooops! Something went wrong.', 'error');
                        this.get('errors').logError(error)
                    }.bind(this))

                 ApplicationKernel.UI.showLoaderUponPromise(promise);
            }
        }

    });

Vaultier.VaultEditController = Ember.ObjectController.extend({
    breadcrumbs: null
});

Vaultier.VaultEditView = Ember.View.extend({
    templateName: 'Vault/VaultEdit',
    layoutName: 'Layout/LayoutStandard'
});
