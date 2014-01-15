Vaultier.SecretCardNodeView = Ember.Tree.TreeNodeView.extend({
    templateName: 'Secret/SecretMoveCardNode',
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
    },
});

Vaultier.SecretVaultNodeView = Ember.Tree.TreeNodeView.extend({
    templateName: 'Secret/SecretMoveVaultNode',

    getSubNodeViewClass: function () {
        return Vaultier.SecretCardNodeView
    },

    loadData: function () {
        var store = this.get('controller.store');
        var id = this.get('content.id');
        var nodes = store
            .find('Card', {vault: id})
            .then(function (model) {
                model.forEach(function (item) {
                    item.set('branch', true)
                })
                return model
            })
        return nodes
    }
});

Vaultier.SecretMoveRoute = Ember.Route.extend(
    {

        serialize: function (secret) {
            return {
                secret: secret.id
            }
        },

        model: function (params, transition) {
            var workspace = this.modelFor('Workspace');
            var store = this.get('store');

            var secret = store.find('Secret', params.secret);
            secret
                .then(this.get('auth').checkPermissions(transition, function (model) {
                    perms = model.get('perms.update');
                    return perms
                }))

            var vaults =
                store.
                    find('Vault', {workspace: workspace.get('id')})
                    .then(function (model) {
                        model.forEach(function (item) {
                            item.set('branch', true)
                        })
                        return model
                    })

            return Ember.RSVP.hash({
                secret: secret,
                vaults: vaults
            })
        },

        setupController: function (ctrl, model) {
            ctrl.set('content', model.secret);
            ctrl.set('treeNodes', model.vaults);

            // set breadcrumbs
            ctrl.set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router')})
                    .addHome()
                    .addWorkspace()
                    .addVault()
                    .addCard()
                    .addText('Move secret')
            )
        },

        actions: {

            save: function () {
                var record = this.get('controller.content');
                record.set('card', this.get('controller.selected'))
                record
                    .saveRecord()
                    .then(
                    function () {
                        $.notify('Your secret has been successfully moved.', 'success');
                        history.go(-1);
                    }.bind(this),
                    function () {
                        $.notify('Oooups! Something went wrong.', 'error');
                    }
                )
            }
        }
    });

Vaultier.SecretMoveController = Ember.ObjectController.extend({
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

Vaultier.SecretMoveView = Ember.View.extend({
    templateName: 'Secret/SecretMove',
    layoutName: 'Layout/LayoutStandard',
    Tree: Ember.Tree.TreeView.extend({
        itemViewClass: Vaultier.SecretVaultNodeView
    })

});
