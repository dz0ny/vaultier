Vaultier.CardCreateRoute = Ember.Route.extend({

    workspace: null,

    actions: {
        save: function () {
            var workspace = this.get('workspace');
            var vault = this.get('vault');

            var record = this.get('controller.content');
            record.set('vault', vault.get('id'))

            record.save().then(
                function () {
                    $.notify('Your card has been successfully created.', 'success');
                    this.transitionTo('Secret.index', workspace.id, vault.id, record.id);
                }.bind(this),
                function () {
                    $.notify('Oooups! Something went wrong.', 'error');
                }
            )
        }
    },

    setupController: function (ctrl, model) {
        ctrl.set('content', model);

        // retrieve workspace
        var workspace = this.modelFor('Vault');
        this.set('workspace', workspace);
        ctrl.set('workspace', workspace);

        // retrieve vault
        var vault = this.modelFor('Card');
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


    },

    model: function (params, queryParams) {
        var store = this.get('store');
        var record = store.createRecord('Card');
        return record;
    },

    deactivate: function () {
        var record = this.get('controller.content');
        if (!record.get('id')) {
            var store = this.get('store');
            store.deleteRecord(record);
        }
    }
});

Vaultier.CardCreateController = Ember.ObjectController.extend({
    breadcrumbs: null,
    workspace: null,
    vault: null
});

Vaultier.CardCreateView = Ember.View.extend({
    templateName: 'Card/CardCreate',
    layoutName: 'Layout/LayoutStandard'
});