Vaultier.DocumentTypeEditableFolderView = Ember.View.extend({
    templateName: 'Documents/TypeEditable/DocumentTypeEditableFolder'
});

Vaultier.DocumentTypeEditableFileView = Ember.View.extend({
    templateName: 'Documents/TypeEditable/DocumentTypeEditableFile',

    didInsertElement: function () {
        var el = $(this.get('element'));
        var input = el.find('.vlt-secret-type-file');
        var controller = this.get('controller');

        input.on('change', function (e) {

            var files = FileAPI.getFiles(e);
            FileAPI.readAsBinaryString(files[0], function (evt) {
                if (evt.type == 'load') {
                    var data = evt.result;
                    var size = evt.result.length;

                    if (size > 25000) {
                        input.closest('.form-group').addClass('has-error');
                        $.notify('Maximum filesize of 25K exceeded!', 'error');
                    } else {
                        // Success
                        input.closest('.form-group').removeClass('has-error');
                        controller.set('content.blob.filedata', data);
                        controller.set('content.blob.filename', files[0].name);
                        controller.set('content.blob.filesize', files[0].size);
                        controller.set('content.blob.filetype', files[0].type);

                        $(el).find('.vlt-filename').attr('value', files[0].name);

                    }
                }
            })
        })
    }


});

Vaultier.DocumentTypeEditableNoteView = Ember.View.extend({
    templateName: 'Documents/TypeEditable/DocumentTypeEditableNote'
});

Vaultier.DocumentTypeEditablePasswordView = Ember.View.extend({
    templateName: 'Documents/TypeEditable/DocumentTypeEditablePassword'
});
