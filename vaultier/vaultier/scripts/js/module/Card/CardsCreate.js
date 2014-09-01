Vaultier.CardsCreateRoute = Ember.Route.extend(
    Vaultier.WorkspaceKeysMixin,
    {
        beforeModel: function () {
            this.checkWorkspaceKeys();
        },

        model: function (params, transition) {
            var store = this.get('store');
            var workspace = this.modelFor('Workspace');
            var vault = this.modelFor('Vault');

            // check permissions
            if (!this.get('auth').checkPermissions(transition, function () {
                return vault.get('perms.create');
            }.bind(this), true)) {
                return;
            }

            // create record
            var card = store.createRecord('Card');

            // load memberships
            var memberships = Ember.RSVP
                .hash({
                    to_workspace: store.find('Role', {to_workspace: workspace.get('id') }),
                    to_vault: store.find('Role', {to_vault: vault.get('id')})
                })
                .then(function (memberships) {
                    return [].concat(memberships.to_workspace.toArray(), memberships.to_vault.toArray());
                });

            // return promise for all requests
            return Ember.RSVP.hash({
                card: card,
                memberships: memberships
            });
        },

        actions: {
            save: function () {
                var workspace = this.get('workspace');
                var vault = this.get('vault');

                var record = this.get('controller.content');
                record.set('vault', vault.get('id'));

                var promise = record
                    .saveRecord()
                    .then(
                    function () {
                        $.notify('Your card has been successfully created.', 'success');
                        this.transitionTo('Card.index', record);
                    }.bind(this),
                    function () {
                        $.notify('Ooops! Something went wrong.', 'error');
                    }
                );

                ApplicationLoader.promise(promise);
            }
        },

        setupController: function (ctrl, model) {
            // set model
            ctrl.set('content', model.card);
            ctrl.set('memberships', model.memberships);

            // retrieve workspace
            var workspace = this.modelFor('Workspace');
            this.set('workspace', workspace);
            ctrl.set('workspace', workspace);

            // retrieve vault
            var vault = this.modelFor('Vault');
            this.set('vault', vault);
            ctrl.set('vault', vault);

            // set breadcrumbs
            ctrl.set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router'), environment: this.get('environment')})
                    .addHome()
                    .addWorkspace()
                    .addVault()
                    .addText('Create new card')
            );

        }

    });

Vaultier.CardsCreateController = Ember.ObjectController.extend({
    breadcrumbs: null,
    workspace: null,
    vault: null
});

Vaultier.CardsCreateView = Ember.View.extend({
    templateName: 'Card/CardsCreate',
    layoutName: 'Layout/LayoutStandard'
});