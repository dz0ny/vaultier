Vaultier.SecretIndexRoute = Ember.Route.extend(
    Vaultier.WorkspaceKeysMixin,
    {
        beforeModel: function () {
            this.checkWorkspaceKeys();
        },

        model: function (params, queryParams) {
            var card = this.modelFor('Card');
            var store = this.get('store');

            return store.find('Secret', {card: card.get('id')})
        },


        setupController: function (ctrl, model) {
            ctrl.set('content', model);

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
                Vaultier.Breadcrumbs.create({router: this.get('router')})
                    .addHome()
                    .addWorkspace()
                    .addVault()
                    .addCard()
            )
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

                    this.get('controller.content').removeObject(secret)
                    var promise = secret
                        .deleteRecord()
                        .then(
                            function () {
                                $.notify('Your secret has been successfully deleted.', 'success');
                            }.bind(this),

                            function (error) {
                                secret.rollback();
                                $.notify('Oooups! Something went wrong.', 'error');
                            }.bind(this)
                        );
                    ApplicationLoader.promise(promise)
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


Vaultier.SecretIndexItemNoteView = Ember.View.extend({
    templateName: 'Secret/SecretIndexItemNote'
});

Vaultier.SecretIndexItemPasswordView = Ember.View.extend({
    templateName: 'Secret/SecretIndexItemPassword'
});


Vaultier.SecretIndexItemFileView = Ember.View.extend({
    templateName: 'Secret/SecretIndexItemFile'
});

Vaultier.SecretIndexItemControlsView = Ember.View.extend({
    templateName: 'Secret/SecretIndexItemControls'
});
