Po.NS('Utils')

Utils.HandlebarsHelpers = Ember.Object.extend({

    register: function () {

        Ember.Handlebars.registerBoundHelper('ucfirst', function (value) {
            if (value) {
                value = value.charAt(0).toUpperCase() + value.slice(1);
            }
            return value;
        });

    }

})
