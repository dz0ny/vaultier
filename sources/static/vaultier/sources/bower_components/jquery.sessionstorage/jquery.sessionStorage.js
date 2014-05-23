/**
 * jQuery sessionStorage
 *
 * Copyright (c) 2012 Ca-Phun Ung <caphun at yelotofu dot com>
 * Licensed under the MIT (MIT-LICENSE.txt) license.
 *
 * http://github.com/caphun/jquery.sessionStorage/
 *
 * Plugin to handle sessionStorage like data.
 *
 * TODO: fallback to $.data, & dom-key attachment
 *
 */

;(function( $, window, document, undefined ) {

    // cached values
    var pluginName = 'sessionStorage',
        hasSessionStorage = false;

    // detect sessionStorage support, see: http://dustindiaz.com/javascript-cache-provider
    try {
      hasSessionStorage = ('sessionStorage' in window) && window['sessionStorage'] !== null;
    } catch (ex) {
      // do nothing
    }

    $.fn[pluginName] = function(options) {
        var args = arguments, values = [];

        this.each(function() {
            var widget = $.sessionStorage.getInstance(this, options);
            if (args.length === 1 && typeof args[0] === 'string') {
                values.push(widget.get(args[0]));
            } else if (args.length === 2) {
                // first try a method failing that set the value
                try {
                    widget[args[0]](args[1]);
                } catch (ex) {
                    widget.set(args[0], args[1]);
                }

            }
        });

        // there must be a better way!
        if (values.length === 1) {
            return values[0];
        } else if (values.length > 1) {
            return values;
        } else {
            return this;
        }
    }

    // wrapper for the destroy method
    $.fn.removeSessionStorage = function(key) {
        return this.sessionStorage('destroy', key);
    }

    $.sessionStorage = function(elem, options) {
        this.options = $.extend(true, {}, $.sessionStorage.defaults, options);
        this.element = $(elem);
        this.init();
    }

    $.sessionStorage.getInstance = function(elem, options) {
        return ($.sessionStorage.initialized(elem))
            ? $(elem).data('widget.'+pluginName)
            : new $.sessionStorage(elem, options);
    }

    $.sessionStorage.initialized = function (elem) {
        var init = $( elem).data('init.'+pluginName);
        return init !== undefined && init !== null ? true : false;
    }

    $.sessionStorage.defaults = {
        // empty
    }

    $.sessionStorage.prototype = {
        init: function() {
        },
        set: function(k, v) {
            hasSessionStorage && sessionStorage.setItem(k, JSON.stringify(v));
        },
        get: function(k) {
            return hasSessionStorage ? JSON.parse(sessionStorage.getItem(k)) : null;
        },
        destroy: function(k) {
            hasSessionStorage && sessionStorage.removeItem(k);
        }
    }

})( jQuery, window, document );
