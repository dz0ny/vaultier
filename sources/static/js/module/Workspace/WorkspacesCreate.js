Vaultier.WorkspacesCreateRoute = Ember.Route.extend({
    actions: {
        save: function () {
            var record = this.get('controller.content');
            var promise = record.saveRecord()
                .then(
                    function () {
                        $.notify('You workspace has been successfully created.', 'success');
                        this.modelFor('Workspaces').pushObject(record);
                        this.transitionTo('Workspace.index', record.get('slug'));

                    }.bind(this))

                .catch(function (error) {
                    $.notify('Oooups! Something went wrong.', 'error');
                    this.get('errors').logError(error);
                }.bind(this))

            return promise
        }
    },

    setupController: function (ctrl, model) {
        this._super(ctrl, model);

        // set breadcrumbs
        ctrl.set('breadcrumbs',
            Vaultier.Breadcrumbs.create({router: this.get('router')})
                .addHome()
                .addText('Create new workspace')
        )
    },

    model: function (params) {
        var store = this.get('store');
        var record = store.createRecord('Workspace');
        return record;
    }

});

Vaultier.WorkspacesCreateController = Ember.ObjectController.extend({
    breadcrumbs: null
});

Vaultier.WorkspacesCreateView = Ember.View.extend({
    templateName: 'Workspace/WorkspacesCreate',
    layoutName: 'Layout/LayoutStandard'
});
