//@todo: document this
ApplicationKernel = {

    run: function () {
        this.Config.parseEnvironment();

        $.Deferred().resolve()
            .then(function () {
                return this.Config.loadApplicationConfig();
            }.bind(this))
            .then(function () {
                return this.Loader.loadApplication();
            }.bind(this))

    },

    namespace: function () {
        var len1 = arguments.length, i = 0, len2, j, main, ns, sub, current;

        for (; i < len1; ++i) {
            main = arguments[i];
            ns = arguments[i].split('.');
            current = window[ns[0]];
            if (current === undefined) {
                current = window[ns[0]] = {};
            }
            sub = ns.slice(1);
            len2 = sub.length;
            for (j = 0; j < len2; ++j) {
                current = current[sub[j]] = current[sub[j]] || {};
            }
        }
        return current;
    }
}

$(document).ready(function () {
    ApplicationKernel.run();
});

