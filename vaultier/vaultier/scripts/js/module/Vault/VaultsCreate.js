Vaultier.VaultsCreateRoute = Ember.Route.extend(
    Vaultier.WorkspaceKeysMixin,
    {

        beforeModel: function () {
            this.checkWorkspaceKeys();
        },

        model: function (params, transition) {

            var store = this.get('store');
            var workspace = this.modelFor('Workspace');

            if (!this.get('auth').checkPermissions(transition, function () {
                return workspace.get('perms.create')
            }.bind(this), true)) {
                return;
            }

            // create record
            var vault = store.createRecord('Vault');

                    // load memberships
            var memberships = store
                .find('Role', {to_workspace: workspace.get('id') })
                .then(function (memberships) {
                    return memberships.toArray()
                });

            // return promise for all requests
            return Ember.RSVP.hash({
                vault: vault,
                memberships: memberships
            });

        },

        actions: {
            save: function () {
                var workspace = this.get('workspace');
                var record = this.get('controller.content');
                record.set('workspace', this.get('workspace.id'));

                var promise = record
                    .saveRecord()
                    .then(function () {
                        $.notify('Your vault has been successfully created.', 'success');
                        this.transitionTo('Vault.index', record);
                    }.bind(this))
                    .catch(function (error) {
                        $.notify('Oooups! Something went wrong.', 'error');
                        this.get('errors').logError(error);
                    }.bind(this));

                ApplicationLoader.promise(promise);
            }
        },

        setupController: function (ctrl, model) {
             // set model
            ctrl.set('content', model.vault);
            ctrl.set('memberships', model.memberships);

            // retrieve workspace
            var workspace = this.modelFor('Workspace');
            this.set('workspace', workspace);
            this.get('controller').set('workspace', workspace);

            // set breadcrumbs
            ctrl.set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router'), environment: this.get('environment')})
                    .addHome()
                    .addWorkspace()
                    .addText('Create new vault')
            );

        }
    });

Vaultier.VaultsCreateController = Ember.ObjectController.extend({
    workspace: null,
    breadcrumbs: null,
    env: null
});

Vaultier.VaultsCreateView = Ember.View.extend({
    templateName: 'Vault/VaultsCreate',
    layoutName: 'Layout/LayoutStandard'
});
