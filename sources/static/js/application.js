(function (root) {
    require(["configuration"], function (configuration) {
        require.config(configuration);

        require(["view/vaults", "ember", "ember_data"], function (view) {

            var app_name = configuration.app_name || "Example Ember-Require Application";

            var core = $.extend({
                LOG_TRANSITIONS: true
            }, view);

            root[app_name] = Application = Ember.Application.create(core);
            Application.ApplicationAdapter = DS.FixtureAdapter.extend();


            Application.Router.map(function () {
                this.resource("vaults", { path: "/" })
            });

            Application.VaultsRoute = Ember.Route.extend({
                model: function () {
                    return this.store.find('vault');
                }
            });

            Application.Vault = DS.Model.extend({
                title: DS.attr('string'),
                isCompleted: DS.attr('boolean')
            });

            Application.Vault.FIXTURES = [
                {
                    id: 1,
                    title: 'Learn Ember.js',
                    isCompleted: true
                },
                {
                    id: 2,
                    title: '...',
                    isCompleted: false
                },
                {
                    id: 3,
                    title: 'Profit!',
                    isCompleted: false
                }
            ];
//
//            Application.deferReadiness();
//
//            $(document).ready(function() {
//               Application.advanceReadiness();
//            });

        });
    });
})(this);