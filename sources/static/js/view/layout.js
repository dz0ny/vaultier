var dependencies = [
	"ember",
	"text!template/layout.hbs",
];

define(dependencies, function(Ember, template) {
    Ember.TEMPLATES['layout'] = Ember.Handlebars.compile(template);
});