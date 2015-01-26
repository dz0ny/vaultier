Vaultier.DocumentKeysMixin = Ember.Mixin.create({

    checkNodeKeys: function () {
        Utils.Logger.log.debug("Vaultier.DocumentKeysMixin checkNodeKeys");
        var selectedNode = this.get('tree').getSelectedNode();

        if (selectedNode.get('membership.status') != Vaultier.dal.model.Member.proto().statuses['MEMBER'].value) {
            Utils.Logger.log.debug(selectedNode);
            if (selectedNode.get('parent')) {
                var e = new Error('You do not have an access to this area.');
                e.status = 403;
                throw e;
            }
            this.transitionTo('Document.noKeys');
        }
    }

});
