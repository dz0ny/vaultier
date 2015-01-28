Vaultier.PasswordFieldComponent = Ember.Component.extend({
    layoutName: 'Layout/PasswordField',
    actions: {
        generatePassword: function() {
            var randomPassword = Utils.Security.generatePassword();
            this.set('value',randomPassword);
        }
    }
});
