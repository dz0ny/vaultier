Po.NS('Vaultier.Layout');

Vaultier.LayoutSecurityBoxView = Ember.View.extend({
    tagName: 'span',
    templateName: 'Layout/SecurityBox'
});

Vaultier.LayoutSecurityBoxController = Ember.Controller.extend({

    auth: null,

    test: 'test',

    init: function() {
        this._super(arguments);
        this.auth = Vaultier.Services.Auth.AuthService.current();
    }

});
