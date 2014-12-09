Vaultier.WorkspacesCreateRoute = Ember.Route.extend({
    actions: {
        save: function () {
            var record = this.get('controller.content');
            var promise = record.saveRecord()
                .then(
                function () {
                    $.notify('You workspace has been created successfully.', 'success');
                    this.transitionTo('Workspace.index', record.get('slug'));
                }.bind(this))

                .catch(function (error) {
                    $.notify('Ooops! Something went wrong.', 'error');
                    this.get('errors').logError(error);
                }.bind(this));

            ApplicationKernel.UI.showLoaderUponPromise(promise);

            return promise;
        }
    },

    setupController: function (ctrl, model) {
        this._super(ctrl, model);

        // set breadcrumbs
        ctrl.set('breadcrumbs',
            Vaultier.Toolbar.create({router: this.get('router'), environment: this.get('environment')})
                .addHome()
                .addText('Create new workspace')
        );
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
