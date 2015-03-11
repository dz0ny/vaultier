import Ember from 'ember';
/* global $ */

//@todo: some mess here session access directly storage driver, should use storage or something else

export default Ember.CoreObject.extend({

    init: function() {
        if (!window.sessionStorage) {
            throw 'Vaultier requires sessionStorage to be supported by browser';
        }
    },

    prefix: 'vaultier.',

    set: function (key, value) {
        Ember.$(document).sessionStorage(this.prefix + key, value);
    },

    get: function (key, def) {
        var val = Ember.$(document).sessionStorage(this.prefix + key);
        if ( (typeof val==='undefined' || val===null) && typeof def!=='undefined') {
            return def;
        }
        return val;
    },

    remove: function (key) {
        return Ember.$(document).sessionStorage(this.prefix + key, null);
    }

});
