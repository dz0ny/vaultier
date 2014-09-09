Vaultier.EditorInput = Ember.TextArea.extend({
    classNames: ['vaultier-epic-editor-input']

});


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

            var SecretClass = Vaultier.Secret.proto();
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

                    ApplicationLoader.promise(promise);
                } catch (e) {
                    ApplicationLoader.hideLoader();
                    notifyError(e);
                }
            }
        }

    });

Vaultier.SecretCreateSelectView = Ember.View.extend({
    templateName: 'Secret/SecretCreateSelect'
});


Vaultier.SecretEditRoute = Ember.Route.extend(
    Vaultier.WorkspaceKeysMixin,
    {
        beforeModel: function () {
            this.checkWorkspaceKeys();
        },

        serialize: function (secret) {
            return {
                secret: secret.id
            };
        },

        model: function (params, transition) {
            // check workspace keys
            var workspace = this.modelFor('Workspace');
            if (!workspace.get('hasValidKey')) {
                throw Error('Cannot edit secret without valid workspace key');
            }

            var store = this.get('store');
            var promise = store.find('Secret', params.secret);
            promise
                .then(this.get('auth').checkPermissions(transition, function (model) {
                    perms = model.get('perms.update');
                    return perms;
                }));

            return promise;
        },

        setupController: function (ctrl, model) {
            this._super(ctrl, model);

            // set breadcrumbs
            var environment = this.get('environment');

            ctrl.set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router'), environment: environment})
                    .addHome()
                    .addWorkspace()
                    .addVault()
                    .addCard()
                    .addText('Edit secret')
            );
        },

        actions: {
            save: function () {
                var notifyError = function (error) {
                    $.notify('Ooops! Something went wrong.', 'error');
                    throw error;
                };

                try {
                    var record = this.get('controller.content');
                    var promise = record
                        .saveRecord()
                        .then(function () {
                            $.notify('Your changes have been saved successfully.', 'success');
                            history.go(-1);
                        }.bind(this))
                        .catch(notifyError);

                    ApplicationLoader.promise(promise);
                } catch (e) {
                    ApplicationLoader.hideLoader();
                    notifyError(e);
                }
            }
        }
    });

Vaultier.SecretEditController = Ember.ObjectController.extend({
    breadcrumbs: null
});

Vaultier.SecretEditView = Ember.View.extend({
    templateName: 'Secret/SecretEdit',
    layoutName: 'Layout/LayoutStandard'
});


Vaultier.SecretTypeBaseView = Ember.View.extend({

    isCreateAction: function() {
        var r =  !(this.get('controller.content.id') > 0);
        return r;
    }.property('controller.content.id')

});

Vaultier.SecretTypeFileView = Vaultier.SecretTypeBaseView.extend ({
    templateName: 'Secret/SecretTypeFile',

    didInsertElement: function () {
        var el = $(this.get('element'));
        var input = el.find('.vlt-secret-type-file');
        var controller = this.get('controller');

        input.on('change', function (e) {

            var files = FileAPI.getFiles(e);
            FileAPI.readAsBinaryString(files[0], function (evt) {
                if (evt.type == 'load') {
                    var data = evt.result;
                    var size = evt.result.length;

                    if (size > 25000) {
                        input.closest('.form-group').addClass('has-error');
                        $.notify('Maximum filesize of 25K exceeded!', 'error');
                    } else {
                        // Success
                        input.closest('.form-group').removeClass('has-error');
                        controller.set('content.blob.filedata', data);
                        controller.set('content.blob.filename', files[0].name);
                        controller.set('content.blob.filesize', files[0].size);
                        controller.set('content.blob.filetype', files[0].type);

                        $(el).find('.vlt-filename').attr('value', files[0].name);

                    }
                }
            })
        })
    }


});

Vaultier.SecretTypeNoteView =Vaultier.SecretTypeBaseView.extend ({
    templateName: 'Secret/SecretTypeNote'
});

Vaultier.SecretTypePasswordView = Vaultier.SecretTypeBaseView.extend ({
    templateName: 'Secret/SecretTypePassword'
});

Vaultier.SecretTypeSelectView = Vaultier.SecretTypeBaseView.extend ({
    templateName: 'Secret/SecretTypeSelect'
});

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


Vaultier.SecretCardNodeView = EmberExt.Tree.TreeNodeView.extend({
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
        return [];
    }
});

Vaultier.SecretVaultNodeView = EmberExt.Tree.TreeNodeView.extend({
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
                    item.set('branch', true);
                });
                return model;
            });
        return nodes;
    }
});

Vaultier.SecretMoveRoute = Ember.Route.extend(
    Vaultier.WorkspaceKeysMixin,
    {
        beforeModel: function () {
            this.checkWorkspaceKeys();
        },

        serialize: function (secret) {
            return {
                secret: secret.id
            };
        },

        model: function (params, transition) {
            var workspace = this.modelFor('Workspace');
            var store = this.get('store');

            var secret = store.find('Secret', params.secret);
            secret
                .then(this.get('auth').checkPermissions(transition, function (model) {
                    perms = model.get('perms.update');
                    return perms
                }));

            var vaults =
                store.
                    find('Vault', {workspace: workspace.get('id')})
                    .then(function (model) {
                        model.forEach(function (item) {
                            item.set('branch', true);
                        });
                        return model;
                    });

            return Ember.RSVP.hash({
                secret: secret,
                vaults: vaults
            });
        },

        setupController: function (ctrl, model) {
            ctrl.set('content', model.secret);
            ctrl.set('treeNodes', model.vaults);

            // set breadcrumbs
            ctrl.set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router'), environment: this.get('environment')})
                    .addHome()
                    .addWorkspace()
                    .addVault()
                    .addCard()
                    .addText('Move secret')
            );
        },

        actions: {

            save: function () {
                var record = this.get('controller.content');
                record.set('card', this.get('controller.selected'));
                record
                    .saveRecord()
                    .then(
                    function () {
                        $.notify('Your secret has been moved successfully.', 'success');
                        history.go(-1);
                    }.bind(this),
                    function () {
                        $.notify('Ooops! Something went wrong.', 'error');
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
    Tree: EmberExt.Tree.TreeView.extend({
        itemViewClass: Vaultier.SecretVaultNodeView
    })

});


//# sourceMappingURL=secret.js.map