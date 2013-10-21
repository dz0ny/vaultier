Vaultier.SecretRoute = Ember.Route.extend({

    model: function (params) {
        return this.get('store').find('Card', params.card)
    },

    afterModel: function (card) {
        Service.Environment.current().set('card', card);
    },

    serialize: function (card) {
        return {
            card: card.get('id')
        }
    }

});

Vaultier.SecretIndexRoute = Ember.Route.extend({

    setupController: function (ctrl, model) {
        ctrl.set('content', model);

        // retrieve workspace
        var workspace = this.modelFor('Vault');
        this.set('workspace', workspace);
        ctrl.set('workspace', workspace);

        // retrieve vault
        var vault = this.modelFor('Secret');
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

    model: function (params, queryParams) {
        var store = this.get('store');
        return store.find('Secret');
    }
});

Vaultier.SecretIndexController = Ember.ArrayController.extend({
    itemController: 'SecretIndexItem',

    workspace: null,
    vault: null,
    card: null
});

Vaultier.SecretIndexItemController = Ember.ObjectController.extend({
    isNote : function() {
        var secret = this.get('content');
        return secret.get('type') == secret.types.note;
    }.property('type'),

    isPassword : function() {
        var secret = this.get('content');
        return secret.get('type') == secret.types.password;
    }.property('type'),

    isFile : function() {
        var secret = this.get('content');
        return secret.get('type') == secret.types.file;
    }.property('type')

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
