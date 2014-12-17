Vaultier.DocumentRolesAdminIndexRoute = Vaultier.RolesAdminIndexRoute.extend(
    {
        setupInviteData: function (params) {
            Utils.Logger.log.debug('Vaultier.DocumentRolesAdminIndexRoute setupInviteData');
            var selectedNode = this.get('tree').getSelectedNode();
            return {
                inviteObject: selectedNode
            }
        },

        setupInviteRoute: function (models) {
            return {
                inviteRouteName: 'Card.rolesAdminInvite'
            };
        },

        createToolbar: function () {
            var selectedNode = this.get('tree').getSelectedNode();
            return Vaultier.Toolbar.create({router: this.get('router')})
                .prepareBuilder()
                .addBreadcrumbParentsOfDocument(this.get('tree').getParents(this.get('tree').getSelectedNode()))
                .addBreadcrumbDocument(selectedNode)
                .addBreadcrumbDocumentTeam(selectedNode, true)
        },

        renderTemplate: function () {
            this.render('RolesAdminIndex', {outlet: 'content', controller: this.get('controller')})
        }

    });


Vaultier.DocumentRolesAdminIndexController = Vaultier.RolesAdminIndexController.extend({

    /**
     * @property {Array} needs
     */
    needs: ['Document']

});

