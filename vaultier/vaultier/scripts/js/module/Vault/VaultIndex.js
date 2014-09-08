Vaultier.VaultRoute = Ember.Route.extend(
    Vaultier.WorkspaceKeysMixin,
    {
        model: function (params, transition) {
            workspace = this.modelFor('Workspace');
            model = this.get('store')
                .find('Vault', params.vault)
                .then(function (model) {
                    if (model.get('workspace') != workspace.get('id')) {
                        var error = new Error();
                        error.status = 404;
                        throw error;
                    }
                    return model;
                });
            return model;
        },

        afterModel: function (vault) {
            var environment = this.get('environment');
            environment.set('vault', vault);
            this.checkWorkspaceKeys();
        },

        serialize: function (model) {
            // primitives
            if (typeof model == 'string' || typeof model == 'number') {
                return model;
            }

            return {
                vault: model.get('slug')
            };
        },

        actions: {
            deleteVault: function (vault) {
                Vaultier.confirmModal(this, 'Are you sure?', function () {
                    var promise = vault
                        .deleteRecord()
                        .then(
                            function () {
                                $.notify('Your vault has been successfully deleted.', 'success');
                                this.transitionTo('Workspace.index');
                            }.bind(this),
                            function (error) {
                                $.notify('Oooups! Something went wrong.', 'error');
                            }.bind(this)
                        );
                    ApplicationLoader.promise(promise);

                }.bind(this));

            }

        }

    });

Vaultier.VaultIndexRoute = Ember.Route.extend(
    Vaultier.WorkspaceKeysMixin,
    {
        beforeModel: function () {
            if (this.checkWorkspaceKeys()) {
                this.transitionTo('Cards.index');
            }
        }
    });
