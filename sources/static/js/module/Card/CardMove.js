Vaultier.CardVaultNodeView = Ember.Tree.TreeNodeView.extend({
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
    {

        model: function (params, transition) {
            var store = this.get('store');
            var workspace = this.modelFor('Workspace');

            var vaults =
                store.
                    find('vault', {workspace: workspace.get('pk')})
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
                record.save().then(
                    function () {
                        $.notify('Your card has been successfully moved.', 'success');
                        this.transitionTo(
                            'Secret.index',
                            this.modelFor('Workspace').pk,
                            record.get('vault'),
                            this.modelFor('card'.pk)
                        )
                    }.bind(this),
                    function () {
                        $.notify('Oooups! Something went wrong.', 'error');
                    }
                )
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
    Tree: Ember.Tree.TreeView.extend({
        itemViewClass: Vaultier.CardVaultNodeView
    })

});
