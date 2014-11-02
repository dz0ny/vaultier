ApplicationLoader = {

    loaded: 0,
    percent: 0,
    loadQueue: [],
    loaderEl: null,
    loaderElQueue: null,

    showLoader: function () {

        if (!this.loaderEl) {

            var text = $('<div />')
                .addClass("vlt-text")
                .css({
                    'color': ' #000000',
                    'font-family': '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    'font-size': ' 30px',
                    'font-weight': ' bolder',
                    'width': ' 300px',
                    'height': ' 300px',
                    'line-height': ' 300px',
                    'margin-left': ' -150px',
                    'margin-top': ' -150px',
                    'background-image': " url('/static/vaultier/images/preloader_250x250.gif')",
                    'background-repeat': 'no-repeat',
                    'background-size': ' 150px 150px',
                    'background-position': ' 50% 50%',
                    'position': ' absolute',
                    'top': ' 50%',
                    'left': ' 50%',
                    'text-align': 'center',
                    'vertical-align': ' bottom'
                });

            var overlay = $('<div />')
                .addClass('vlt-loading-overlay')
                .css({
                    'z-index': '2000',
                    'opacity': '0.5',
                    'background-color': '#FFFFFF',
                    'position': 'fixed',
                    'top': '0',
                    'left': '0',
                    'width': '100%',
                    'height': '100%'
                });

            this.loaderEl = overlay
                .append(text)
                .appendTo('body');

            this.loaderElQueue = this.loaderEl.fadeIn(100);
        }
        $('.vlt-loading-overlay').trigger('ApplicationLoaderShow');
    },

    hideLoader: function (duration) {

        if (this.loaderEl) {
            if (!duration) {
                duration = 500
            }
            this.loaderElQueue
                .fadeOut(duration)
                .queue(function () {
                    this.loaderElQueue = null;
                    this.loaderEl.remove();
                    this.loaderEl = null;
                    $('.vlt-loading-overlay').trigger('ApplicationLoaderHide');
                }.bind(this))
        }
        ;
    },

    promise: function (promise) {
        this.showLoader();
        return promise
            .then(function (result) {
                this.hideLoader()
                return Ember.RSVP.resolve(result)
            }.bind(this))
            .catch(function (error) {
                this.hideLoader()
                return Ember.RSVP.reject(error);
            }.bind(this));
    },

    showLoaderText: function (text) {
        if (this.loaderEl) {
            this.loaderEl.find('.vlt-text').html(text);
        }
    },

    ready: function (fn) {
        head.ready(function () {
            console.log('loaded');
            this.percent = 0;
            this.loaded = 0;
            this.loadQueue = [];
            this.hideLoader(1000);
            fn()
        }.bind(this));
    },

    onLoadProgress: function () {
        this.showLoaderText(this.percent + '%');
    },

    loadQueued: function () {
        this.showLoader();
        for (var i = 0; i < this.loadQueue.length; i++) {
            this.loadQueue[i]();
        }
    },

    queueFile: function (file) {
        this.loadQueue.push(function () {
            head.load(file, function () {
                this.loaded++
                this.percent = Math.round(this.loaded / this.loadQueue.length * 100)
                this.onLoadProgress();
            }.bind(this));
        }.bind(this));
    }
};

$(document).ready(function () {
    var environment = 'default';

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

    var intendedForLoading = function (resource) {
        var intended = true;

        intended = intended && !resource.skipLoading;

        if (!resource.environments) {
            throw new Error('Resource {url} has undefined environments list, please check modules.js'.replace('{url}', resource.url))
        }

        intended = intended && ( resource.environments.indexOf('*') > -1 || resource.environments.indexOf(environment) > -1);

        return intended;

    }

    // read environment from url
    var params = parseUrl();
    if (params.environment) {
        environment = params.environment;
    }


    $.getJSON('/static/vaultier/includes.json', function (jsonData) {
        $.each(jsonData.resources, function (index, resource) {
            if (intendedForLoading(resource)) {
                ApplicationLoader.queueFile(resource['url']);
            }
        });
        ApplicationLoader.loadQueued();
    });
});

