/**
 * @module vaultier-ui-documents
 * @class Vaultier.DocumentMoveRoute
 * @extends Ember.Route
 */
Vaultier.DocumentMoveRoute = Ember.Route.extend({

    setupController: function (ctrl, model) {
        Utils.Logger.log.debug('Vaultier.DocumentMoveRoute setupController');
        Utils.Logger.log.debug(model);

        model = this.get('tree').getSelectedNode();
        this.get('auth').checkPermissionsForNode(model, Vaultier.dal.model.Role.proto().permissions.UPDATE);

        var type = model.get('type');
        var typeName = Vaultier.dal.model.Node.proto().types.getByValue(model.get('type')).text;

        this.get('tree').switchToVisibleJustNodesInOneBranch(model);

        ctrl.set('typeName', typeName);
        ctrl.set('content', this.get('tree').getAllTreeNodes());
        Utils.Logger.log.debug(ctrl.get('content'));
        ctrl.get('controllers.Document').set('toolbar', this.createToolbar(typeName));

        ctrl.set('nodeToMove', model);
        ctrl.set('destinationNode', model.get('parent'));
    },

    renderTemplate: function () {
        this.render('DocumentMove', {outlet: 'content'});
    },

    createToolbar: function (typeName) {
        return Vaultier.Toolbar.create({router: this.get('router')})
            .prepareBuilder()
            .addBreadcrumbParentsOfDocument(this.get('tree').getParents(this.get('tree').getSelectedNode()))
            .addBreadcrumbDocument(this.get('tree').getSelectedNode())
            .addBreadcrumbDocumentMove(typeName)
            .addActionSettings();

    }

});

/**
 * @module vaultier-ui-documents
 * @class Vaultier.DocumentMoveController
 * @extends Ember.Controller
 */
Vaultier.DocumentMoveController = Vaultier.Document.TreeController.extend({

    /**
     * @property {String} treeNodeViewClass
     */
    treeNodeViewClass: 'Vaultier.DocumentTreeNodeView',

    /**
     * @property {Vaultier.DocumentController} treeController
     */
    treeController: function () {
        return this;
    }.property(),

    /**
     * @property treeContent
     */
    treeContent: function () {
        return this.get('content');
    }.property(),

    /**
     * Handler for event when node is changed
     *
     * @param {Vaultier.Document.Node} node
     */
    nodeSelectionStateChanged: function (node) {
        Utils.Logger.log.debug('Vaultier.DocumentController zmena');
        Utils.Logger.log.debug(node);
    },

    actions: {

        changeNode: function (node) {
            Utils.Logger.log.debug(node);
            this.set('destinationNode', node);
        },

        move: function () {
            Utils.Logger.log.debug(this.get('destinationNode'));

//            try {
            var promise = this.get('tree').moveNode(this.get('nodeToMove'), this.get('destinationNode'))
                .then(function () {
                    this.get('destinationNode').set('isOpened', true);
                    this.get('nodeToMove').set('isOpened', true);
                    this.get('tree').setSelectedNode(this.get('nodeToMove'));
                    this.get('controllers.Document')
                        .set('currentDocument', this.get('tree').getSelectedNode());

                    this.get('tree').switchToVisibleAllNodes();

                    if (this.get('nodeToMove.type') == Vaultier.dal.model.Node.proto().types.FOLDER.value) {
                        this.transitionToRoute('Document.list', this.get('nodeToMove.id'));
                    } else {
                        this.transitionToRoute('Document.detail', this.get('nodeToMove.id'));
                    }
                }.bind(this));
            ApplicationKernel.UI.showLoaderUponPromise(promise);
//            } catch (e) {
//                ApplicationKernel.UI.hideLoader();
//                $.notify('Ooops! Something went wrong.', 'error');
//                throw error;
//            }
        }

    },

    /**
     * @property {Array} needs
     */
    needs: ['Document']
});

/**
 * @module vaultier-ui-documents
 * @class Vaultier.DocumentMoveView
 * @extends Ember.View
 */
Vaultier.DocumentMoveView = Ember.View.extend({

    /**
     * @property {String} templateName
     */
    templateName: 'Documents/Move/DocumentMove',

    didInsertElement: function () {
        this.get('parentView').set('showLeftTreeNodePanel', false);
    }

});
