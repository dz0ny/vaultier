Vaultier.VaultMemberIndexRoute = Vaultier.MemberIndexRoute.extend(
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
            return Vaultier.Breadcrumbs.create({router: this.get('router')})
                .addHome()
                .addWorkspace()
                .addVault()
                .addCollaboratorsIndex('Vault.memberIndex');
        },

        setupInviteRoute: function (models) {
            return {
                inviteRouteName: 'Vault.memberInvite'
            }
        }

    });


Vaultier.VaultMemberIndexController = Vaultier.MemberIndexController.extend({
});


Vaultier.VaultMemberInviteRoute = Vaultier.MemberInviteRoute.extend(
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
            return Vaultier.Breadcrumbs.create({router: this.get('router')})
                .addHome()
                .addWorkspace()
                .addVault()
                .addCollaboratorsIndex('Vault.memberIndex')
                .addCollaboratorsInvite('Vault.memberInvite');
        }

    });

Vaultier.VaultMemberInviteController = Vaultier.MemberInviteController.extend({
});
