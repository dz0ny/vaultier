Vaultier.WorkspaceCreateRoute = Ember.Route.extend({
    actions: {
        save: function () {
            var record = this.get('controller.content');
            record.save().then(function() {
                this.transitionTo('WorkspaceIndex');
            }.bind(this))
        }
    },

    model: function (params) {
        var record = this.get('store').createRecord('Workspace');
        return record;
    },

    deactivate: function () {
        var record = this.get('controller.content');
        if (!record.get('id')) {
            record.delete();
        }
    }
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
