Vaultier.WorkspacesRoute = Ember.Route.extend(
    {

        beforeModel: function (transition) {


            // only authenticated user can access
            if (!this.get('auth').checkAuthenticatedOrLogin(transition)) {
                return false;
            }

            // if any invitations store in session, user will be redirected
            if (this.get('invitations').hasInvitationsInSession()) {
                transition.abort();
                var url = transition.router.generate('Invitation.accept');
                this.router.replaceWith(url);
                return;
            }
        }


    });

Vaultier.WorkspacesIndexRoute = Ember.Route.extend(
    {
        model: function (params, transition) {
            var store = this.get('store');
            var promise = store
                .find('Workspace')
                .then(function (workspaces) {
                    if (workspaces.get('length') == 1) {
                        var workspace = workspaces.objectAt(0);
                        this.transitionTo('Workspace.index', workspace.get('slug'));
                    } else {
                        this.transitionTo('Workspaces.select');
                    }
                }.bind(this));

            return promise;
        }

    });


Vaultier.WorkspacesSelectRoute = Ember.Route.extend(
    {

        model: function () {
            var store = this.get('store');
            var promise = store.find('Workspace');
            return promise;
        },

        setupController: function (ctrl, model) {
            this._super(ctrl, model);

            ctrl.set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router'), environment: this.get('environment')})
                    .addHome()
                    .addText('List of workspaces', '/static/vaultier/images/icon-home-grey.png')
            );
        },

        renderTemplate: function () {
            this.render('WorkspacesIndex');
        }
    });


Vaultier.WorkspacesIndexView = Ember.View.extend({
    templateName: 'Workspace/WorkspacesIndex',
    layoutName: 'Layout/LayoutStandard'
});

Vaultier.WorkspacesIndexItemView = Ember.View.extend({
    templateName: 'Workspace/WorkspacesIndexItem'
});

Vaultier.WorkspacesIndexWithoutKeysView = Ember.View.extend({
    templateName: 'Workspace/WorkspacesIndexWithoutKeys'
});


Vaultier.WorkspacesCreateRoute = Ember.Route.extend({
    actions: {
        save: function () {
            var record = this.get('controller.content');
            var promise = record.saveRecord()
                .then(
                    function () {
                        $.notify('You workspace has been created successfully.', 'success');
                        this.transitionTo('Workspace.index', record.get('slug'));
                    }.bind(this))

                .catch(function (error) {
                    $.notify('Ooops! Something went wrong.', 'error');
                    this.get('errors').logError(error);
                }.bind(this));

            ApplicationLoader.promise(promise);

            return promise;
        }
    },

    setupController: function (ctrl, model) {
        this._super(ctrl, model);

        // set breadcrumbs
        ctrl.set('breadcrumbs',
            Vaultier.Breadcrumbs.create({router: this.get('router'), environment: this.get('environment')})
                .addHome()
                .addText('Create new workspace')
        );
    },

    model: function (params) {
        var store = this.get('store');
        var record = store.createRecord('Workspace');
        return record;
    }

});

Vaultier.WorkspacesCreateController = Ember.ObjectController.extend({
    breadcrumbs: null
});

Vaultier.WorkspacesCreateView = Ember.View.extend({
    templateName: 'Workspace/WorkspacesCreate',
    layoutName: 'Layout/LayoutStandard'
});


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
                                $.notify('Your workspace has been deleted successfully.', 'success');
                                this.transitionTo('Workspaces.select');
                            }.bind(this))
                        .catch(function (error) {
                            $.notify('Ooops! Something went wrong.', 'error');
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


Vaultier.WorkspaceEditRoute = Ember.Route.extend(
    Vaultier.WorkspaceKeysMixin,
    {

        beforeModel: function() {
            this.checkWorkspaceKeys();
        },

        model: function (params, transition) {
            var workspace = this.modelFor('Workspace');

            if (!this.get('auth').checkPermissions(transition, function () {
                return workspace.get('perms.update')
            }.bind(this), true)) {
                return;
            }

            return workspace;
        },

        setupController: function (ctrl, model) {
            this._super(ctrl, model);

            // set breadcrumbs
            ctrl.set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router'), environment: this.get('environment')})
                    .addHome()
                    .addWorkspace()
                    .addText('Edit workspace')
            )
        },

        actions: {
            save: function () {
                var record = this.get('controller.content');
                var promise = record
                    .saveRecord()
                    .then(function () {
                        $.notify('Your changes have been saved successfully.', 'success');
                        history.go(-1);
                    }.bind(this))

                    .catch(function (error) {
                        $.notify('Ooops! Something went wrong.', 'error');
                        this.get('errors').logError(error);
                    }.bind(this));

                ApplicationLoader.promise(promise);
            }
        }
    });

Vaultier.WorkspaceEditController = Ember.ObjectController.extend({
    breadcrumbs: null
});

Vaultier.WorkspaceEditView = Ember.View.extend({
    templateName: 'Workspace/WorkspaceEdit',
    layoutName: 'Layout/LayoutStandard'
});


/**
 * Workspace memberships, because of nested routing in namespace of vault
 */
Vaultier.WorkspaceMixin = Em.Mixin.create({
        beforeModel: function () {
            this.checkWorkspaceKeys();
        },

        setupInviteData: function (params) {
            var workspace = this.modelFor('Workspace');
            return {
                inviteObject: workspace
            };
        },

        setupBlocks: function () {
            return {workspace: true}
        },

        setupBreadcrumbs: function () {
            return Vaultier.Breadcrumbs.create({router: this.get('router'), environment: this.get('environment')})
                .addHome()
                .addWorkspace()
                .addRolesAdminIndex('Workspace.rolesAdminIndex');
        },

        setupInviteRoute: function (models) {
            return {
                inviteRouteName: 'Workspace.rolesAdminInvite'
            };
        }
    });

Vaultier.WorkspaceRolesAdminIndexRoute = Vaultier.RolesAdminIndexRoute.extend(
    Vaultier.WorkspaceKeysMixin,
    Vaultier.WorkspaceMixin
);


Vaultier.WorkspaceRolesAdminIndexController = Vaultier.RolesAdminIndexController.extend({
});


Vaultier.WorkspaceRolesAdminInviteRoute = Vaultier.RolesAdminInviteRoute.extend(
    Vaultier.WorkspaceKeysMixin,
    {

        beforeModel: function () {
            this.checkWorkspaceKeys();
        },

        setupInviteData: function (params) {
            var workspace = this.modelFor('Workspace');
            return {
                inviteObject: workspace,
                inviteParams: { to_workspace: workspace},
                inviteWorkspace: workspace
            }
        },

        setupBreadcrumbs: function () {
            return Vaultier.Breadcrumbs.create({router: this.get('router'), environment: this.get('environment')})
                .addHome()
                .addWorkspace()
                .addRolesAdminIndex('Workspace.rolesAdminIndex')
                .addRolesAdminInvite('Workspace.rolesAdminInvite');
        }

    });

Vaultier.WorkspaceRolesAdminInviteController = Vaultier.RolesAdminInviteController.extend({
});


'use strict';

Vaultier.WorkspaceRolesAdminManagementRoute = Vaultier.RolesAdminManagementRoute.extend(
    Vaultier.WorkspaceKeysMixin,
    Vaultier.WorkspaceMixin);

Vaultier.WorkspaceRolesAdminManagementController = Vaultier.RolesAdminManagementController.extend({});

//# sourceMappingURL=workspace.js.map