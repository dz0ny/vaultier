var dependencies = [
	"ember",
    "view/layout",
	"text!template/vaults.hbs"
];

define(dependencies, function(Ember, layout, template) {
	var view = Ember.View.extend({
        layoutName: 'layout',
		defaultTemplate: Ember.Handlebars.compile(template)
	});

	return {
		VaultsView: view,
		VaultsController: null
	};
});