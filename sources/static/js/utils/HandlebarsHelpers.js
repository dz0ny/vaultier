Po.NS('Utils')

Utils.HandlebarsHelpers = Ember.Object.extend({

    register: function () {

        Ember.Handlebars.registerBoundHelper('ucfirst', function (value) {
            if (value) {
                value = value.charAt(0).toUpperCase() + value.slice(1);
            }
            return value;
        });

        // block helpers not supported by ember
        Ember.Handlebars.registerBoundHelper("ifCond", function (v1, operator, v2, options) {
            switch (operator) {
                case "==":
                    return (v1 == v2) ? options.fn(this) : options.inverse(this);

                case "!=":
                    return (v1 != v2) ? options.fn(this) : options.inverse(this);

                case "===":
                    return (v1 === v2) ? options.fn(this) : options.inverse(this);

                case "!==":
                    return (v1 !== v2) ? options.fn(this) : options.inverse(this);

                case "&&":
                    return (v1 && v2) ? options.fn(this) : options.inverse(this);

                case "||":
                    return (v1 || v2) ? options.fn(this) : options.inverse(this);

                case "<":
                    return (v1 < v2) ? options.fn(this) : options.inverse(this);

                case "<=":
                    return (v1 <= v2) ? options.fn(this) : options.inverse(this);

                case ">":
                    return (v1 > v2) ? options.fn(this) : options.inverse(this);

                case ">=":
                    return (v1 >= v2) ? options.fn(this) : options.inverse(this);

                default:
                    return eval("" + v1 + operator + v2) ? options.fn(this) : options.inverse(this);
            }
        });

    }

})

