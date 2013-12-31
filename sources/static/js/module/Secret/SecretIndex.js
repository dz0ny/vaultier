Vaultier.SecretIndexRoute = Ember.Route.extend({

    model: function (params, queryParams) {
        var workspace = this.modelFor('Workspace')
        var card = this.modelFor('Card');
        var store = this.get('store');

        if (workspace.get('isApproved')) {
            return store.find('Secret', {card: card.get('pk')});
        } else {
            return []
        }
    },


    setupController: function (ctrl, model) {
        ctrl.set('content', model);

        // retrieve workspace
        var workspace = this.modelFor('Workspace');
        this.set('workspace', workspace);
        ctrl.set('workspace', workspace);

        // retrieve vault
        var vault = this.modelFor('Vault');
        this.set('vault', vault);
        ctrl.set('vault', vault);

        // retrieve card
        var card = this.modelFor('Card');
        this.set('card', card);
        ctrl.set('card', card);

        // set breadcrumbs
        ctrl.set('breadcrumbs',
            Vaultier.Breadcrumbs.create({router: this.get('router')})
                .addHome()
                .addWorkspace()
                .addVault()
                .addCard()
                .addText('Detail')
        )
    },

    actions: {
        deleteCard: function (card) {
            Vaultier.confirmModal(this, 'Are you sure?', function () {
                card.deleteRecord();

                card.save().then(
                    function () {
                        $.notify('Your card has been successfully deleted.', 'success');
                        this.transitionTo('Cards.index', this.get('vault'));
                    }.bind(this),
                    function (error) {
                        card.rollback();
                        $.notify('Oooups! Something went wrong.', 'error');
                    }.bind(this)
                );
            }.bind(this));
        },

        deleteSecret: function (secret) {
            Vaultier.confirmModal(this, 'Are you sure?', function () {

                this.get('controller.content').removeObject(secret)
                secret.deleteRecord();

                secret.save().then(
                    function () {
                        $.notify('Your secret has been successfully deleted.', 'success');
                    }.bind(this),

                    function (error) {
                        secret.rollback();
                        $.notify('Oooups! Something went wrong.', 'error');
                    }.bind(this)
                );
            }.bind(this));
        }


    }
});

Vaultier.SecretIndexController = Ember.ArrayController.extend({
    itemController: 'SecretIndexItem',

    workspace: null,
    vault: null,
    card: null
});

Vaultier.SecretIndexItemController = Ember.ObjectController.extend({
});

Vaultier.SecretIndexView = Ember.View.extend({
    templateName: 'Secret/SecretIndex',
    layoutName: 'Layout/LayoutStandard'
});


Vaultier.SecretIndexItemNoteView = Ember.View.extend({
    templateName: 'Secret/SecretIndexItemNote'
});

Vaultier.SecretIndexItemPasswordView = Ember.View.extend({
    templateName: 'Secret/SecretIndexItemPassword'
});


Vaultier.SecretIndexItemFileView = Ember.View.extend({
    templateName: 'Secret/SecretIndexItemFile'
});

Vaultier.SecretIndexItemControlsView = Ember.View.extend({
    templateName: 'Secret/SecretIndexItemControls'
});
