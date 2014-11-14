ApplicationKernel.namespace('Service');

Service.Messaging = Ember.Object.extend(
    Ember.Evented,
    {
        setAuthenticationToken: function (token) {
            var id = null;

            if (token) {
                this.trigger('keyCreated', id);
                this.trigger('keyChanged', id);
            }else{
                this.trigger('keyRemoved', id);
            }
        },
        connect: function() {
            var id = null;

            this.trigger('nodeCreated', id);
            this.trigger('nodeChanged', id);
            this.trigger('nodeRemoved', id);
        },
        disconnect: function() {
        },
        reconnect: function() {

        }
    }
);
