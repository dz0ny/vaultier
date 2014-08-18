Vaultier.VaultRolesAdminIndexRoute = Vaultier.RolesAdminIndexRoute.extend(
    Vaultier.WorkspaceKeysMixin,
    {
        beforeModel: function () {
            this.checkWorkspaceKeys();
        },

        setupInviteData: function (params) {
            var vault = this.modelFor('Vault');
            return {
                inviteObject: vault
            }
        },

        setupBlocks: function () {
            return {workspace: true, vault: true}
        },

        setupBreadcrumbs: function () {
            return Vaultier.Breadcrumbs.create({router: this.get('router'), environment: this.get('environment')})
                .addHome()
                .addWorkspace()
                .addVault()
                .addCollaboratorsIndex('Vault.rolesAdminIndex');
        },

        setupInviteRoute: function (models) {
            return {
                inviteRouteName: 'Vault.rolesAdminInvite'
            };
        }

    });


Vaultier.VaultRolesAdminIndexController = Vaultier.RolesAdminIndexController.extend({
});


Vaultier.VaultRolesAdminInviteRoute = Vaultier.RolesAdminInviteRoute.extend(
    Vaultier.WorkspaceKeysMixin,
    {

        beforeModel: function () {
            this.checkWorkspaceKeys();
        },

        /**
         * override this to setup invite workspace and invite to object
         */
        setupInviteData: function (params) {
            var vault = this.modelFor('Vault');
            var workspace = this.modelFor('Workspace');
            return {
                inviteObject: vault,
                inviteParams: { to_vault: vault},
                inviteWorkspace: workspace
            }
        },

        setupBreadcrumbs: function () {
            return Vaultier.Breadcrumbs.create({router: this.get('router'), environment: this.get('environment')})
                .addHome()
                .addWorkspace()
                .addVault()
                .addCollaboratorsIndex('Vault.rolesAdminIndex')
                .addCollaboratorsInvite('Vault.rolesAdminInvite');
        }

    });

Vaultier.VaultRolesAdminInviteController = Vaultier.RolesAdminInviteController.extend({
});
