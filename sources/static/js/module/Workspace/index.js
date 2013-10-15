Vaultier.WorkspaceIndexRoute = Ember.Route.extend({
    actions: {
        create: function () {
            var record = this.get('store').createRecord('Workspace');
            var controller = this.controllerFor('WorkspaceCreate');

            controller.openModal({
                record: record,
                route: this
            })
        }
    },

    renderTemplate: function (controller, model) {
        this._super(controller, model);
        this.render('WorkspaceIndex');
    },

    setupController: function (controller, model, queryParams) {
        var c = controller;
        console.log(controller.constructor);
        c.set('tstval', 'RCL');

        Ember.run.later(this, function () {
            console.log('set');
            c.set('tstval', 'RCL3');
        }, 2000)

        Ember.run.later(this, function () {
//            this.transitionTo('WorkspaceList.new');
        }, 4000)


        //   queryParams.sort = queryParams.sort || 'recent';
        //   controller.set('sortProperties', [queryParams.sort]);

        return this._super(controller, model);
    },
    model: function () {
        var store = this.get('store');
        var promise = store.find('Workspace');
        return promise;
//        return this._super(promise);
    }
});


Vaultier.WorkspaceIndexController = Ember.ArrayController.extend({
    breadcrumbs: Vaultier.utils.Breadcrumbs.create()
        .addLink('WorkspaceIndex', 'Workspaces'),

    sortProperties: ['name'],
    sortAscending: true,
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
