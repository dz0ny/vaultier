/**
 * Vault memberships, because of nested routing in namespace of vault
 */
Vaultier.CardMemberIndexRoute = Vaultier.MemberIndexRoute.extend({

    setupBlocks: function () {
        return {workspace: true, vault: true}
    },

    setupBreadcrumbs: function () {
        return Vaultier.Breadcrumbs.create({router: this.get('router')})
            .addHome()
            .addWorkspace()
            .addVault()
            .addText('Collaborators');
    },

    setupInviteRoute: function (models) {
        return {
            inviteRouteName: 'Card.memberInvite'
        }
    }
});


Vaultier.CardMemberIndexController = Vaultier.MemberIndexController.extend({
});


Vaultier.CardMemberInviteRoute = Vaultier.MemberInviteRoute.extend({

    /**
     * override this to setup invite workspace and invite to object
     */
    setupInviteData: function (params) {
        var vault = this.modelFor('Card');
        var workspace = this.modelFor('Vault');
        return {
            inviteParams: { to_vault: vault},
            inviteWorkspace: workspace
        }
    },

    setupBreadcrumbs: function () {
        return Vaultier.Breadcrumbs.create({router: this.get('router')})
            .addHome()
            .addWorkspace()
            .addVault()
            .addLink('Card.memberIndex', 'Collaborators')
            .addText('Invite');
    }

});

Vaultier.CardMemberInviteController = Vaultier.MemberInviteController.extend({
});
