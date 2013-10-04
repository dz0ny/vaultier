Po.NS('VaultierUtils');

VaultierUtils.ObjectModalController = Ember.ObjectController.extend({

    actions: {
        commit: function () {
            this.get('content').save().then(this.closeModal.bind(this));
        },

        rollback: function () {
            this.store.deleteRecord(this.get('content')) ;
            this.closeModal();
        }
    },

    closeModal : function() {
        this.route.disconnectOutlet({
            outlet: 'modal'
        })
    },

    openModal: function (options) {
        //@todo: validate here
        //@todo: allow view override

        this.route = options.route;
        this.store = this.route.get('store');
        this.set('content', options.record);

        this.route.render(this.modalView, {
            into: 'application',
            outlet: 'modal',
            controller: this
        });
    }


});
