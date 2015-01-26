Vaultier.DocumentRolesAdminInviteRoute = Vaultier.RolesAdminInviteRoute.extend(
    {
        setupController: function (ctrl, model) {
            this._super(ctrl, model);
            Utils.Logger.log.debug('Vaultier.DocumentRolesAdminInviteRoute setupController');

            var selectedNode = this.get('tree').getSelectedNode();
            this.get('auth').checkPermissionsForNode(selectedNode, Vaultier.dal.model.Role.proto().permissions.INVITE);

            ctrl.get('controllers.Document').set('toolbar', this.createToolbar());
            Utils.Logger.log.debug(ctrl);
        },

        createToolbar: function () {
            var selectedNode = this.get('tree').getSelectedNode();
            return Vaultier.Toolbar.create({router: this.get('router')})
                .prepareBuilder()
                .addBreadcrumbParentsOfDocument(this.get('tree').getParents(this.get('tree').getSelectedNode()))
                .addBreadcrumbDocument(selectedNode)
                .addBreadcrumbDocumentTeam(selectedNode)
                .addBreadcrumbDocumentTeamInvite()
        },

        renderTemplate: function () {
            this.render('RolesAdminInvite', {outlet: 'content', controller: this.get('controller')})
        }

    });

Vaultier.DocumentRolesAdminInviteController = Vaultier.RolesAdminInviteController.extend({

    /**
     * @property {Array} needs
     */
    needs: ['Document']

});

