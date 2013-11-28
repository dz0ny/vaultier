Vaultier.VaultEditRoute = Ember.Route.extend(
    {
        model: function (params, transition) {
            var vault = this.modelFor('Vault');

            if (!this.get('auth').checkPermissions(transition, function () {
                return vault.get('perms.update')
            }.bind(this), true)) {
                return;
            }

            return vault
        },

        setupController: function (ctrl, model) {
            this._super(ctrl, model);

            // set breadcrumbs
            ctrl.set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router')})
                    .addHome()
                    .addWorkspace()
                    .addVault()
                    .addText('Edit vault')
            )
        },

        actions: {
            save: function () {
                if (this.get('controller.content.isValid')) {
                    var record = this.get('controller.content');
                    record.save().then(
                        function () {
                            $.notify('Your changes has been successfully saved.', 'success');
                            history.go(-1);
                        }.bind(this),
                        function () {
                            $.notify('Oooups! Something went wrong.', 'error');
                        }
                    )
                }
            }
        },
    });

Vaultier.VaultEditController = Ember.ObjectController.extend({
    breadcrumbs: null
});

Vaultier.VaultEditView = Ember.View.extend({
    templateName: 'Vault/VaultEdit',
    layoutName: 'Layout/LayoutStandard'
});
