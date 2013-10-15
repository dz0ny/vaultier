Vaultier.WorkspaceCreateRoute = Ember.Route.extend({
    actions: {
        save: function () {
            var record = this.get('controller.content');
            record.save().then(
                function () {
                    $.notify('You workspace has been successfully created.', 'success');
                    this.transitionTo('VaultIndex', record.get('id'));
                }.bind(this),
                function () {
                    $.notify('Oooups! Something went wrong.', 'error');
                }
            )
        }
    },

    model: function (params) {
        var store = this.get('store');
        var record = store.createRecord('Workspace');
        return record;
    },

});

Vaultier.WorkspaceCreateController = Ember.ObjectController.extend({
    breadcrumbs: Vaultier.utils.Breadcrumbs.create()
        .addLink('WorkspaceIndex', 'Workspaces')
        .addLink('WorkspaceCreate', 'Create'),

});

Vaultier.WorkspaceCreateView = Ember.View.extend({
    templateName: 'Workspace/Create',
    layoutName: 'Layout/LayoutStandard'
});
