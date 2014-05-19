/**
 * Workspace memberships, because of nested routing in namespace of vault
 */
Vaultier.WorkspaceMemberIndexRoute = Vaultier.MemberIndexRoute.extend(
    Vaultier.WorkspaceKeysMixin,
    {
        beforeModel: function () {
            this.checkWorkspaceKeys();
        },

        setupInviteData: function (params) {
            var workspace = this.modelFor('Workspace');
            return {
                inviteObject: workspace
            }
        },

        setupBlocks: function () {
            return {workspace: true}
        },

        setupBreadcrumbs: function () {
            return Vaultier.Breadcrumbs.create({router: this.get('router')})
                .addHome()
                .addWorkspace()
                .addCollaboratorsIndex('Workspace.memberIndex');
        },

        setupInviteRoute: function (models) {
            return {
                inviteRouteName: 'Workspace.memberInvite'
            }
        }
    }
)
;


Vaultier.WorkspaceMemberIndexController = Vaultier.MemberIndexController.extend({
});


Vaultier.WorkspaceMemberInviteRoute = Vaultier.MemberInviteRoute.extend(
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
            return Vaultier.Breadcrumbs.create({router: this.get('router')})
                .addHome()
                .addWorkspace()
                .addCollaboratorsIndex('Workspace.memberIndex')
                .addCollaboratorsInvite('Workspace.memberInvite');
        }

    });

Vaultier.WorkspaceMemberInviteController = Vaultier.MemberInviteController.extend({
});
