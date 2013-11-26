Vaultier.VaultModalView = Ember.View.extend({
    templateName: 'Vault/Modal',

    didInsertElement: function () {
        this.$('.modal').modal('show');

    },
    willDestroyElement: function () {
        // because of bootstrap modal animation we have to move modal out of
        // outlet which is going to be destroyed immidiatelly
        var modal = this.$('.modal');
        modal.appendTo($('body'));
        modal.modal('hide');
    }

});


