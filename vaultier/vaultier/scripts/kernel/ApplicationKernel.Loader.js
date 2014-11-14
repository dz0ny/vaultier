//@todo: document this
ApplicationKernel.Loader = {

    loaded: 0,
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
                    this.queueFile(resource['url']);
                }
            }.bind(this));
            this.loadQueued();
        }.bind(this));

        return promise;
    },

    loadQueued: function () {
        ApplicationKernel.UI.showLoader();
        for (var i = 0; i < this.loadQueue.length; i++) {
            this.loadQueue[i]();
        }
    },

    queueFile: function (file) {
        this.loadQueue.push(function () {
            head.load(file, function () {
                this.loaded++;
                this.percent = Math.round(this.loaded / this.loadQueue.length * 100);

                ApplicationKernel.UI.showLoaderText(this.percent + '%');

                if (this.loaded == this.loadQueue.length) {
                    ApplicationKernel.UI.hideLoader(1000);
                }
            }.bind(this));
        }.bind(this));
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




