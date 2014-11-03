ApplicationKernel.namespace('Service');

Service.Storage = Ember.CoreObject.extend({

    init: function() {
        if (!window.localStorage) {
            throw 'Vaultier requires Local Storage to be supported by your ' +
                'browser. Virtually all modern browsers support this feature. ' +
                'Check that you have a recent version of your browser and try ' +
                'again'
        }
    },

    prefix: 'vaultier.',

    set: function (key, value, ttl) {
        var ttl = ttl || 0;
        $.jStorage.set(this.prefix + key, value);
        $.jStorage.setTTL(this.prefix + key, ttl);
    },

    get: function (key, def) {
        var val = $.jStorage.get(this.prefix + key);
        if ( (typeof val=='undefined' || val===null) && typeof def!='undefined') {
            return def;
        }
        return val;
    },

    remove: function (key) {
        return $.jStorage.deleteKey(this.prefix + key);
    }

});
