Vaultier.SecretCreateSelectRoute = Ember.Route.extend({

    setupController: function (ctrl, model) {
        ctrl.set('content', {});
        ctrl.set('submitButtonHidden', true);

        // set breadcrumbs
        ctrl.set('breadcrumbs',
            Vaultier.Breadcrumbs.create({router: this.get('router')})
                .addHome()
                .addWorkspace()
                .addVault()
                .addCard()
                .addText('Create new secret')
        );
    },

    renderTemplate: function () {
        this.render('SecretCreate');
        this.render('SecretTypeSelect', {outlet: 'tab', into: 'SecretCreate'});
    }
});

Vaultier.SecretCreateSubmitRoute = Ember.Route.extend({

    model: function () {
        var store = this.get('store');
        var record = store.createRecord('Secret');
        return record;
    },

    afterModel: function (secret, transition) {
        secret.set('card', this.modelFor('Secret').get('id'));

        switch (transition.params.type) {
            case 'file' :
                this.template = 'SecretTypeFile';
                secret.set('type', secret.types.file);
                break;
            case 'password' :
                this.template = 'SecretTypePassword';
                secret.set('type', secret.types.password);
                break;
            default:
                secret.set('type', secret.types.note);
                this.template = 'SecretTypeNote';
        }
    },

    setupController: function (ctrl, model) {
        ctrl.set('content', model);

        // retrieve workspace
        var workspace = this.modelFor('Vault');
        this.set('workspace', workspace);

        // retrieve vault
        var vault = this.modelFor('Card');
        this.set('vault', vault);

        // retrieve vault
        var card = this.modelFor('Secret');
        this.set('card', card);

        // set breadcrumbs
        ctrl.set('breadcrumbs',
            Vaultier.Breadcrumbs.create({router: this.get('router')})
                .addHome()
                .addWorkspace()
                .addVault()
                .addCard()
                .addText('Create new secret')
        )
    },

    renderTemplate: function () {
        this.render('SecretCreate');
        this.render(this.template, {outlet: 'tab', into: 'SecretCreate'});
    },

    deactivate: function () {
        var record = this.get('controller.content');
        var store = this.get('store');
        if (!record.get('id')) {
            //record.rollback();
            store.deleteRecord(record);
        }
    },

    actions: {
        submit: function () {
            var record = this.get('controller.content');

            record.save().then(
                function () {
                    $.notify('Your secret has been successfully created.', 'success');
                    this.transitionTo('Secret.index', this.get('workspace').id, this.get('vault').id, this.get('card').id);
                }.bind(this),
                function () {
                    $.notify('Oooups! Something went wrong.', 'error');
                }
            )
        }
    }

});

Vaultier.SecretCreateController = Ember.Controller.extend({
    needs: ['application']
})

Vaultier.SecretCreateView = Ember.View.extend({
    templateName: 'Secret/SecretCreate',
    layoutName: 'Layout/LayoutStandard',

    TabView: Ember.View.extend({
        classNameBindings: 'isActive:active'.w(),
        tagName: 'li',
        isActive: function () {
            var tab = this.get('tab');
            var path = this.get('parentView.controller.controllers.application.currentPath');
            var route = path.split('.')[path.split('.').length-1];
            return tab == route;
        }.property('parentView.controller.controllers.application.currentPath')
    })

});

Vaultier.SecretCreateSelectView = Ember.View.extend({
    templateName: 'Secret/SecretCreateSelect',
});
