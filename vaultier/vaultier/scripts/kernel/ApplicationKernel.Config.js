//@todo: document this
ApplicationKernel.Config = {

    environment: null,

    applicationConfig: {},

    loadApplicationConfig: function() {
        var url = this.getApplicationConfigUrl();

        var promise = $.getJSON(url, function (jsonData) {
            this.applicationConfig = jsonData;
        }.bind(this));
        return promise;
    },

    parseEnvironment: function () {
        var environment = null;

        var parseUrl = function (url) {
            var aURL = url || window.location.href;
            var vars = {};
            var hashes = aURL.slice(aURL.indexOf('#') + 1).split('?');
            if (hashes.length > 1) {
                vars['page'] = hashes[0];
                hashes = hashes[1].split('&');
            } else {
                hashes = hashes[0].split('&');
            }

            for (var i = 0; i < hashes.length; i++) {
                var hash = hashes[i].split('=');
                if (hash.length > 1) {
                    vars[hash[0]] = hash[1];
                } else {
                    vars[hash[0]] = null;
                }
            }
            return vars;
        }

        // read environment from url
        var params = parseUrl();
        if (params.environment) {
            environment = params.environment;
        }

        this.environment = environment;

        return this.environment;
    },

    getApplicationConfigUrl: function() {
        //@todo: parse this from html script tag
        var url = '/api/config/';
        return url;
    },


    getIncludesUrl: function () {
        //@todo: parse this from html script tag
        var url = '/static/vaultier/includes.json';

        return url;
    }


}