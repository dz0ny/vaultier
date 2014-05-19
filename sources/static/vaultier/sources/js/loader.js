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
                    'background-image': " url('/static/images/preloader_250x250.gif')",
                    'background-repeat': 'no-repeat',
                    'background-size': ' 150px 150px',
                    'background-position': ' 50% 50%',
                    'position': ' absolute',
                    'top': ' 50%',
                    'left': ' 50%',
                    'text-align': 'center',
                    'vertical-align': ' bottom',
                })

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
                })

            this.loaderEl = overlay
                .append(text)
                .appendTo('body')

            this.loaderElQueue = this.loaderEl.fadeIn(100)
        }
    },

    hideLoader: function (duration) {
        if (this.loaderEl) {
            if (!duration) {
                duration = 100
            }
            this.loaderElQueue
                .fadeOut(duration)
                .queue(function () {
                    this.loaderElQueue = null;
                    this.loaderEl.remove();
                    this.loaderEl = null
                }.bind(this))
        }
    },

    promise: function (promise) {
        this.showLoader();
        return promise
            .then(function (result) {
                this.hideLoader()
                return Ember.RSVP.resolve(result)
            }.bind(this))
            .catch(function(error) {
                this.hideLoader()
                return Ember.RSVP.reject(error);
            }.bind(this))
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
}

$(document).ready(function(){
    $.getJSON('/static/js/includes.json', function(jsonData){
        $.each(jsonData.modules, function(index, obj){
            ApplicationLoader.queueFile(obj['file']);
        });
        ApplicationLoader.loadQueued();
    });
});

