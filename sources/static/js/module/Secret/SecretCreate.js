Vaultier.SecretCreateController = Ember.Controller.extend({
    submitButtonShown: false,
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
            var route = path.split('.')[path.split('.').length - 1];
            return tab == route;
        }.property('parentView.controller.controllers.application.currentPath')
    })

});

Vaultier.SecretCreateSelectRoute = Ember.Route.extend(
    {

        model: function (params, transition) {

            // check permissions
            if (!this.get('auth').checkPermissions(transition, function () {
                return this.modelFor('Card').get('perms.create')
            }.bind(this), true)) {
                return;
            }
        },

        setupController: function (ctrl, model) {
            ctrl.set('content', {});

            ctrl.set('controllers.SecretCreate.submitButtonShown', false);

            // set breadcrumbs
            this.controllerFor('SecretCreate').set('breadcrumbs',
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

Vaultier.SecretCreateSelectController = Ember.Controller.extend({
    needs: ['SecretCreate']
})

Vaultier.SecretCreateSubmitController = Ember.ObjectController.extend({
    needs: ['SecretCreate']
})


Vaultier.SecretCreateSubmitRoute = Ember.Route.extend(
    {

        model: function (params, transition) {

            // check permissions
            if (!this.get('auth').checkPermissions(transition, function () {
                return this.modelFor('Card').get('perms.create')
            }.bind(this), true)) {
                return;
            }

            // retrieve model
            var store = this.get('store');
            var record = store.createRecord('Secret');
            return record;
        },

        afterModel: function (secret, transition) {

            secret.set('card', this.modelFor('Card').get('pk'));

            var SecretClass = Vaultier.Secret.proto();
            switch (transition.params.type.toUpperCase()) {

                case SecretClass.types['FILE'].text :
                    this.template = 'SecretTypeFile';
                    secret.set('type', SecretClass.types['FILE'].value);
                    break;

                case SecretClass.types['PASSWORD'].text :
                    this.template = 'SecretTypePassword';
                    secret.set('type', SecretClass.types['PASSWORD'].value);
                    break;

                default:
                    secret.set('type', SecretClass.types['NOTE'].value);
                    this.template = 'SecretTypeNote';
            }
        },

        setupController: function (ctrl, model) {
            ctrl.set('content', model);

            ctrl.set('controllers.SecretCreate.submitButtonShown', true);

            // retrieve workspace
            var workspace = this.modelFor('Workspace');
            this.set('workspace', workspace);

            // retrieve vault
            var vault = this.modelFor('Vault');
            this.set('vault', vault);

            // retrieve vault
            var card = this.modelFor('Card');
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
                if (this.get('controller.content.isValid')) {
                    var record = this.get('controller.content');

                    record.save().then(
                        function () {
                            $.notify('Your secret has been successfully created.', 'success');
                            this.transitionTo('Secret.index', this.get('Card'));
                        }.bind(this),
                        function () {
                            $.notify('Oooups! Something went wrong.', 'error');
                        }
                    )
                }
            }
        }

    });

Vaultier.SecretCreateSelectView = Ember.View.extend({
    templateName: 'Secret/SecretCreateSelect'
});
