(function(root) {
	require(["configuration"], function(configuration) {
		require.config(configuration);

		require(["ember", "view/index"], function(Ember, view) {
			var app_name = configuration.app_name || "Example Ember-Require Application";

			var core = $.extend({
				LOG_TRANSITIONS: true
			}, view);

			root[app_name] = Application = Ember.Application.create(core);

			Application.Router.map(function() {
				this.resource("index", { path: "/" }),
				this.resource("login")
			});
//
//            Application.deferReadiness();
//
//            $(document).ready(function() {
//               Application.advanceReadiness();
//            });

		});
	});
})(this);