Vaultier.SecretTypeFileView = Ember.View.extend({
    templateName: 'Secret/SecretTypeFile',

    didInsertElement: function () {
        var el = $(this.get('element'));
        var input = el.find('.vlt-secret-type-file');
        var controller = this.get('controller');

        input.on('change', function (e) {

            var files = FileAPI.getFiles(e);
            FileAPI.readAsText(files[0], function (evt) {
                if (evt.type == 'load') {
                    var data = evt.result;

                    var byteArray = []
                    for (var offset = 0; offset < data.length; offset++) {
                        byteArray[offset] = data.charCodeAt(offset);
                    }
                    console.log(byteArray);

                    // Success
                    controller.set('content.blob.plain', data);
                    controller.set('content.filename', files[0].name);
                    controller.set('content.filesize', files[0].size);
                    controller.set('content.filetype', files[0].type);
                }
            })
        })
    }


});

Vaultier.SecretTypeNoteView = Ember.View.extend({
    templateName: 'Secret/SecretTypeNote'
});

Vaultier.SecretTypePasswordView = Ember.View.extend({
    templateName: 'Secret/SecretTypePassword'
});

Vaultier.SecretTypeSelectView = Ember.View.extend({
    templateName: 'Secret/SecretTypeSelect'
});