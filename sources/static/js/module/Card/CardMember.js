Vaultier.CardMemberIndexRoute = Vaultier.MemberIndexRoute.extend({

    setupInviteData: function (params) {
        var card = this.modelFor('Card');
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
            inviteRouteName: 'Card.memberInvite'
        }
    }
});


Vaultier.CardMemberIndexController = Vaultier.MemberIndexController.extend({
});


Vaultier.CardMemberInviteRoute = Vaultier.MemberInviteRoute.extend({


    setupInviteData: function (params) {
        var card = this.modelFor('Card');
        var workspace = this.modelFor('Workspace');
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
            .addCard()
            .addLink('Card.memberIndex', 'Collaborators')
            .addText('Invite');
    }

});

Vaultier.CardMemberInviteController = Vaultier.MemberInviteController.extend({
});
