Vaultier.VaultRoute = Ember.Route.extend(
    {
        model: function (params, transition) {
            workspace = this.modelFor('Workspace');
            model = this.get('store')
                .find('Vault', params.vault)
                .then(function (model) {
                    if (model.get('workspace') != workspace.get('id')) {
                        var error = new Error();
                        error.status = 404
                        throw error
                    }
                    return model
                })
            return model;
        },

        afterModel: function (vault) {
            Service.Environment.current().set('vault', vault);
        },

        serialize: function (model) {
            // primitives
            if (typeof model == 'string' || typeof model == 'number') {
                return model
            }

            return {
                vault: model.get('slug')
            }
        },

        actions: {
            deleteVault: function (vault) {
                Vaultier.confirmModal(this, 'Are you sure?', function () {
                    var promise = vault
                        .deleteRecord()
                        .then(
                            function () {
                                $.notify('Your vault has been successfully deleted.', 'success');
                                this.transitionTo('Vaults.index', this.get('workspace'));
                            }.bind(this),
                            function (error) {
                                card.rollback();
                                $.notify('Oooups! Something went wrong.', 'error');
                            }.bind(this)
                        );
                    ApplicationLoader.promise(promise);

                }.bind(this));


            }

        }

    });

Vaultier.VaultIndexRoute = Ember.Route.extend({
    beforeModel: function () {
        this.transitionTo('Cards.index')
    }
})
