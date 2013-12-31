ApplicationLoader = {

    loaded: 0,
    percent: 0,
    loadQueue: [],
    loaderEl: null,
    loaderElQueue: null,

    showLoader: function () {
        if (!this.loaderEl) {
            this.loaderEl = $('<div />')
            this.loaderElQueue = this.loaderEl
                .addClass('vlt-loading-overlay')
                .css({'display': 'none'})
                .html('<div class="vlt-text" />')
                .appendTo('body')
                .fadeIn(100)
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

    showLoaderText: function (text) {
        if (this.loaderEl) {
            this.loaderEl.find('.vlt-text').html(text);
        }
    },

    ready: function (fn) {
        head.ready(function () {
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