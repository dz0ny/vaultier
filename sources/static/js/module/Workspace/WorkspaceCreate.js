Vaultier.WorkspaceCreateRoute = Ember.Route.extend({
    actions: {
        save: function () {
            var record = this.get('controller.content');
            record.save().then(
                function () {
                    $.notify('You workspace has been successfully created.', 'success');
                    this.transitionTo('Vault.index', record);
                }.bind(this),
                function () {
                    $.notify('Oooups! Something went wrong.', 'error');
                }
            )
        }
    },

    setupController: function (ctrl, model) {
        this._super(ctrl, model);

//        ctrl.set('breadcrumbs',
//            Vaultier.utils.Breadcrumbs.create({router: this.get('router')})
//                .addHome()
//                .addLink('WorkspaceIndex', 'Workspaces')
//                .addLink('WorkspaceCreate', 'Create')
//        )
    },

    model: function (params) {
        var store = this.get('store');
        var record = store.createRecord('Workspace');
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

Vaultier.WorkspaceCreateController = Ember.ObjectController.extend({
    breadcrumbs: null
});

Vaultier.WorkspaceCreateView = Ember.View.extend({
    templateName: 'Workspace/WorkspaceCreate',
    layoutName: 'Layout/LayoutStandard'
});
