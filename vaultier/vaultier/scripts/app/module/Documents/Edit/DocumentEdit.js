Vaultier.DocumentEditRoute = Ember.Route.extend(
    {

        setupController: function (ctrl, model) {
            Utils.Logger.log.debug('Vaultier.DocumentEditController setupController');

            var model = this.get('tree').getSelectedNode();

            switch (model.get('type')) {

                case Vaultier.dal.model.Node.proto().types.FOLDER.value:
                    this.typeTemplate = 'Documents/TypeEditable/DocumentTypeEditableFolder';
                    this.typeName = "Folder";
                    break;

                case Vaultier.dal.model.Node.proto().types.NOTE.value:
                    this.typeTemplate = 'Documents/TypeEditable/DocumentTypeEditableNote';
                    this.typeName = "Note";
                    break;

                case Vaultier.dal.model.Node.proto().types.PASSWORD.value:
                    this.typeTemplate = 'Documents/TypeEditable/DocumentTypeEditablePassword';
                    this.typeName = "Password";
                    break;

                case Vaultier.dal.model.Node.proto().types.FILE.value:
                    this.typeTemplate = 'Documents/TypeEditable/DocumentTypeEditableFile';
                    this.typeName = "File";
                    break;

                default:
                    this.typeTemplate = null;
                    this.typeName = null;
            }
            Utils.Logger.log.debug(model);

            ctrl.set('typeName', this.typeName);
            ctrl.set('content', model);

            ctrl.get('controllers.Document').set('toolbar', this.createToolbar());
        },

        createToolbar: function () {
            Utils.Logger.log.debug('createToolbar');
            return Vaultier.Toolbar.create({router: this.get('router')})
                .prepareBuilder()
                .addParentsOfDocument(this.get('tree').getParents(this.get('tree').getSelectedNode()))
                .addDocument(this.get('tree').getSelectedNode())
                .addDocumentEdit(this.typeName)
        },

        renderTemplate: function () {
            this.render('DocumentEdit', {outlet: 'content'});
            this.render(this.typeTemplate, {outlet: 'center', into: 'DocumentEdit'});
        },

        actions: {
            submit: function () {
                var record = this.get('controller.content');
                var notifyError = function (error) {
                    $.notify('Ooops! Something went wrong.', 'error');
                    throw error;
                };

                try {
                    var promise = record.get('content')
                        .saveRecord()
                        .then(function (response) {
                            $.notify('Your secret has been created successfully.', 'success');
                            if (record.get('type') == Vaultier.dal.model.Node.proto().types.FOLDER.value) {
                                this.transitionTo('Document.list', record.get('id'));
                            } else {
                                this.transitionTo('Document.detail', record.get('id'));
                            }

                        }.bind(this))
                        .catch(notifyError);

                    ApplicationKernel.UI.showLoaderUponPromise(promise);
                } catch (e) {
                    ApplicationKernel.UI.hideLoader();
                    notifyError(e);
                }
            }
        }

    });

Vaultier.DocumentEditController = Ember.Controller.extend({
    submitButtonShown: false,
    needs: ['Document']
});

Vaultier.DocumentEditView = Ember.View.extend({
    templateName: 'Documents/Edit/DocumentEdit',

    didInsertElement: function () {
        this.get('parentView').set('showLeftTreeNodePanel', false);
    }

});