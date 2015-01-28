/**
 * @module vaultier-ui-documents
 * @class Vaultier.DocumentsNoNodesRoute
 * @extends Ember.Route
 */
Vaultier.DocumentsNoNodesRoute = Ember.Route.extend({

    setupController: function (ctrl, model) {
        Utils.Logger.log.debug('Vaultier.DocumentsNoNodesRoute setupController');
        ctrl.set('toolbar', this.createToolbar());
        ApplicationKernel.UI.hideLoader();
    },

    renderTemplate: function () {
        this.render('DocumentsNoNodes');
    },

    createToolbar: function () {
        Utils.Logger.log.debug("createToolbar");
        return Vaultier.Toolbar.create({router: this.get('router')})
            .prepareBuilder()
    }

});

/**
 * @module vaultier-ui-documents
 * @class Vaultier.DocumentsNoNodesController
 * @extends Ember.Controller
 */
Vaultier.DocumentsNoNodesController = Ember.Controller.extend({

    needs: ['Documents']

});

/**
 * @module vaultier-ui-documents
 * @class Vaultier.DocumentsNoNodesView
 * @extends Ember.View
 */
Vaultier.DocumentsNoNodesView = Ember.View.extend({

    templateName: 'Documents/NoNodes/DocumentsNoNodes',
    layoutName: 'Layout/LayoutStandard'

});
