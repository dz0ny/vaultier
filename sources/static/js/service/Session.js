Po.NS('Service');

Service.Session = Ember.CoreObject.extend({

    init: function() {
        if (!window.sessionStorage) {
            throw 'Vaultier requires sessionStorage to be supported by browser'
        }
    },

    prefix: 'vaultier.',

    set: function (key, value) {
        Ember.$(document).sessionStorage(this.prefix + key, value);
    },

    get: function (key, def) {
        var val = Ember.$(document).sessionStorage(this.prefix + key);
        if ( (typeof val=='undefined' || val===null) && typeof def!='undefined') {
            return def;
        }
        return val;
    },

    remove: function (key) {
        return Ember.$(document).sessionStorage(this.prefix + key, null);
    }

});
Service.Session.reopenClass(Utils.Singleton);