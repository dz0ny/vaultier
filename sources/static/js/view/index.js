var dependencies = [
	"ember",
	"view/login",
	"text!template/index.hbs",
];

define(dependencies, function(Ember, loginView, template) {
	var view = Ember.View.extend({
		defaultTemplate: Ember.Handlebars.compile(template)
	});

	return $.extend({
		IndexView: view,
		IndexController: null
	}, loginView);
});