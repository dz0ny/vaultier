Vaultier.VaultCreateController = VaultierUtils.ObjectModalController.extend({
    modalView: 'VaultCreate'
});

Vaultier.VaultCreateView = Ember.View.extend({
    templateName: 'Vault/Create',

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


