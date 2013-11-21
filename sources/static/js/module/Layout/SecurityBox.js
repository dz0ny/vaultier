Po.NS('Vaultier.Layout');

Vaultier.LayoutSecurityBoxView = Ember.View.extend({
    tagName: 'span',
    templateName: 'Layout/SecurityBox',

    actions: {
        logout: function () {
            var auth = Service.Auth.current();
            auth.logout().then(function () {
                $.notify('You have been successfully logged out.', 'success');
                var ctrl = this.get('controller');
                ctrl.transitionToRoute('index');
//                window.location.href = "/";
            }.bind(this));
        }
    },

    didInsertElement: function () {
        var el = Ember.$(this.get('element')).find('.copy-token');
        el.click(function (e) {
            e.preventDefault();
            window.prompt("token", el.attr('href'));
        })

    }

});

Vaultier.LayoutSecurityBoxController = Ember.Controller.extend({

    auth: null,

    init: function () {
        this._super(arguments);
        this.auth = Service.Auth.current();
    }

});
