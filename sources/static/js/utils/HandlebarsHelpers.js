Po.NS('Utils')

Utils.HandlebarsHelpers = Ember.Object.extend({

    register: function () {

        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////

        var ucfirst = function (value) {
            if (value) {
                value = value.charAt(0).toUpperCase() + value.slice(1);
            }
            return value;
        };
        Ember.Handlebars.registerBoundHelper('ucfirst', ucfirst);

        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////

        var gravatarImg = function (email, options) {
            var server = window.location.protocol + '//' + window.location.host;
            var img = 'identicon';
            if (server.indexOf(':') === -1) {
                img = encodeURIComponent(server + '/static/images/icon-avatar-grey.png');
            }

            var size = ( typeof(options.hash.size) === "undefined") ? 32 : options.hash.size;

            var result = '<img class="' + options.hash.class + '" src="http://www.gravatar.com/avatar/' + CryptoJS.MD5(email) + '?s=' + size + '&d=' + img + '" />';
            return result;

        };
        Ember.Handlebars.registerBoundHelper('gravatarImg', function(email, options) {
            return new Ember.Handlebars.SafeString(gravatarImg(email, options));
        });

        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////

        var printUser = function (user, options) {
            var email = user.email;
            var nickname = user.nickname;
            var size = options.hash.size || 20 ;

            var avatar = gravatarImg(email, {hash: {size: size}});

            return '<span class="vlt-user">'+ avatar + ucfirst(nickname)+'</span>';
        }
        Ember.Handlebars.registerBoundHelper('printUser', function(user, options) {
            return new Ember.Handlebars.SafeString(printUser(user, options));
        });

        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////

        /**
         * {{ellipsis}}
         * @author: Jon Schlinkert <http://github.com/jonschlinkert>
         * Truncate the input string and removes all HTML tags
         * @param  {String} str      The input string.
         * @param  {Number} limit    The number of characters to limit the string.
         * @param  {String} append   The string to append if charaters are omitted.
         * @return {String}          The truncated string.
         */
        var ellipsis = function (str, limit, append) {
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
        }
        Ember.Handlebars.registerBoundHelper('ellipsis', ellipsis);

        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////

        var times = function (n, block) {
            var accum = '';
            for (var i = 0; i < n; ++i)
                accum += block.fn(i);
            return accum;
        }
        Ember.Handlebars.registerHelper('times', times);

        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////

        var ifCond = function (v1, operator, v2, options) {
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
        }
        Ember.Handlebars.registerHelper("ifCond", ifCond);

    }

})

