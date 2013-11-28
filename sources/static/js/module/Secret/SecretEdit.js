Vaultier.SecretEditRoute = Ember.Route.extend(
    {

        serialize: function (secret) {
            return {
                secret: secret.id
            }
        },

        model: function (params, transition) {
            var store = this.get('store');
            var promise = store.find('Secret', params.secret);
            promise
                .then(this.get('auth').checkPermissions(transition, function (model) {
                    perms = model.get('perms.update');
                    return perms
                }))

            return promise;
        },

        setupController: function (ctrl, model) {
            this._super(ctrl, model);

            // set breadcrumbs
            ctrl.set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router')})
                    .addHome()
                    .addWorkspace()
                    .addVault()
                    .addCard()
                    .addText('Edit secret')
            )
        },

        actions: {
            save: function () {
                if (this.get('controller.content.isValid')) {

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
            }
        },
    });

Vaultier.SecretEditController = Ember.ObjectController.extend({
    breadcrumbs: null
});

Vaultier.SecretEditView = Ember.View.extend({
    templateName: 'Secret/SecretEdit',
    layoutName: 'Layout/LayoutStandard'
});
