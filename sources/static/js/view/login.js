var dependencies = [
	"ember",
	"controller/login",
	"text!template/login.hbs",
];

define(dependencies, function(Ember, controller, template) {
	var view = Ember.View.extend({
		defaultTemplate: Ember.Handlebars.compile(template)
	});

	return {
		LoginView: view,
		LoginController: controller
	};
});