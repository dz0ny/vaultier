Vaultier.CardsCreateRoute = Ember.Route.extend(
    Vaultier.WorkspaceKeysMixin,
    {
        beforeModel: function () {
            this.checkWorkspaceKeys();
        },

        model: function (params, transition) {
            // check permissions
            if (!this.get('auth').checkPermissions(transition, function () {
                return this.modelFor('Vault').get('perms.create')
            }.bind(this), true)) {
                return;
            }

            var store = this.get('store');
            var record = store.createRecord('Card');
            console.log(record, "Record");
            return record;
        },

        actions: {
            save: function () {
                var workspace = this.get('workspace');
                var vault = this.get('vault');

                var record = this.get('controller.content');
                record.set('vault', vault.get('id'))

                var promise = record
                    .saveRecord()
                    .then(
                    function () {
                        $.notify('Your card has been successfully created.', 'success');
                        this.transitionTo('Card.index', record);
                    }.bind(this),
                    function () {
                        $.notify('Oooups! Something went wrong.', 'error');
                    }
                )

                ApplicationLoader.promise(promise)
            }
        },

        setupController: function (ctrl, model) {
            ctrl.set('content', model);

            // retrieve workspace
            var workspace = this.modelFor('Workspace');
            this.set('workspace', workspace);
            ctrl.set('workspace', workspace);

            // retrieve vault
            var vault = this.modelFor('Vault');
            this.set('vault', vault);
            ctrl.set('vault', vault);

            // set breadcrumbs
            ctrl.set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router')})
                    .addHome()
                    .addWorkspace()
                    .addVault()
                    .addText('Create new card')
            )


        }

    });

Vaultier.CardsCreateController = Ember.ObjectController.extend({
    breadcrumbs: null,
    workspace: null,
    vault: null
});

Vaultier.CardsCreateView = Ember.View.extend({
    templateName: 'Card/CardsCreate',
    layoutName: 'Layout/LayoutStandard'
});