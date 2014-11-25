ApplicationKernel.namespace('Service');

Service.Messaging = Ember.Object.extend(
    Ember.Evented,
    {
//        socket: io,

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

            return Ember.RSVP.resolve()
                .then(function () {
//                    this.socket.connect();
                })
        },
        disconnect: function() {
            return Ember.RSVP.resolve()
                .then(function () {
//                    this.socket.disconnect();
                })
        },
        reconnect: function() {
            return this.disconnect().then(this.connect())
        }
    }
);
