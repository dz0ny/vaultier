Vaultier.WorkspaceEditRoute = Ember.Route.extend(
    {
        model: function (params, transition) {
            var workspace = this.modelFor('Workspace');

            if (!this.get('auth').checkPermissions(transition, function() {
                return workspace.get('perms.update')
            }.bind(this), true)) {
                return;
            }

            return workspace
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
