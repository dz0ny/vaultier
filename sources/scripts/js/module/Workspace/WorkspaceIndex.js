Vaultier.WorkspaceKeysMixin = Ember.Mixin.create({

    checkWorkspaceKeys: function () {
        var workspace = this.modelFor('Workspace');
        if (workspace.get('membership.status') != Vaultier.Member.proto().statuses['MEMBER'].value) {
            this.transitionTo('Workspace.noKeys');
            return false;
        }
        return true;
    }

});

Vaultier.WorkspaceRoute = Ember.Route.extend(
    Vaultier.WorkspaceKeysMixin,
    {

        /**
         * @DI service:workspacekey
         */
        workspacekey: null,

        model: function (params, transition) {
            var promise = this.get('store').find('Workspace', params.workspace);

            return promise;
        },

        afterModel: function (workspace, transition) {
            // select working workspace
            this.get('workspacekey').selectWorkspace(workspace);

            // set environment
            this.get('environment').set('workspace', workspace);

            this.checkWorkspaceKeys();
        },

        deactivate: function () {
            this.get('environment').set('workspace', null);
        },

        serialize: function (model) {
            // primitives
            if (typeof model == 'string' || typeof model == 'number') {
                return model;
            }

            return {
                workspace: model.get('slug')
            };
        },

        actions: {
            deleteWorkspace: function (workspace) {
                Vaultier.confirmModal(this, 'Are you sure?', function () {
                    var promise = workspace
                        .deleteRecord()
                        .then(
                            function () {
                                $.notify('Your workspace has been successfully deleted.', 'success');
                                this.transitionTo('Workspaces.select');
                            }.bind(this))
                        .catch(function (error) {
                            $.notify('Oooups! Something went wrong.', 'error');
                            throw error;
                        }.bind(this));

                    ApplicationLoader.promise(promise);

                }.bind(this));
            }
        }
    });

Vaultier.WorkspaceIndexRoute = Ember.Route.extend(
    Vaultier.WorkspaceKeysMixin,
    Ember.Evented,
    {
        beforeModel: function () {
            if (this.checkWorkspaceKeys()) {
                this.transitionTo('Vaults.index');
            }
        }
    });

/**
 * Class represents route when user has no workspacekey. User is redirected to here when he has no workspace key
 * from any page inside workspace
 * @type Ember.Route
 */
Vaultier.WorkspaceNoKeysRoute = Ember.Route.extend({

    /**
     * Service workspacekey is injected by depencency container
     * @DI service:workspacekey
     */
    workspacekey: null,

    /**
     * Method is automatically called when workspace key is transferred
     */
    keysTransfered: function () {
        var workspace = this.get('controller.workspace');
        this.transitionTo('Workspace.index', workspace);
    },

    /**
     * When route is activated bind to workspacekey service keyTransfered event to
     * redirect to workspace index
     */
    activate: function () {
        var workspacekey = this.get('workspacekey');
        workspacekey.on('keyTransfered', this, this.keysTransfered);
    },

    /**
     * Detach from keyTransfered event
     */
    deactivate: function () {
        var workspacekey = this.get('workspacekey');
        workspacekey.off('keyTransfered', this, this.keysTransfered);
    },

    model: function (params, queryParams) {
        var workspace = this.modelFor('Workspace');
        var store = this.get('store');

        // load memberships
        var memberships = store
            .find('Role', {to_workspace: workspace.get('id') })
            .then(function (memberships) {
                return memberships.toArray();
            });

        // return promise for all requests
        return Ember.RSVP.hash({
            workspace: workspace,
            memberships: memberships
        });
    },

    afterModel: function(model, transition) {
        if (model.workspace.get('membership.status') == Vaultier.Member.proto().statuses.MEMBER.value) {
            transition.abort();
            this.transitionTo('Workspace.index');
            $.notify('Your already have valid workspace keys.', 'success');
        }
    },

    setupController: function (ctrl, model) {
        this._super.apply(this, arguments);
        var environment = this.get('environment');
        // set model
        ctrl.set('memberships', model.memberships);
        ctrl.set('workspace', model.workspace);
        environment.set('workspace', model.workspace);

        // set breadcrumbs
        ctrl.set('breadcrumbs',
            Vaultier.Breadcrumbs.create({router: this.get('router'), environment: environment})
                .addHome()
                .addWorkspace()
                .addText('Waiting for keys')
        );
    }
});

Vaultier.WorkspaceNoKeysView = Ember.View.extend({
    templateName: 'Workspace/WorkspaceNoKeys',
    layoutName: 'Layout/LayoutStandard'
});
