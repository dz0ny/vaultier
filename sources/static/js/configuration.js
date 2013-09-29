define({
	app_name: "Demo Ember-Require Application",
	shim: {
		"ember": {
			deps: ["handlebars", "jquery"],
			exports: "Ember"
		},
        "ember_data": {
            deps: ["ember"],
            exports: "DS"
        }
	},
	paths: {
		"template": "../hbs",
		"text": "../lib/requirejs.text/text",
		"ember": "../lib/ember/ember",
		"ember_data": "../lib/ember/ember-data",
		"jquery": "../lib/jquery/jquery",
		"handlebars": "../lib/handlebars/handlebars",
	}
});