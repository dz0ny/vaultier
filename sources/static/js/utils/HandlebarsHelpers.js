Po.NS('Utils')

Utils.HandlebarsHelpers = Ember.Object.extend({


    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////

    ucfirst: function (value) {
        if (value) {
            value = value.charAt(0).toUpperCase() + value.slice(1);
        }
        return value;
    },

    gravatarImg: function (email, options) {
        var cls = options.hash.class || '';
        var server = window.location.protocol + '//' + window.location.host;
        var img = 'identicon';
        if (server.indexOf(':') === -1) {
            img = encodeURIComponent(server + '/static/images/icon-avatar-grey.png');
        }

        var size = ( typeof(options.hash.size) === "undefined") ? 32 : options.hash.size;

        var result = '<img style="width:' + size + 'px; height:' + size + 'px;" class="' + cls + '" src="http://www.gravatar.com/avatar/' + CryptoJS.MD5(email) + '?s=' + size + '&d=' + img + '" />';
        return result;

    },

    printUser: function (user, options) {
        var email = user.email || user.get('email');
        var nickname = user.nickname || user.get('nickname');
        var size = options.hash.size || 20;

        var avatar = this.gravatarImg(email, {hash: {size: size}});

        var name;
        if (options.hash.email) {
            name = email;
        } else {
            name = this.ucfirst(nickname);
        }

        return '<span class="vlt-user">' + avatar + name + '</span>';
    },

    /**
     * {{ellipsis}}
     * @author: Jon Schlinkert <http://github.com/jonschlinkert>
     * Truncate the input string and removes all HTML tags
     * @param  {String} str      The input string.
     * @param  {Number} limit    The number of characters to limit the string.
     * @param  {String} append   The string to append if charaters are omitted.
     * @return {String}          The truncated string.
     */
    ellipsis: function (str, limit, append) {
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
    },

    ifIndex: function (options) {
        var index = options.data.view.contentIndex + 1,
            nth = options.hash.is;

        if (index % nth === 0) {
            return options.fn(this);
        }
    },

    times: function (n, block) {
        var accum = '';
        for (var i = 0; i < n; ++i)
            accum += block.fn(i);
        return accum;
    },

    ifCond: function (v1, operator, v2, options) {
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
    },

    register: function () {

        var ucfirst = this.ucfirst.bind(this);
        Ember.Handlebars.registerBoundHelper('ucfirst', ucfirst);

        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////

        var gravatarImg = this.gravatarImg.bind(this);
        Ember.Handlebars.registerBoundHelper('gravatarImg', function (email, options) {
            return new Ember.Handlebars.SafeString(gravatarImg(email, options));
        });

        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////

        var printUser = this.printUser.bind(this);
        Ember.Handlebars.registerBoundHelper('printUser', function (user, options) {
            return new Ember.Handlebars.SafeString(printUser(user, options));
        });

        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////


        var ellipsis = this.ellipsis.bind(this);
        Ember.Handlebars.registerBoundHelper('ellipsis', ellipsis);

        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////

        var times = this.times.bind(this);
        Ember.Handlebars.registerHelper('times', times);

        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////


        var ifCond = this.ifCond.bind(this);
        Ember.Handlebars.registerHelper("ifCond", ifCond);

        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////

        var ifIndex = this.ifIndex;
        Ember.Handlebars.registerHelper('ifIndex', ifIndex);

    }

});

Utils.HandlebarsHelpers.reopenClass(Utils.Singleton);
