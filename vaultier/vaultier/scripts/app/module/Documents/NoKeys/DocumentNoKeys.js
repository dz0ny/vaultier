/**
 * @module vaultier-ui-documents
 * @class Vaultier.DocumentNoKeysRoute
 * @extends Ember.Route
 */
Vaultier.DocumentNoKeysRoute = Ember.Route.extend({

    setupController: function (ctrl, model) {
        Utils.Logger.log.debug('Vaultier.DocumentNoKeysRoute setupController');
        this.get('tree').switchToVisibleAllNodes();
        ctrl.get('controllers.Document').set('toolbar', this.createToolbar());
    },

    renderTemplate: function () {
        this.render('DocumentNoKeys', {outlet: 'content'});
    },

    createToolbar: function () {
        Utils.Logger.log.debug("createToolbar");
        var selectedNode = this.get('tree').getSelectedNode();
        Utils.Logger.log.debug(selectedNode);

        return Vaultier.Toolbar.create({router: this.get('router')})
            .prepareBuilder()
            .addBreadcrumbParentsOfDocument(this.get('tree').getParents(this.get('tree').getSelectedNode()))
            .addBreadcrumbDocument(this.get('tree').getSelectedNode(), true);
    }

});

/**
 * @module vaultier-ui-documents
 * @class Vaultier.DocumentNoKeysController
 * @extends Ember.Controller
 */
Vaultier.DocumentNoKeysController = Ember.Controller.extend({

    needs: ['Document']

});

/**
 * @module vaultier-ui-documents
 * @class Vaultier.DocumentNoKeysView
 * @extends Ember.View
 */
Vaultier.DocumentNoKeysView = Ember.View.extend({

    templateName: 'Documents/NoKeys/DocumentNoKeys',

    didInsertElement: function () {
        this.get('parentView').set('showLeftTreeNodePanel', true);
    }

});
