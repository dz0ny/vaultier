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
                    $.notify('Your card has been moved successfully.', 'success');
                    this.transitionTo(
                        'Secret.index',
                        this.modelFor('Workspace').get('slug'),
                        vault.get('slug'),
                        this.modelFor('Card').get('slug')
                    )
                }.bind(this),
                    function () {
                        $.notify('Ooops! Something went wrong.', 'error');
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
