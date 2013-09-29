define({
	app_name: "Demo Ember-Require Application",
	shim: {
		"ember": {
			deps: ["handlebars", "jquery"],
			exports: "Ember"
		}
	},
	paths: {
		"template": "../hbs",
		"text": "../lib/requirejs.text/text",
		"ember": "../lib/ember/ember",
		"jquery": "../lib/jquery/jquery",
		"handlebars": "../lib/handlebars/handlebars",
	}
});