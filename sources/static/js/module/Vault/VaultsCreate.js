Vaultier.VaultsCreateRoute = Ember.Route.extend(
    {

        model: function (params, transition) {

            if (!this.get('auth').checkPermissions(transition, function () {
                return this.modelFor('Workspace').get('perms.create')
            }.bind(this), true)) {
                return;
            }

            store = this.get('store');
            var record = store.createRecord('Vault');
            return record;
        },

        actions: {
            save: function () {
                var workspace = this.get('workspace');
                var record = this.get('controller.content');
                record.set('workspace', this.get('workspace.id'))

                var promise = record
                    .saveRecord()
                    .then(function () {
                        $.notify('Your vault has been successfully created.', 'success');
                        this.transitionTo('Vault.index', record);
                    }.bind(this))
                    .catch(function (error) {
                        $.notify('Oooups! Something went wrong.', 'error');
                        this.get('errors').logError(error);
                    }.bind(this))

                 ApplicationLoader.promise(promise);
            }
        },

        setupController: function (ctrl, model) {
            this._super(ctrl, model);

            // retrieve workspace
            var workspace = this.modelFor('Workspace');
            this.set('workspace', workspace);
            this.get('controller').set('workspace', workspace);

            // set breadcrumbs
            ctrl.set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router')})
                    .addHome()
                    .addWorkspace()
                    .addText('Create new vault')
            )

        }
    });

Vaultier.VaultsCreateController = Ember.ObjectController.extend({
    workspace: null,
    breadcrumbs: null,
    env: null
});

Vaultier.VaultsCreateView = Ember.View.extend({
    templateName: 'Vault/VaultsCreate',
    layoutName: 'Layout/LayoutStandard'
});
