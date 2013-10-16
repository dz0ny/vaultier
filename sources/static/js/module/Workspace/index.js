Vaultier.WorkspaceIndexRoute = Ember.Route.extend({
    model: function (params) {
        var store = this.get('store');
        var promise = store.find('Workspace');
        return promise;
    },

    setupController: function (ctrl, model) {
        this._super(ctrl, model);

        ctrl.set('breadcrumbs',
            Vaultier.utils.Breadcrumbs.create({router: this.get('router')})
                .addHome()
                .addLink('WorkspaceIndex', 'Workspaces')
        );
    }

});


Vaultier.WorkspaceIndexController = Ember.ArrayController.extend({
    actions: {
        createWorkspace: function () {
            this.set('sortAscending', !this.get('sortAscending'));
        }
    }
});

Vaultier.WorkspaceIndexView = Ember.View.extend({
    templateName: 'Workspace/Index',
    layoutName: 'Layout/LayoutStandard'
});

Vaultier.WorkspaceIndexItemView = Ember.View.extend({
    templateName: 'Workspace/IndexItem'
});
