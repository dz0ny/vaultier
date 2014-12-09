/**
 * @module module
 * @submodule module-documents
 * @class Vaultier.DocumentDetailRoute
 * @extends Ember.Route
 */
Vaultier.DocumentDetailRoute = Ember.Route.extend({

    setupController: function (ctrl, model) {

        this.get('tree').switchToVisibleAllNodes();
        model = this.get('tree').getSelectedNode();
        console.log(model);
        console.log(model.get('type'));
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

        console.log(this.typeTemplate);


        console.log('Vaultier.DocumentDetailRoute setupController');
        console.log(model);

        ctrl.set('typeName', this.typeName);
        ctrl.set('content', model);

        ctrl.get('controllers.Document').set('toolbar', this.createToolbar());
    },

    renderTemplate: function () {
        this.render('DocumentDetail', {outlet: 'content'});
        this.render(this.typeTemplate, {outlet: 'center', into: 'DocumentDetail'});
    },

    createToolbar: function () {
        console.log('createToolbar');
        return Vaultier.Toolbar.create({router: this.get('router')})
            .prepareBuilder()
            .addParentsOfDocument(this.get('tree').getParents(this.get('tree').getSelectedNode()))
            .addDocument(this.get('tree').getSelectedNode(), true)
            .addActionSettings();
    }

});

/**
 * @module module
 * @submodule module-documents
 * @class Vaultier.DocumentDetailController
 * @extends Ember.Controller
 */
Vaultier.DocumentDetailController = Ember.Controller.extend({

    /**
     * @property {Array} needs
     */
    needs: ['Document']
});

/**
 * @module module
 * @submodule module-documents
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
