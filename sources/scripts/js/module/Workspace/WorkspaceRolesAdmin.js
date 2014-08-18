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
                .addCollaboratorsIndex('Workspace.rolesAdminIndex');
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
                .addCollaboratorsIndex('Workspace.rolesAdminIndex')
                .addCollaboratorsInvite('Workspace.rolesAdminInvite');
        }

    });

Vaultier.WorkspaceRolesAdminInviteController = Vaultier.RolesAdminInviteController.extend({
});
