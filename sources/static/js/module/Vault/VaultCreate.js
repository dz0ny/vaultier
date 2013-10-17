Vaultier.VaultCreateRoute = Ember.Route.extend({

    workspace: null,

    actions: {
        save: function () {
            var workspace = this.get('workspace');
            var record = this.get('controller.content');
            record.set('workspace', this.get('workspace').id)

            record.save().then(
                function () {
                    $.notify('Your vault has been successfully created.', 'success');
                    this.transitionTo('Card.index', workspace.id, record.id);
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
        var workspace = this.modelFor('Vault');
        this.set('workspace', workspace);
        this.get('controller').set('workspace', workspace);

//
//        ctrl.set('env', Vaultier.Services.Context.ContextService.current());
//        ctrl.set('breadcrumbs',
//            Vaultier.utils.Breadcrumbs.create({router: this.get('router')})
//                .addHome()
//                .addCurrentWorkspace()
//                .addLink('VaultCreate', 'Create new vault', { workspace: '_env'})
//        )
    },

    model: function (params, queryParams) {
        var store = this.get('store');
        var record = store.createRecord('Vault');
        return record;
    },

//    deactivate: function () {
//        var record = this.get('controller.content');
//        if (!record.get('id')) {
//            var store = this.get('store');
//            store.deleteRecord(record);
//        }
//    }
});

Vaultier.VaultCreateController = Ember.ObjectController.extend({
    workspace: null,
    breadcrumbs: null,
    env: null
});

Vaultier.VaultCreateView = Ember.View.extend({
    templateName: 'Vault/VaultCreate',
    layoutName: 'Layout/LayoutStandard'
});
