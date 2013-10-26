/**
 * Workspace memberships, because of nested routing in namespace of vault
 */
Vaultier.VaultMemberIndexRoute = Vaultier.MemberIndexRoute.extend({

    setupBreadcrumbs: function () {
        return Vaultier.Breadcrumbs.create({router: this.get('router')})
            .addHome()
            .addWorkspace()
            .addText('Collaborators');
    },

    setupInviteRoute: function (models) {
        var workspace = this.modelFor('Vault');
        return {
            inviteRouteName: 'Vault.memberInvite'
        }
    }
});


Vaultier.VaultMemberIndexController = Vaultier.MemberIndexController.extend({
});


Vaultier.VaultMemberInviteRoute = Vaultier.MemberInviteRoute.extend({

    /**
     * override this to setup invite workspace and invite to object
     */
    setupInviteData: function (params) {
        var workspace = this.modelFor('Vault');
        return {
            inviteParams: { to_workspace: workspace},
            inviteWorkspace: workspace
        }
    },

    setupBreadcrumbs: function () {
        return Vaultier.Breadcrumbs.create({router: this.get('router')})
            .addHome()
            .addWorkspace()
            .addLink('Vault.memberIndex', 'Collaborators')
            .addText('Invite');
    }

});

Vaultier.VaultMemberInviteController = Vaultier.MemberInviteController.extend({
});
