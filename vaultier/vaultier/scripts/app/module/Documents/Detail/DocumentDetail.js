/**
 * @module vaultier-ui-documents
 * @class Vaultier.DocumentDetailRoute
 * @extends Ember.Route
 */
Vaultier.DocumentDetailRoute = Ember.Route.extend(
    Vaultier.DocumentKeysMixin,
    {

    setupController: function (ctrl, model) {

        this.get('tree').switchToVisibleAllNodes();
        model = this.get('tree').getSelectedNode();
        Utils.Logger.log.debug(model);
        Utils.Logger.log.debug(model.get('type'));
        switch (model.get('type')) {

            case Vaultier.dal.model.Node.proto().types.NOTE.value:
                this.typeTemplate = 'Documents/TypeStatic/DocumentTypeStaticNote';
                this.typeName = "Note";
                break;

            case Vaultier.dal.model.Node.proto().types.PASSWORD.value:
                this.typeTemplate = 'Documents/TypeStatic/DocumentTypeStaticPassword';
                this.typeName = "Password";
                break;

            case Vaultier.dal.model.Node.proto().types.FILE.value:
                this.typeTemplate = 'Documents/TypeStatic/DocumentTypeStaticFile';
                this.typeName = "File";
                break;

            default:
                this.typeTemplate = null;
                this.typeName = null;
        }

        Utils.Logger.log.debug(this.typeTemplate);


        Utils.Logger.log.debug('Vaultier.DocumentDetailRoute setupController');
        Utils.Logger.log.debug(model);

        ctrl.set('typeName', this.typeName);
        ctrl.set('content', model);

        ctrl.get('controllers.Document').set('toolbar', this.createToolbar());

        //check keys
        this.checkNodeKeys();
    },

    renderTemplate: function () {
        this.render('DocumentDetail', {outlet: 'content'});
        this.render(this.typeTemplate, {outlet: 'center', into: 'DocumentDetail'});
    },

    createToolbar: function () {
        var selectedNode = this.get('tree').getSelectedNode();

        var toolbar = Vaultier.Toolbar.create({router: this.get('router')})
            .prepareBuilder()
            .addBreadcrumbParentsOfDocument(this.get('tree').getParents(this.get('tree').getSelectedNode()))
            .addBreadcrumbDocument(this.get('tree').getSelectedNode(), true)

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
 * @class Vaultier.DocumentDetailController
 * @extends Ember.Controller
 */
Vaultier.DocumentDetailController = Ember.Controller.extend({

    /**
     * @property {Array} needs
     */
    needs: ['Document'],

    actions: {
        downloadBlob: function(node) {
            node.get('content')
                .loadBlob()
                .finally(function () {
                    ApplicationKernel.UI.hideLoader();
                })
                .then(function () {
                    var data = node.get('blob.filedata');
                    var type = node.get('blob.filetype');
                    var name = node.get('blob.filename');

                    var byteArray = new Uint8Array(data.length);
                    for (var i = 0; i < data.length; i++) {
                        byteArray[i] = data.charCodeAt(i) & 0xff;
                    }

                    var blob = new Blob([byteArray.buffer], {type: type});
                    saveAs(blob, name);
                }.bind(this));
        }
    }

});

/**
 * @module vaultier-ui-documents
 * @class Vaultier.DocumentDetailView
 * @extends Ember.View
 */
Vaultier.DocumentDetailView = Ember.View.extend({

    /**
     * @property {String} templateName
     */
    templateName: 'Documents/Detail/DocumentDetail',

    didInsertElement: function () {
        this.get('parentView').set('showLeftTreeNodePanel', true);
    },

    typeCss: function () {
        return '/static/vaultier/images/icon-' + this.get('controller.content.typeCss') + '.png';
    }.property('controller.content')

});
