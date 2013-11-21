Vaultier.WorkspaceEditRoute = Ember.Route.extend(
    Utils.ErrorAwareRouteMixin,
    {
        model: function (params, transition) {
            var store = this.get('store');
            var promise = store.find('Workspace', params.workspace);
            promise.then(null, this.handleErrors(transition))
            return promise;
        },

        setupController: function (ctrl, model) {
            this._super(ctrl, model);

            // set breadcrumbs
            ctrl.set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router')})
                    .addHome()
                    .addWorkspace()
                    .addText('Edit workspace')
            )
        },

        actions: {
            save: function () {
                var record = this.get('controller.content');
                record.save().then(
                    function () {
                        $.notify('Your changes has been successfully saved.', 'success');
                        history.go(-1);
                    }.bind(this),
                    function () {
                        $.notify('Oooups! Something went wrong.', 'error');
                    }
                )
            }
        },
    });

Vaultier.WorkspaceEditController = Ember.ObjectController.extend({
    breadcrumbs: null
});

Vaultier.WorkspaceEditView = Ember.View.extend({
    templateName: 'Workspace/WorkspaceEdit',
    layoutName: 'Layout/LayoutStandard'
});
