/**
 * Loads resources defined by modules.js
 *
 * @class ApplicationKernel.Loader
 */
ApplicationKernel.Loader = {

    loaded: 0,
    injected: 0,
    percent: 0,
    loadQueue: [],

    loadApplication: function () {
        var url = ApplicationKernel.Config.getIncludesUrl();

        var promise = $.getJSON(url, function (jsonData) {
            $.each(jsonData.resources, function (index, resource) {
                if (ApplicationKernel.Config.environment == null) {
                    ApplicationKernel.Config.environment = jsonData.environment;
                }
                if (this.isResourceIntendedForLoading(resource, ApplicationKernel.Config.environment)) {
                    this.queueFile(resource);
                }
            }.bind(this));
            this.loadQueued();
        }.bind(this));

        return promise;
    },

    loadQueued: function () {
        var deferreds = [];
        this.loaded = 0;

        // load whole queue
        $.each(this.loadQueue, function (idx, resource) {
            deferreds.push(this.loadResource(resource));
        }.bind(this));

        // all done
        return $.when.apply(this, deferreds)
    },

    loadResource: function (resource) {
        ApplicationKernel.UI.showLoader();
        ApplicationKernel.UI.showLoaderText(this.percent + '%');

        var type = null, ele = null;

        if (resource.type == 'js') {
            var ele = document.createElement("script");
            ele.type = "text/javascript";
            ele.src = resource.url;
        }

        if (resource.type == 'css') {
            var ele = document.createElement("link");
            ele.rel = 'stylesheet';
            ele.type = 'text/css'
            ele.href = resource.url;
        }

        if (!ele) {
            throw new Error('Unsupported type $type to load from url $url'.replace('$url', resource.url).replace('$type', resource.type));

        }

        // ASYNC: load in parallel and execute as soon as possible
        ele.async = false;
        // DEFER: load in parallel but maintain execution order
        ele.defer = true;

        // promise
        var promise = $.Deferred()

        // on load
        ele.onload = function () {
                this.loaded++;
                this.percent = Math.round(this.loaded / this.loadQueue.length * 100);
                ApplicationKernel.UI.showLoaderText(this.percent + '%');
                if (this.loaded == this.loadQueue.length) {
                    ApplicationKernel.UI.hideLoader(500);
                }
                promise.resolve(resource);
        }.bind(this);

        // do load - insert to dom and load
        var head = document.head || doc.getElementsByTagName("head")[0];
        head.appendChild(ele);

        return promise;
    },


    queueFile: function (resource) {
        this.loadQueue.push(resource);
    },


    isResourceIntendedForLoading: function (resource, environment) {
        var intended = true;

        intended = intended && !resource.skipLoading;

        if (!resource.environments) {
            throw new Error('Resource {url} has undefined environments list, please check modules.js'.replace('{url}', resource.url))
        }

        intended = intended && ( resource.environments.indexOf('*') > -1 || resource.environments.indexOf(environment) > -1);

        return intended;

    }


};




