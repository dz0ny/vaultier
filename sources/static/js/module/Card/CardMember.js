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
            .addCollaboratorsIndex('Card.memberIndex');
    },

    setupInviteRoute: function (models) {
        return {
            inviteRouteName: 'Card.memberInvite'
        }
    },

    setupRoleLevels: function () {
        var levels = Vaultier.Role.proto().roles.toArray().filter(function (item, index) {
            if (item.id == 'CREATE') {
                return false
            }
            return item
        });
        return levels;
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
            .addCollaboratorsIndex('Card.memberIndex')
            .addCollaboratorsInvite('Card.memberInvite');
    },

    setupRoleLevels: function () {
        var levels = Vaultier.Role.proto().roles.toArray().filter(function (item, index) {
            if (item.id == 'CREATE') {
                return false
            }
            return item
        });
        return levels;
    }

});

Vaultier.CardMemberInviteController = Vaultier.MemberInviteController.extend({
});
