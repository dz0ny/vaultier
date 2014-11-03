Vaultier.WorkspaceEditRoute = Ember.Route.extend(
    Vaultier.WorkspaceKeysMixin,
    {

        beforeModel: function() {
            this.checkWorkspaceKeys();
        },

        model: function (params, transition) {
            var workspace = this.modelFor('Workspace');

            if (!this.get('auth').checkPermissions(transition, function () {
                return workspace.get('perms.update')
            }.bind(this), true)) {
                return;
            }

            return workspace;
        },

        setupController: function (ctrl, model) {
            this._super(ctrl, model);

            // set breadcrumbs
            ctrl.set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router'), environment: this.get('environment')})
                    .addHome()
                    .addWorkspace()
                    .addText('Edit workspace')
            )
        },

        actions: {
            save: function () {
                var record = this.get('controller.content');
                var promise = record
                    .saveRecord()
                    .then(function () {
                        $.notify('Your changes have been saved successfully.', 'success');
                        history.go(-1);
                    }.bind(this))

                    .catch(function (error) {
                        $.notify('Ooops! Something went wrong.', 'error');
                        this.get('errors').logError(error);
                    }.bind(this));

                ApplicationKernel.UI.showLoaderUponPromise(promise);
            }
        }
    });

Vaultier.WorkspaceEditController = Ember.ObjectController.extend({
    breadcrumbs: null
});

Vaultier.WorkspaceEditView = Ember.View.extend({
    templateName: 'Workspace/WorkspaceEdit',
    layoutName: 'Layout/LayoutStandard'
});
