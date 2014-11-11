Vaultier.SecretCreateController = Ember.Controller.extend({
    submitButtonShown: false,
    needs: ['application']
});

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
    Vaultier.WorkspaceKeysMixin,
    {
        beforeModel: function () {
            this.checkWorkspaceKeys();
        },

        model: function (params, transition) {
            var card = this.modelFor('Card');

            // check permissions
            if (!this.get('auth').checkPermissions(transition, function () {
                return card.get('perms.create');
            }.bind(this), true)) {
                return;
            }
        },

        setupController: function (ctrl, model) {
            ctrl.set('content', {});

            ctrl.set('controllers.SecretCreate.submitButtonShown', false);

            // set breadcrumbs
            ctrl.get('controllers.SecretCreate').set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router'), environment: this.get('environment')})
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
});

Vaultier.SecretCreateSubmitController = Ember.ObjectController.extend({
    needs: ['SecretCreate']
});


Vaultier.SecretCreateSubmitRoute = Ember.Route.extend(
    Vaultier.WorkspaceKeysMixin,
    {
        beforeModel: function () {
            this.checkWorkspaceKeys();
        },

        model: function (params, transition) {
            var store = this.get('store');
            var vault = this.modelFor('Vault');
            var workspace = this.modelFor('Workspace');
            var card = this.modelFor('Card');

            // check permissions
            if (!this.get('auth').checkPermissions(transition, function () {
                return this.modelFor('Card').get('perms.create');
            }.bind(this), true)) {
                return;
            }

            // load memberships
            var memberships = Ember.RSVP
                .hash({
                    to_workspace: store.find('Role', {to_workspace: workspace.get('id') }),
                    to_vault: store.find('Role', {to_vault: vault.get('id')}),
                    to_card: store.find('Role', {to_card: card.get('id')})
                })
                .then(function (memberships) {
                    return [].concat(memberships.to_workspace.toArray(), memberships.to_vault.toArray(), memberships.to_card.toArray());
                });

            // retrieve model
            var secret = store.createRecord('Secret');

            // return promise for all requests
            return Ember.RSVP.hash({
                secret: secret,
                memberships: memberships
            });
        },

        afterModel: function (model, transition) {
            var secret = model.secret;
            secret.set('card', this.modelFor('Card').get('id'));

            var SecretClass = Vaultier.dal.model.Secret.proto();
            switch (transition.params['Secret.createSubmit'].type.toUpperCase()) {

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
            ctrl.set('content', model.secret);
            ctrl.set('memberships', model.memberships);
            ctrl.set('membershipsScope',  this.modelFor('Card'))

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
                Vaultier.Breadcrumbs.create({router: this.get('router'), environment: this.get('environment')})
                    .addHome()
                    .addWorkspace()
                    .addVault()
                    .addCard()
                    .addText('Create new secret')
            );
        },

        renderTemplate: function () {
            this.render('SecretCreate');
            this.render(this.template, {outlet: 'tab', into: 'SecretCreate'});
        },

        actions: {
            submit: function () {
                var record = this.get('controller.content');
                var notifyError = function (error) {
                    $.notify('Ooops! Something went wrong.', 'error');
                    throw error;
                };

                try {
                    var promise = record
                        .saveRecord()
                        .then(function (response) {
                            $.notify('Your secret has been created successfully.', 'success');
                            this.transitionTo('Secret.index', this.get('card'));
                        }.bind(this))
                        .catch(notifyError);

                    ApplicationKernel.UI.showLoaderUponPromise(promise);
                } catch (e) {
                    ApplicationKernel.UI.hideLoader();
                    notifyError(e);
                }
            }
        }

    });

Vaultier.SecretCreateSelectView = Ember.View.extend({
    templateName: 'Secret/SecretCreateSelect'
});
