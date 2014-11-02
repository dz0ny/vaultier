Vaultier.PasswordFieldComponent = Ember.Component.extend({
    layoutName: 'Layout/PasswordField',
    actions: {
        generatePassword: function() {
            var randomPassword = Vaultier.EncryptedModel.generatePassword();
            this.set('value',randomPassword);
        }
    }
});
