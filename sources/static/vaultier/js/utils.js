Po.NS('Utils');

Utils.ConstantList = function(options) {
    Po.merge(this, options);
}

Utils.ConstantList.prototype.toArray = function() {
    var result = [];
    for (prop in this) {
        if (this.hasOwnProperty(prop)) {
            result.push({
                id: prop,
                text: this[prop].text,
                value: this[prop].value
            })
        }
    }
    return result
}

Utils.ConstantList.prototype.getByValue = function(value) {
    for (prop in this) {
        if (this.hasOwnProperty(prop)) {
            if (this[prop].value == value) {
                return this[prop]
            }
        }
    }
}

Utils.ConstantList.prototype.getKeyByValue = function(value) {
    for (prop in this) {
        if (this.hasOwnProperty(prop)) {
            if (this[prop].value == value) {
                return prop
            }
        }
    }
}

Po.NS('Utils');

Utils.E = {

    recordId: function (record, exception) {
        exception = Po.F.optional(exception, false)

        if (record instanceof RL.Model) {
            var id = parseInt(record.get('id'));
            if (isNaN(id)) {
                id = record.get('id');
            }
            return id;
        }
        var num = parseInt(record);
        if (isNaN(num)) {
            if (exception) {
                throw "Not an id"
            } else {
                return null
            }
        }
        return num
    }

}

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
        var img = 'identicon';
        if (server.indexOf(':') === -1) {
            img = encodeURIComponent(server + '/static/vaultier/images/icon-avatar-grey.png');
        }

        var size = ( typeof(options.hash.size) === "undefined") ? 32 : options.hash.size;

        var result = '<img style="width:' + size + 'px; height:' + size + 'px;" class="' + cls + '" src="http://www.gravatar.com/avatar/' + CryptoJS.MD5(email) + '?s=' + size + '&d=' + img + '" />';
        return result;

    },

    printUser: function (user, options) {
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
        var disableTooltip = options.hash.disableTooltip || false;

        var avatar = this.gravatarImg(email, {hash: {size: size}});

        var name;
        if (options.hash.email) {
            name = email;
        } else {
            name = this.ucfirst(nickname);
        }
        var short = this.ellipsis(name, length);

        if (!disableTooltip) {
            var tooltip = 'data-toggle="tooltip" title="{prefix} {name} ({email})"'
                .replace('{prefix}', prefix)
                .replace('{name}', name)
                .replace('{email}', email)
        } else {
            tooltip = ''
        }

        return '<span class="vlt-user" {tooltip} >{avatar} {name}</span>'
            .replace('{tooltip}', tooltip)
            .replace('{name}', short)
            .replace('{avatar}', avatar)
    },

    printAgo: function (t, options) {
        var prefix = options.hash.prefix || '';
        var a;

        try {
            console.log(moment, t, 'js/utils/HandlebarsHelpers.js');
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


Po.NS('Utils');


/**
 * Usage:
 *
 *     overrides: {
 *         'Workspace': {
 *             find: function (store, type, id) {
 *                  // your own code here
 *             }
 *        }
 *     },
 *
 *
 */
Utils.MutableMethodsAdapterMixin = Ember.Mixin.create({

    getOverride: function (name, type) {
        type = type.typeKey;
        if (this.overrides && this.overrides[type] && this.overrides[type][name]) {
            return this.overrides[type][name];
        }
    },


    doOverride: function (name, type, args) {
        var override = this.getOverride(name, type);
        if (override) {
            return override.apply(this, args)
        } else {
            return this._super.apply(this, args)
        }
    },

    findQuery: function (store, type, query) {
        return this.doOverride('findQuery', type, arguments)
    },

    find: function (store, type, id) {
        return this.doOverride('find', type, arguments)
    },

    updateRecord: function (store, type, record) {
        return this.doOverride('updateRecord',  type, arguments)
    }

})


/**
 * Usage:
 *
 *     urls: {
 *         'Workspace': 'http://my.special.url'
 *     },
 *
 */
Utils.MutableUrlsAdapterMixin = Ember.Mixin.create({
     buildURL: function (type, id) {
            if (this.urls[type]) {
                url = this.urls[type];
                if (id) {
                    if (url.charAt(url.length - 1) !== '/') {
                        url += '/';
                    }
                    url = url + id;
                }
                return url;
            } else {
                return this._super(type, id)
            }
        }
});

Po.NS('Utils');
/**
 * Wraps jquery ajax to Ember.RSVP compatibile promise
 * @param options $.ajax options
 * @returns {Ember.RSVP.Promise}
 * @constructor
 */
Utils.RSVPAjax = function (options) {
    return new Ember.RSVP.Promise(function (resolve, reject) {
        Ember.$.ajax(options)
            .done(function (response) {
                resolve(response)
            })
            .fail(function (error) {
                reject(error)
            })
    });
}

Po.NS('Utils')

/**
  This mixin allows a class to return a singleton, as well as a method to quickly
  read/write attributes on the singleton.


  Example usage:

  ```javascript

    // Define your class and apply the Mixin
    User = Ember.Object.extend({});
    User.reopenClass(Discourse.Singleton);

    // Retrieve the current instance:
    var instance = User.current();

  ```

  Commonly you want to read or write a property on the singleton. There's a
  helper method which is a little nicer than `.current().get()`:

  ```javascript

    // Sets the age to 34
    User.currentProp('age', 34);

    console.log(User.currentProp('age')); // 34

  ```

  If you want to customize how the singleton is created, redefine the `createCurrent`
  method:

  ```javascript

    // Define your class and apply the Mixin
    Foot = Ember.Object.extend({});
    Foot.reopenClass(Discourse.Singleton, {
      createCurrent: function() {
        return Foot.create({toes: 5});
      }
    });

    console.log(Foot.currentProp('toes')); // 5

  ```

  @class Discourse.Singleton
  @extends Ember.Mixin
  @namespace Discourse
  @module Discourse
**/
Utils.Singleton = Ember.Mixin.create({

  /**
    Returns the current singleton instance of the class.

    @method current
    @returns {Ember.Object} the instance of the singleton
  **/
  current: function() {
    if (!this._current) {
      this._current = this.createCurrent();
    }

    return this._current;
  },


  /**
    How the singleton instance is created. This can be overridden
    with logic for creating (or even returning null) your instance.

    By default it just calls `create` with an empty object.

    @method createCurrent
    @returns {Ember.Object} the instance that will be your singleton
  **/
  createCurrent: function() {
    return this.create({});
  },

  /**
    Returns or sets a property on the singleton instance.

    @method currentProp
    @param {String} property the property we want to get or set
    @param {String} value the optional value to set the property to
    @returns the value of the property
  **/
  currentProp: function(property, value) {
    var instance = this.current();
    if (!instance) { return; }

    if (typeof(value) !== "undefined") {
      instance.set(property, value);
      return value;
    } else {
      return instance.get(property);
    }
  }

});

//# sourceMappingURL=utils.js.map