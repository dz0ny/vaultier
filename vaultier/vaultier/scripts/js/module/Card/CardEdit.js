Vaultier.CardEditRoute = Ember.Route.extend(
    Vaultier.WorkspaceKeysMixin,
    {
        beforeModel: function () {
            this.checkWorkspaceKeys();
        },

        model: function (params, transition) {
            var card = this.modelFor('Card');

            if (!this.get('auth').checkPermissions(transition, function () {
                return card.get('perms.update')
            }.bind(this), true)) {
                return;
            }

            return card
        },

        setupController: function (ctrl, model) {
            this._super(ctrl, model);
            var environment = this.get('environment');

            // set breadcrumbs
            ctrl.set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router'), environment: environment})
                    .addHome()
                    .addWorkspace()
                    .addVault()
                    .addCard()
                    .addText('Edit card')
            );
        },

        actions: {
            save: function () {
                var record = this.get('controller.content');
                var promise = record.saveRecord().then(
                    function () {
                        $.notify('Your changes have been saved successfully.', 'success');
                        history.go(-1);
                    }.bind(this),
                    function () {
                        $.notify('Ooops! Something went wrong.', 'error');
                    }
                );

                ApplicationLoader.promise(promise);

            }
        }
    });

Vaultier.CardEditController = Ember.ObjectController.extend({
    breadcrumbs: null
});

Vaultier.CardEditView = Ember.View.extend({
    templateName: 'Card/CardEdit',
    layoutName: 'Layout/LayoutStandard'
});
