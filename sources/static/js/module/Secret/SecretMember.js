/**
 * Card memberships, because of nested routing in namespace of secret
 */
Vaultier.SecretMemberIndexRoute = Vaultier.MemberIndexRoute.extend({

    setupInviteData: function (params) {
        var card = this.modelFor('Secret');
        return {
            inviteObject: card
        }
    },

    setupBlocks: function () {
        return {workspace: true, vault: true, card: true}
    },

    setupBreadcrumbs: function () {
        return Vaultier.Breadcrumbs.create({router: this.get('router')})
            .addHome()
            .addWorkspace()
            .addVault()
            .addCard()
            .addText('Collaborators');
    },

    setupInviteRoute: function (models) {
        return {
            inviteRouteName: 'Secret.memberInvite'
        }
    }
});


Vaultier.SecretMemberIndexController = Vaultier.MemberIndexController.extend({
});


Vaultier.SecretMemberInviteRoute = Vaultier.MemberInviteRoute.extend({


    setupInviteData: function (params) {
        var card = this.modelFor('Secret');
        var workspace = this.modelFor('Vault');
        return {
            inviteObject: card,
            inviteParams: { to_card: card},
            inviteWorkspace: workspace
        }
    },

    setupBreadcrumbs: function () {
        return Vaultier.Breadcrumbs.create({router: this.get('router')})
            .addHome()
            .addWorkspace()
            .addVault()
            .addLink('Secret.memberIndex', 'Collaborators')
            .addText('Invite');
    }

});

Vaultier.SecretMemberInviteController = Vaultier.MemberInviteController.extend({
});
