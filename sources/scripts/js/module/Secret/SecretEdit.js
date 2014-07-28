Vaultier.SecretEditRoute = Ember.Route.extend(
    Vaultier.WorkspaceKeysMixin,
    {
        beforeModel: function () {
            this.checkWorkspaceKeys();
        },

        serialize: function (secret) {
            return {
                secret: secret.id
            };
        },

        model: function (params, transition) {
            // check workspace keys
            var workspace = this.modelFor('Workspace');
            if (!workspace.get('hasValidKey')) {
                throw Error('Cannot edit secret without valid workspace key');
            }

            var store = this.get('store');
            var promise = store.find('Secret', params.secret);
            promise
                .then(this.get('auth').checkPermissions(transition, function (model) {
                    perms = model.get('perms.update');
                    return perms;
                }));

            return promise;
        },

        setupController: function (ctrl, model) {
            this._super(ctrl, model);

            // set breadcrumbs
            var environment = this.get('environment');

            ctrl.set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router'), environment: environment})
                    .addHome()
                    .addWorkspace()
                    .addVault()
                    .addCard()
                    .addText('Edit secret')
            );
        },

        actions: {
            save: function () {
                var notifyError = function (error) {
                    $.notify('Oooups! Something went wrong.', 'error');
                    throw error;
                };

                try {
                    var record = this.get('controller.content');
                    var promise = record
                        .saveRecord()
                        .then(function () {
                            $.notify('Your changes has been successfully saved.', 'success');
                            history.go(-1);
                        }.bind(this))
                        .catch(notifyError);

                    ApplicationLoader.promise(promise);
                } catch (e) {
                    ApplicationLoader.hideLoader();
                    notifyError(e);
                }
            }
        }
    });

Vaultier.SecretEditController = Ember.ObjectController.extend({
    breadcrumbs: null
});

Vaultier.SecretEditView = Ember.View.extend({
    templateName: 'Secret/SecretEdit',
    layoutName: 'Layout/LayoutStandard'
});
