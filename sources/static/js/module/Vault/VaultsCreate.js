Vaultier.VaultsCreateRoute = Ember.Route.extend(
    Utils.ErrorAwareRouteMixin,
    {

        model: function (params, transition) {

            if (!this.checkPermissions(transition, function() {
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
                record.set('workspace', this.get('workspace').id)

                record.save().then(
                    function () {
                        $.notify('Your vault has been successfully created.', 'success');
                        this.transitionTo('Cards.index', workspace.id, record.id);
                    }.bind(this),
                    function () {
                        $.notify('Oooups! Something went wrong.', 'error');
                    }
                )
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

        },

        deactivate: function () {
            var record = this.get('controller.content');
            if (!record.get('id')) {
                var store = this.get('store');
                store.deleteRecord(record);
            }
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
