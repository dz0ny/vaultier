Vaultier.AuthLoginRoute = Ember.Route.extend({

    renderTemplate: function (controller, model) {
        this._super(controller, model);
        this.render('AuthLogin');
    }
});

//will prepare layout mixins which will extend controller to optionalize layout
Vaultier.AuthLoginController = Ember.ObjectController.extend({
    breadcrumbs: Vaultier.utils.Breadcrumbs.create()
        .addLink('Auth.login', 'Login')
})


Vaultier.AuthLoginView = Ember.View.extend({
    templateName: 'Auth/Login',
    layoutName: 'Layout/LayoutStandard',

    didInsertElement: function () {
        var el = $(this.get('element'));
        var input = el.find('.vlt-login-key').get(0);

        $(el).on('change', function (e) {
            var files = FileAPI.getFiles(e);
            FileAPI.readAsText(files[0], function (evt) {
                if (evt.type == 'load') {
                    // Success
                    var text = evt.result;
                    console.log(text)
                } else if (evt.type == 'progress') {
                    var pr = evt.loaded / evt.total * 100;
                    console.log(pr);
                } else {
                    // Error
                }
            })
        })

    },

});

