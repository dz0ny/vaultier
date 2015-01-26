Vaultier.DocumentEditRoute = Ember.Route.extend(
    Vaultier.DocumentKeysMixin,
    {

        setupController: function (ctrl, model) {
            Utils.Logger.log.debug('Vaultier.DocumentEditController setupController');

            model = this.get('tree').getSelectedNode();
            this.get('auth').checkPermissionsForNode(model, Vaultier.dal.model.Role.proto().permissions.UPDATE);

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

            //check keys
            this.checkNodeKeys();
        },

        createToolbar: function () {
            Utils.Logger.log.debug('createToolbar');
            return Vaultier.Toolbar.create({router: this.get('router')})
                .prepareBuilder()
                .addBreadcrumbParentsOfDocument(this.get('tree').getParents(this.get('tree').getSelectedNode()))
                .addBreadcrumbDocument(this.get('tree').getSelectedNode())
                .addBreadcrumbDocumentEdit(this.typeName)
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

        var el = $(this.get('element'));
        var input = el.find('.vlt-secret-type-file');
        var controller = this.get('controller');
        input.on('change', function (e) {

            var files = FileAPI.getFiles(e);
            FileAPI.readAsBinaryString(files[0], function (evt) {
                if (evt.type == 'load') {
                    var data = evt.result;
                    var size = evt.result.length;

                    if (size > 10000000) {
                        input.closest('.form-group').addClass('has-error');
                        $.notify('Maximum filesize of 10MB exceeded!', 'error');
                    } else {
                        // Success
                        input.closest('.form-group').removeClass('has-error');
                        controller.set('content.content.blob.filedata', data);
                        controller.set('content.content.blob.filename', files[0].name);
                        controller.set('content.content.blob.filesize', files[0].size);
                        controller.set('content.content.blob.filetype', files[0].type);

                        controller.set('content.content.filename', files[0].name);
                        controller.set('content.content.filesize', files[0].size);

                        $(el).find('.vlt-filename').attr('value', files[0].name);

                    }
                }
            }.bind(this))
        }.bind(this))
    },

    filename2: function() {
        return this.get('controller.content.content.filename');
    }.property('content.content.filename')

});