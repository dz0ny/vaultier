Po.NS('Utils')

Utils.HandlebarsHelpers = Ember.Object.extend({

    register: function () {

        Ember.Handlebars.registerBoundHelper('ucfirst', function (value) {
            if (value) {
                value = value.charAt(0).toUpperCase() + value.slice(1);
            }
            return value;
        });

        Ember.Handlebars.registerBoundHelper('gravatar', function (email, options) {

            var email = context;
            var size = ( typeof(options.hash.size) === "undefined") ? 32 : options.hash.size;

            return "http://www.gravatar.com/avatar/" + CryptoJS.MD5(email) + "?s=" + size;
        });


        Ember.Handlebars.registerBoundHelper('gravatarImg', function (email, options) {

            var size = ( typeof(options.hash.size) === "undefined") ? 32 : options.hash.size;

            var result = '<img class="'+options.hash.class+'" src="http://www.gravatar.com/avatar/' + CryptoJS.MD5(email) + '?s=' + size+'" />';
            return new Ember.Handlebars.SafeString(result);

        });


        /**
         * {{ellipsis}}
         * @author: Jon Schlinkert <http://github.com/jonschlinkert>
         * Truncate the input string and removes all HTML tags
         * @param  {String} str      The input string.
         * @param  {Number} limit    The number of characters to limit the string.
         * @param  {String} append   The string to append if charaters are omitted.
         * @return {String}          The truncated string.
         */
        Ember.Handlebars.registerBoundHelper('ellipsis', function (str, limit, append) {
            if (typeof append !== 'string') {
                append = '...';
            }
            if (!str) {
                str = '';
            }
            var sanitized = str.replace(/(<([^>]+)>)/g, '');
            if (sanitized.length > limit) {
                var r = sanitized.substr(0, limit - append.length) + append;
                return r;
            } else {
                return sanitized;
            }
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

