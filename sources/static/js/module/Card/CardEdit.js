Vaultier.CardEditRoute = Ember.Route.extend(
    {

        serialize: function(card) {
            return {
                card: card.id
            }
        },

        model: function (params, transition) {
            var card = this.modelFor('Card');

            if (!this.get('auth').checkPermissions(transition, function() {
                return card.get('perms.update')
            }.bind(this), true)) {
                return;
            }

            return card
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
                    .addText('Edit card')
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

Vaultier.CardEditController = Ember.ObjectController.extend({
    breadcrumbs: null
});

Vaultier.CardEditView = Ember.View.extend({
    templateName: 'Card/CardEdit',
    layoutName: 'Layout/LayoutStandard'
});
