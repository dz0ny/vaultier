Vaultier.CardsIndexRoute = Ember.Route.extend(
    Vaultier.WorkspaceKeysMixin,
    {
        beforeModel: function () {
            this.checkWorkspaceKeys();
        },

        model: function (params, transition) {
            var vault = this.modelFor('Vault');
            var workspace = this.modelFor('Workspace');
            var store = this.get('store');

            // load cards
            var cards = store.find('Card', {vault: vault.get('id')});

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
                cards: cards,
                memberships: memberships
            });
        },

        setupController: function (ctrl, model) {
            var environment = this.get('environment');
            // set model
            ctrl.set('content', model.cards);
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
            );
        }

    });


Vaultier.CardsIndexController = Ember.ArrayController.extend({
    workspace: null,
    vault: null,
    sortProperties: ['name'],
    sortAscending: true,
    actions: {
        createCard: function () {
            this.set('sortAscending', !this.get('sortAscending'));
        }
    }
});


Vaultier.CardsIndexView = Ember.View.extend({
    templateName: 'Card/CardsIndex',
    layoutName: 'Layout/LayoutStandard'
//    controller: Vaultier.CardListController
});


Vaultier.CardsIndexItemView = Ember.View.extend({
    templateName: 'Card/CardsIndexItem'
});

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
                        $.notify('Oooups! Something went wrong.', 'error');
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
                        $.notify('Your changes has been successfully saved.', 'success');
                        history.go(-1);
                    }.bind(this),
                    function () {
                        $.notify('Oooups! Something went wrong.', 'error');
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


Vaultier.CardRoute = Ember.Route.extend(
    Vaultier.WorkspaceKeysMixin,
    {
        beforeModel: function () {
            this.checkWorkspaceKeys();
        },

        model: function (params, transition) {
            var vault = this.modelFor('Vault');
            var model = this.get('store')
                .find('Card', params.card)
                .then(function (model) {
                    if (model.get('vault') != vault.get('id')) {
                        var error = new Error();
                        error.status = 404;
                        throw error;
                    }
                    return model;
                });

            return model;
        },

        actions: {
            deleteCard: function (card) {
                var parentVault = this.modelFor('Vault');
                Vaultier.confirmModal(this, 'Are you sure?', function () {
                    var promise = card
                        .deleteRecord()
                        .then(
                            function () {
                                $.notify('Your card has been successfully deleted.', 'success');

                                this.transitionTo('Cards.index', parentVault);
                            }.bind(this),
                            function (error) {
                                card.rollback();
                                $.notify('Oooups! Something went wrong.', 'error');
                            }.bind(this)
                        );
                    ApplicationLoader.promise(promise);
                }.bind(this));
            }
        },

        afterModel: function (card) {
            this.get('environment').set('card', card);
        },

        serialize: function (model) {
            // primitives
            if (typeof model == 'string' || typeof model == 'number') {
                return model;
            }

            return {
                card: model.get('slug')
            };
        }
    });

Vaultier.CardIndexRoute = Ember.Route.extend({
    beforeModel: function () {
        this.transitionTo('Secret.index');
    }
});


Vaultier.CardRolesAdminIndexRoute = Vaultier.RolesAdminIndexRoute.extend(
    Vaultier.WorkspaceKeysMixin,
    {
        beforeModel: function () {
            this.checkWorkspaceKeys();
        },

        setupInviteData: function (params) {
            var card = this.modelFor('Card');
            return {
                inviteObject: card
            };
        },

        setupBlocks: function () {
            return {workspace: true, vault: true, card: true};
        },

        setupBreadcrumbs: function () {
            return Vaultier.Breadcrumbs.create({router: this.get('router'), environment: this.get('environment')})
                .addHome()
                .addWorkspace()
                .addVault()
                .addCard()
                .addRolesAdminIndex('Card.rolesAdminIndex');
        },

        setupInviteRoute: function (models) {
            return {
                inviteRouteName: 'Card.rolesAdminInvite'
            };
        },

        setupRoleLevels: function () {
            var levels = Vaultier.Role.proto().roles.toArray().filter(function (item, index) {
                if (item.id == 'CREATE') {
                    return false;
                }
                return item;
            });
            return levels;
        }
    });


Vaultier.CardRolesAdminIndexController = Vaultier.RolesAdminIndexController.extend({
});


Vaultier.CardRolesAdminInviteRoute = Vaultier.RolesAdminInviteRoute.extend(
    Vaultier.WorkspaceKeysMixin,
    {
        beforeModel: function () {
            this.checkWorkspaceKeys();
        },


        setupInviteData: function (params) {
            var card = this.modelFor('Card');
            var workspace = this.modelFor('Workspace');
            return {
                inviteObject: card,
                inviteParams: { to_card: card},
                inviteWorkspace: workspace
            }
        },

        setupBreadcrumbs: function () {
            return Vaultier.Breadcrumbs.create({router: this.get('router'), environment: this.get('environment')})
                .addHome()
                .addWorkspace()
                .addVault()
                .addCard()
                .addRolesAdminIndex('Card.rolesAdminIndex')
                .addRolesAdminInvite('Card.rolesAdminInvite');
        },

        setupRoleLevels: function () {
            var levels = Vaultier.Role.proto().roles.toArray().filter(function (item, index) {
                if (item.id == 'CREATE') {
                    return false;
                }
                return item;
            });
            return levels;
        }

    });

Vaultier.CardRolesAdminInviteController = Vaultier.RolesAdminInviteController.extend({
});


Vaultier.CardVaultNodeView = EmberExt.Tree.TreeNodeView.extend({
    templateName: 'Card/CardMoveVaultNode',
    Radio: Ember.View.extend({
        tagName: "input",
        type: "radio",
        attributeBindings: [  "type", "name", "value"],
        click: function () {
            this.get('controller').send('selected', this.$().val())
        }
    }),
    loadData: function () {
        return []
    }
});

Vaultier.CardMoveRoute = Ember.Route.extend(
    Vaultier.WorkspaceKeysMixin,
    {
        beforeModel: function () {
            this.checkWorkspaceKeys();
        },

        model: function (params, transition) {
            var store = this.get('store');
            var workspace = this.modelFor('Workspace');

            var vaults =
                store.
                    find('Vault', {workspace: workspace.get('id')})
                    .then(function (model) {
                        model.forEach(function (item) {
                            item.set('branch', true)
                        })
                        return model
                    })

            return vaults
        },

        setupController: function (ctrl, model) {
            var card = this.modelFor('Card')

            ctrl.set('content', card);
            ctrl.set('treeNodes', model);

            // set breadcrumbs
            ctrl.set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router')})
                    .addHome()
                    .addWorkspace()
                    .addVault()
                    .addCard()
                    .addText('Move card')
            )
        },

        actions: {

            save: function () {
                var record = this.get('controller.content');
                record.set('vault', this.get('controller.selected'))
                var promise = record
                    .saveRecord()
                    .then(function () {
                        return this.get('store').find('Vault', record.get('vault'))
                    }.bind(this))
                    .then(function (vault) {
                    $.notify('Your card has been successfully moved.', 'success');
                    this.transitionTo(
                        'Secret.index',
                        this.modelFor('Workspace').get('slug'),
                        vault.get('slug'),
                        this.modelFor('Card').get('slug')
                    )
                }.bind(this),
                    function () {
                        $.notify('Oooups! Something went wrong.', 'error');
                    }
                )

                ApplicationLoader.promise(promise)
            }
        }
    });

Vaultier.CardMoveController = Ember.ObjectController.extend({
    moveDisabled: function () {
        return !this.get('selected');
    }.property('selected'),
    selected: false,
    breadcrumbs: null,
    actions: {
        selected: function (val) {
            this.set('selected', val);
        }
    }
});

Vaultier.CardMoveView = Ember.View.extend({
    templateName: 'Card/CardMove',
    layoutName: 'Layout/LayoutStandard',
    Tree: EmberExt.Tree.TreeView.extend({
        itemViewClass: Vaultier.CardVaultNodeView
    })

});


//# sourceMappingURL=card.js.map