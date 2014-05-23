Vaultier.WorkspaceKeysMixin = Ember.Mixin.create({

    checkWorkspaceKeys: function () {
        workspace = this.modelFor('Workspace');
        if (workspace.get('membership.status') != Vaultier.Member.proto().statuses['MEMBER'].value) {
            this.transitionTo('Workspace.noKeys');
            return false;
        }
        return true
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
            var promise = this.get('store').find('Workspace', params.workspace)

            return promise;
        },

        afterModel: function (workspace, transition) {
            // select working workspace
            this.get('workspacekey').selectWorkspace(workspace)

            // set environments
            // @deprecated
            Service.Environment.current().set('workspace', workspace);

            this.checkWorkspaceKeys()
        },

        deactivate: function () {
            Service.Environment.current().set('workspace', null);
        },

        serialize: function (model) {
            // primitives
            if (typeof model == 'string' || typeof model == 'number') {
                return model
            }

            return {
                workspace: model.get('slug')
            }
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
                            throw error
                        }.bind(this))

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
                this.transitionTo('Vaults.index')
            }
        }
    })

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
     * Method is automatically called when workspace key is transfered
     */
    keysTransfered : function() {
        this.transitionTo('Workspace.index', workspace);
    },

    /**
     * When route is activated bind to workspacekey service keyTransfered event to
     * redirect to workspace index
     */
    activate: function() {
        var workspacekey = this.get('workspacekey');
        workspacekey.on('keyTransfered', this, this.keysTransfered);
    },

    /**
     * Detach from keyTransfered event
     */
    deactivate: function() {
        var workspacekey = this.get('workspacekey');
        workspacekey.off('keyTransfered', this, this.keysTransfered);
    },

    setupController: function (ctrl, model) {
        this._super.apply(this, arguments);

        // set breadcrumbs
        ctrl.set('breadcrumbs',
            Vaultier.Breadcrumbs.create({router: this.get('router')})
                .addHome()
                .addWorkspace()
                .addText('Waiting for keys')
        )
    }
})

Vaultier.WorkspaceNoKeysView = Ember.View.extend({
    templateName: 'Workspace/WorkspaceNoKeys',
    layoutName: 'Layout/LayoutStandard'
});
