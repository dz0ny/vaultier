Vaultier.WorkspacesCreateRoute = Ember.Route.extend({
    actions: {
        save: function () {
            if (this.get('controller.content.isValid')) {
                var record = this.get('controller.content');
                var promise = record.save()
                    .then(function (record) {
                        $.notify('You workspace has been successfully created.', 'success');
                        this.transitionTo('Workspace.index', record);
                    }.bind(this))

                    .fail(function () {
                        $.notify('Oooups! Something went wrong.', 'error');
                    }
                )
            }

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
    },

    deactivate: function () {
        var record = this.get('controller.content');
        if (!record.get('id')) {
            var store = this.get('store');
            store.deleteRecord(record);
        }
    }
});

Vaultier.WorkspacesCreateController = Ember.ObjectController.extend({
    breadcrumbs: null
});

Vaultier.WorkspacesCreateView = Ember.View.extend({
    templateName: 'Workspace/WorkspacesCreate',
    layoutName: 'Layout/LayoutStandard'
});
