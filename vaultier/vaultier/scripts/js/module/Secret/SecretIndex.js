Vaultier.SecretIndexRoute = Ember.Route.extend(
    Vaultier.WorkspaceKeysMixin,
    {
        beforeModel: function () {
            this.checkWorkspaceKeys();
        },

        model: function (params, queryParams) {
            var vault = this.modelFor('Vault');
            var workspace = this.modelFor('Workspace');
            var card = this.modelFor('Card');
            var store = this.get('store');

            // load secrets
            var secrets = store.find('Secret', {card: card.get('id')});

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

            // return promise for all requests
            return Ember.RSVP.hash({
                secrets: secrets,
                memberships: memberships
            });
        },


        setupController: function (ctrl, model) {
            // set model
            ctrl.set('content', model.secrets);
            ctrl.set('memberships', model.memberships);

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
                Vaultier.Breadcrumbs.create({router: this.get('router'), environment: this.get('environment')})
                    .addHome()
                    .addWorkspace()
                    .addVault()
                    .addCard()
            );
        },

        actions: {

            downloadBlob: function (secret) {
                ApplicationLoader.showLoader();
                secret
                    .loadBlob()
                    .finally(function () {
                        ApplicationLoader.hideLoader();
                    })
                    .then(function () {
                        var data = secret.get('blob.filedata');
                        var type = secret.get('blob.filetype');
                        var name = secret.get('blob.filename');

                        var byteArray = new Uint8Array(data.length);
                        for (var i = 0; i < data.length; i++) {
                            byteArray[i] = data.charCodeAt(i) & 0xff;
                        }

                        var blob = new Blob([byteArray.buffer], {type: type});
                        saveAs(blob, name);
                    }.bind(this))


            },

            deleteSecret: function (secret) {
                Vaultier.confirmModal(this, 'Are you sure?', function () {

                    this.get('controller.content').removeObject(secret);
                    var promise = secret
                        .deleteRecord()
                        .then(
                            function () {
                                $.notify('Your secret has been deleted successfully.', 'success');
                            }.bind(this),

                            function (error) {
                                secret.rollback();
                                $.notify('Ooops! Something went wrong.', 'error');
                            }.bind(this)
                        );
                    ApplicationLoader.promise(promise);
                }.bind(this));
            }


        }
    }
)
;

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


Vaultier.SecretIndexItemView = Ember.View.extend({
    classNames: ['vlt-secret-item'],
    templateName: function () {
        var types = Vaultier.Secret.proto().types;
        switch (this.get('secret.type')) {
            case types['NOTE'].value:
                return 'Secret/SecretIndexItemNote';
            case types['PASSWORD'].value:
                return 'Secret/SecretIndexItemPassword';
            case types['FILE'].value:
                return 'Secret/SecretIndexItemFile';
        }
    }.property()
});

Vaultier.SecretIndexItemControlsView = Ember.View.extend({
    templateName: 'Secret/SecretIndexItemControls'
});
