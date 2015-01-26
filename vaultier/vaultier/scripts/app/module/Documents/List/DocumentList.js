/**
 * @module vaultier-ui-documents
 * @class Vaultier.DocumentListRoute
 * @extends Ember.Route
 */
Vaultier.DocumentListRoute = Ember.Route.extend({

    setupController: function (ctrl, model) {
        Utils.Logger.log.debug('Vaultier.DocumentListRoute setupController');
        this.get('tree').switchToVisibleAllNodes();
        ctrl.get('controllers.Document').set('toolbar', this.createToolbar());
    },

    renderTemplate: function () {
        this.render('DocumentList', {outlet: 'content'});
    },

    createToolbar: function () {
        Utils.Logger.log.debug("createToolbar");
        var selectedNode = this.get('tree').getSelectedNode();
        Utils.Logger.log.debug(selectedNode);

        var toolbar = Vaultier.Toolbar.create({router: this.get('router')})
            .prepareBuilder()
            .addBreadcrumbParentsOfDocument(this.get('tree').getParents(this.get('tree').getSelectedNode()))
            .addBreadcrumbDocument(this.get('tree').getSelectedNode(), true);

        if (selectedNode.get('perms.create')) {
            toolbar.addActionCreate();
        }

        if (selectedNode.get('perms.update')
            || selectedNode.get('perms.delete')) {
            toolbar.addActionSettings();

            if (selectedNode.get('perms.update')) {
                toolbar.addActionSettingsMove();
                toolbar.addActionSettingsEdit();
            }

            if (selectedNode.get('perms.delete')) {
                toolbar.addActionSettingsDelete();
            }
        }

        return toolbar;
    }

});

/**
 * @module vaultier-ui-documents
 * @class Vaultier.DocumentListController
 * @extends Ember.Controller
 */
Vaultier.DocumentListController = Ember.Controller.extend({

    actions: {

        removeNode: function (node) {
            var typeOfRemoveNode = Vaultier.dal.model.Node.proto().types.getByValue(node.get('type')).text;
            var parentNode = node.get('parent');
            this.get('tree')
                .removeNode(node)
                .then(function () {
                    Utils.Logger.log.debug('asdasd');
                    Utils.Logger.log.debug(this.get('controllers.Document').get('currentDocument'));
                    Utils.Logger.log.debug(this.get('tree').getSelectedNode());
                    this.get('controllers.Document').set('currentDocument', parentNode)
                    $.notify('Your ' + typeOfRemoveNode + ' has been deleted successfully.', 'success');

                }.bind(this),

                function (error) {
                    $.notify('Ooops! Something went wrong.', 'error');
                    return null;
                }
            );
        }

    },


    needs: ['Document']
});

/**
 * @module vaultier-ui-documents
 * @class Vaultier.DocumentListView
 * @extends Ember.View
 */
Vaultier.DocumentListView = Ember.View.extend({

    templateName: 'Documents/List/DocumentList',

    didInsertElement: function () {
        this.get('parentView').set('showLeftTreeNodePanel', true);
    }

});
