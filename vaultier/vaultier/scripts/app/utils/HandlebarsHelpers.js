ApplicationKernel.namespace('Utils')

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

    humanFileSize: function (size) {
        var i = Math.floor(Math.log(size) / Math.log(1024));
        return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
    },

    renderMarkdown: function (string, options) {

        if (!string) {
            string = '';
        }

        marked.setOptions(Po.merge({
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: true,
            smartLists: true,
            smartypants: false
        }, options));

        return marked(string);
    },

    gravatarImg: function (email, options) {
        var cls = options.hash.class || '';
        var server = window.location.protocol + '//' + window.location.host;
        var img = 'mm';
        if (server.indexOf(':') === -1) {
            img = encodeURIComponent(server + '/static/vaultier/images/icon-avatar-grey.png');
        }

        var size = ( typeof(options.hash.size) === "undefined") ? 32 : options.hash.size;

        var result = '<img style="width:' + size + 'px; height:' + size + 'px;" class="' + cls + '" src="http://www.gravatar.com/avatar/' + CryptoJS.MD5(email) + '?s=' + size + '&d=' + img + '" />';
        return result;

    },

    printUser: function (user, options) {
        Utils.Logger.log.debug(user);
        if (!user) {
            user = {
                email: 'deleteduser@vaultier.org',
                nickname: 'Deleted user'
            }
        }

        var email = user.email || user.get('email');
        var nickname = user.nickname || user.get('nickname');
        var size = options.hash.size || 25;
        var length = options.hash.ellipsis || 60;
        var prefix = options.hash.prefix || '';
        var dataContainer = (options.hash.container)
            ? 'data-container=".' + options.hash.container + '"'
            : '';
        var disableTooltip = options.hash.disableTooltip || false;
        var disableName = options.hash.disableName || false;
        var displayEmailInsideBrackets = options.hash.displayEmailInsideBrackets || false;

        var avatar = this.gravatarImg(email, {hash: {size: size}});

        var name;
        if (options.hash.email) {
            name = email;
        } else {
            name = this.ucfirst(nickname);
        }
        var short = this.ellipsis(name, length);


        if (!disableTooltip) {
            var tooltip = 'data-toggle="tooltip" {dataContainer} title="{prefix} {name} ({email})"'
                .replace('{dataContainer}', dataContainer)
                .replace('{prefix}', prefix)
                .replace('{name}', name)
                .replace('{email}', email)
        } else {
            tooltip = ''
        }

        if (disableName) {
            short = '';
            name = '';
        }
        return '<span class="vlt-user" {tooltip} >{avatar} {name} {email}</span>'
            .replace('{tooltip}', tooltip)
            .replace('{name}', short)
            .replace('{avatar}', avatar)
            .replace('{email}', function () {
                if (displayEmailInsideBrackets) {
                    return '(' + email + ')';
                }
                return '';
            });

    },

    printAgo: function (t, options) {
        var prefix = options.hash.prefix || '';
        var a;

        try {
            a = moment(t).fromNow();
        } catch (e) {
            console.error(e.stack)
        }
        if (prefix) {
            t = prefix + ' ' + t
        }
        return '<span data-toggle=tooltip title="' + t + '">' + a + '</span>';
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

    /**
     * Creates a plural whit the name given if the word is
     * irregular pass the correct plural as the pluralPrefix parameter
     *
     * @param quantity {Number}
     * @param name {String}
     * @param pluralPrefix {String}
     * @returns {String}
     */
    pluralize: function (quantity, name, pluralPrefix) {
        if (quantity === 1) {
            return name;
        }

        if (typeof pluralPrefix === 'string') {
            return name + pluralPrefix;
        }

        // mostly just word finished with 'h' or 's' needs 'es' to make the plural
        if (/[hs]$/.test(name)) {
            return name + 'es';
        }
        return name + 's';

    },

    register: function () {

        var renderMarkdown = this.renderMarkdown.bind(this)
        Ember.Handlebars.registerBoundHelper('renderMarkdown', function (s) {
            return new Ember.Handlebars.SafeString(renderMarkdown(s));
        });

        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////


        var printAgo = this.printAgo.bind(this)
        Ember.Handlebars.registerBoundHelper('printAgo', function (t, options) {
            return new Ember.Handlebars.SafeString(printAgo(t, options));
        });

        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        var pluralize = this.pluralize.bind(this);
        Ember.Handlebars.registerBoundHelper('pluralize', pluralize);

        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        var ucfirst = this.ucfirst.bind(this);
        Ember.Handlebars.registerBoundHelper('ucfirst', ucfirst);

        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////

        var humanFilesize = this.humanFileSize.bind(this);
        Ember.Handlebars.registerBoundHelper('humanFilesize', humanFilesize);

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

        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////

        Ember.Handlebars.registerBoundHelper('date', function(date, options) {
            if (!options.hash.format) {
                options.hash.format = "YYYY MMM D";
            }
            return moment(date).format(options.hash.format);
        });

        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////

        Ember.Handlebars.registerHelper('exp', function (exp, options) {

            var get = function (path) {
                return options.data.view.get('controller.' + path);
            }

            var parseVariable = function (node, name) {
                if (node.object) {
                    return  parseVariable(node.object) + '.' + node.property.name
                } else {
                    return node.name
                }
            }

            var variables = function (node, vars) {
                if (!vars) {
                    vars = []
                }

                if (node) {

                    if (node.type == 'MemberExpression' || node.type == 'Identifier') {
                        vars.push(parseVariable(node, ''))
                    } else {
                        variables(node.left, vars)
                        variables(node.right, vars)
                    }
                }

                return vars
            }

            var result;
            try {

                var parsed = jsep(exp);
                var vars = variables(parsed);

                var mutated = exp;
                for (var i = 0; i < vars.length; i++) {
                    mutated = mutated.replace(vars[i], "get('" + vars[i] + "')");
                }

                result = false;
                eval('result = (' + mutated + ')');

            } catch (e) {
                console.error(e.stack)
                throw Error(
                    'Cannot parse expression: {exp}, parsed as {mutated}'
                        .replace('{exp}', exp)
                        .replace('{mutated}', mutated)
                )
            }

            if (result) {
                return options.fn(this)
            } else {
                return options.inverse(this)
            }

        });


    }

})
;

Utils.HandlebarsHelpers.reopenClass(Utils.Singleton);
