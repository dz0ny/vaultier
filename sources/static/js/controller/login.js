define(["ember"], function(Ember) {
	var controller = Ember.Controller.extend({
		login: function() {
			console.log("called login controller method.");
		}
	});

	return controller;
});