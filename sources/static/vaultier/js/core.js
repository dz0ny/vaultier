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

/**************************************************
 **************************************************
 * Ember
 **************************************************
 **************************************************
 */

Ember.FEATURES["query-params"] = true
Ember.MODEL_FACTORY_INJECTIONS = true;

/**************************************************
 **************************************************
 * Application
 **************************************************
 **************************************************
 */

Vaultier = Ember.Application.create({
    LOG_TRANSITIONS: true,
    // LOG_TRANSITIONS_INTERNAL: true,

    ready: function () {

        /**************************************************
         **************************************************
         * Initialize config
         **************************************************
         **************************************************
         */
        InitializeConfig(this);


        LGTM.configure('defer', Ember.RSVP.defer);

        /**************************************************
         **************************************************
         * Notifications
         **************************************************
         **************************************************
         */

        $.notify.defaults({
            className: 'success',
            style: 'bootstrap',
            position: 'bottom center'
        })

        /**************************************************
         **************************************************
         * Handlebars
         **************************************************
         **************************************************
         */
        Utils.HandlebarsHelpers.current().register();

        /**************************************************
         **************************************************
         * Cookies
         **************************************************
         **************************************************
         */
        $.cookie.json = true;

        /**************************************************
         **************************************************
         * Tooltiops
         **************************************************
         **************************************************
         */

        $('body').tooltip({
            selector: '[data-toggle=tooltip]'
        });

        /**************************************************
         **************************************************
         * Global UI bindings
         **************************************************
         **************************************************
         */

        // instead css overflow-y:scroll
//        var minHeight = function () {
//            $('html').css('height', $(window).height()+1);
//        }
//        $(window).resize(minHeight());
//        minHeight();

        var keypressBindings = [
            {
                "keys": "alt s",
                "is_exclusive": true,
                "on_keydown": function () {
                    var $searchbox = $('.vlt-search-box select');
                    if ($searchbox.length) {
                        $searchbox[0].selectize.focus();
                    }

                    return false;
                },
                "on_keyup": function (e) {
                    //pass
                },
                "this": window
            }
        ];
        var setKeypressBindings = function () {
            keypress.register_many(keypressBindings);
        };

        var unsetKeypressBindings = function () {
            keypress.unregister_many(keypressBindings);
        };

        $(document).on('ApplicationLoaderShow', function (event) {
            setKeypressBindings();
        });
        $(document).on('ApplicationLoaderHide', function (event) {
            unsetKeypressBindings();
        });

        setKeypressBindings();

        this.registerDI(this);

    }
});
Vaultier.deferReadiness();


Vaultier.registerDI = function (app) {

    // service:config
    app.register('config:main', Vaultier.Config)
    app.inject('route', 'config', 'config:main');
    app.inject('controller', 'config', 'config:main');
    app.inject('view', 'config', 'config:main');
    app.inject('service', 'config', 'config:main');

    // service:store
    app.register('store:main', Vaultier.Client, {instantiate: false})
    app.inject('route', 'store', 'store:main');
    app.inject('controller', 'store', 'store:main');
    //also there lazy loading does not work properly with ember initialize:
    RESTless.set('client', Vaultier.Client);

    // service:errors
    app.register('service:errors', Service.Errors)
    app.inject('route', 'errors', 'service:errors');
    app.inject('service:errors', 'errorController', 'controller:ErrorGeneric')
    app.inject('service:errors', 'router', 'router:main')

    // service:session and service:storage
    app.register('service:session', Service.Session)
    app.register('service:storage', Service.Storage)

    // service:auth
    app.register('service:auth', Service.Auth)
    app.inject('service:auth', 'coder', 'service:coder')
    app.inject('service:auth', 'store', 'store:main')
    app.inject('service:auth', 'router', 'router:main')
    app.inject('service:auth', 'session', 'service:session')
    app.inject('service:auth', 'storage', 'service:storage')

    app.inject('route', 'auth', 'service:auth');
    app.inject('controller', 'auth', 'service:auth');

    // service:coder
    app.register('service:coder', Service.Coder)

    // service:invitations
    app.register('service:invitations', Service.Invitations)
    app.inject('service:invitations', 'store', 'store:main')
    app.inject('service:invitations', 'session', 'service:session')
    app.inject('service:invitations', 'auth', 'service:auth');
    app.inject('service:invitations', 'router', 'router:main');

    app.inject('route:InvitationUse', 'invitations', 'service:invitations')
    app.inject('route:InvitationAccept', 'invitations', 'service:invitations')
    app.inject('route:WorkspaceMemberInvite', 'invitations', 'service:invitations')
    app.inject('route:VaultMemberInvite', 'invitations', 'service:invitations')
    app.inject('route:CardMemberInvite', 'invitations', 'service:invitations')
    app.inject('route:Workspaces', 'invitations', 'service:invitations')

    // service:keytransfer
    app.register('service:keytransfer', Service.KeyTransfer)
    app.inject('service:keytransfer', 'store', 'store:main');
    app.inject('service:keytransfer', 'auth', 'service:auth');
    app.inject('service:keytransfer', 'coder', 'service:coder');

    // service:workspacekey
    app.register('service:workspacekey', Service.WorkspaceKey)
    app.inject('service:workspacekey', 'auth', 'service:auth')
    app.inject('service:workspacekey', 'store', 'store:main');
    app.inject('service:workspacekey', 'coder', 'service:coder')
    app.inject('service:workspacekey', 'keytransfer', 'service:keytransfer')

    app.inject('route:WorkspacesCreate', 'workspacekey', 'service:workspacekey')
    app.inject('route:Workspace', 'workspacekey', 'service:workspacekey')
    app.inject('route:WorkspaceNoKeys', 'workspacekey', 'service:workspacekey')
    app.inject('route:WorkspaceMemberApprove', 'workspacekey', 'service:workspacekey')

    // service:changekey
    app.register('service:changekey', Service.ChangeKey)
    app.inject('route:SettingsKeys', 'changekey', 'service:changekey')
    app.inject('service:changekey', 'store', 'store:main');
    app.inject('service:changekey', 'auth', 'service:auth');
    app.inject('service:changekey', 'coder', 'service:coder');

    // service:newuserinit
    app.register('service:newuserinit', Service.NewUserInit)
    app.inject('service:newuserinit', 'auth', 'service:auth');
    app.inject('service:newuserinit', 'router', 'router:main');
    app.inject('service:newuserinit', 'invitations', 'service:invitations');
    app.inject('route:AuthRegisterCreds', 'newuserinit', 'service:newuserinit')


    // components injections
    app.inject('component:change-key', 'changekey', 'service:changekey');

    // model injections - it is done in model inits
}

var router = Vaultier.Router.map(function () {

    /************************************************************
     * REGISTRATION
     ************************************************************/

    this.resource('AuthRegister', {path: '/auth/register'}, function () {
        this.route('before', { path: 'overview' });
        this.route('keys', { path: 'generate-keys' });
        this.route('creds', { path: 'submit-credentials' });
        this.route('sum', { path: '/registration-done' });
    })


    /************************************************************
     * Login
     ************************************************************/

    this.route('AuthLogin', {path: '/auth/login'})

    /************************************************************
     * invitations
     ************************************************************/

    this.resource('Invitation', {path: '/invitations'}, function () {
        // automatic Invitation.index
        this.route('use', { path: '/use/:invitation/:hash' });
        this.route('anonymous', { path: '/anonymous' });
        this.route('accept', { path: '/accept' });
    })

    /************************************************************
     * Settings
     ************************************************************/

    this.resource('Settings', {path: '/settings'}, function () {
        // automatic Settings.index
        this.route('personal', { path: '/personal' });
        this.route('keys', { path: '/keys' });

    })


    /************************************************************
     * Workspaces
     ************************************************************/
    this.resource('Workspaces', {path: '/workspaces'}, function () {
        // automatic Workspaces.index
        this.route('create', { path: '/create'});
        this.route('select', { path: '/select'});

        /************************************************************
         * Workspace
         ************************************************************/
        this.resource('Workspace', {path: '/w/:workspace'}, function () {
            // automatic Workspace.index

            // edit
            this.route('edit', { path: '/edit'});

            // no keys
            this.route('noKeys', { path: '/waiting-for-keys'});

            // member
            this.route('memberIndex', { path: '/team'});
            this.route('memberInvite', { path: '/team/invite'});

            /************************************************************
             * Vaults
             ************************************************************/
            this.resource('Vaults', {path: '/vaults'}, function () {
                // automatic Vaults.index
                this.route('create', { path: '/create'});

                /************************************************************
                 * Vault
                 ************************************************************/
                this.resource('Vault', {path: '/v/:vault'}, function () {
                    // automatic Vault.index

                    // edit
                    this.route('edit', { path: '/edit'});

                    // members
                    this.route('memberIndex', { path: '/team'});
                    this.route('memberInvite', { path: '/team/invite'});

                    /************************************************************
                     * Cards
                     ************************************************************/
                    this.resource('Cards', {path: '/cards'}, function () {
                        // automatic Cards.index
                        this.route('create', { path: '/create'});

                        /************************************************************
                         * Card
                         ************************************************************/
                        this.resource('Card', {path: '/c/:card'}, function () {
                            // automatic Card.index

                            // edit
                            this.route('edit', { path: '/edit'});

                            // move
                            this.route('move', { path: '/move'});

                            // members
                            this.route('memberIndex', { path: '/team'});
                            this.route('memberInvite', { path: '/team/invite'});

                            this.resource('Secret', {path: '/secrets'}, function () {
                                // automatic Secrets.index

                                // secrets manipulation
                                this.route('createSelect', { path: '/create/select'});
                                this.route('createSubmit', { path: '/create/submit/:type'});
                                this.route('edit', { path: '/edit/:secret'});
                                this.route('move', { path: '/move/:secret'});
                            })
                        })


                    });

                })

            })

        })

    });

    /************************************************************
     * System and error routes
     ************************************************************/

    this.resource('Home', {path: '/home'}, function () {
        //this.route('about', { path: '/about'});
    })

    this.route("ErrorGeneric", { path: "/errors/"});
    this.route("Error404", { path: "*path"}); //also referred as /errors/error-404

});

Ember.Route.reopen({
    activate: function () {
        this._super();
        window.scrollTo(0, 0);
    }
});

Vaultier.ApplicationRoute = Ember.Route.extend(
    {
        actions: {

            error: function (error, transition) {
                this.get('errors').processError(error);
                return false;
            },

            loading: function (transition, originRoute) {
                ApplicationLoader.showLoader();
//                Ember.run.scheduleOnce('afterRender', this, function () {
//                    ApplicationLoader.hideLoader();
//                })
                transition.promise.finally(function () {
                    ApplicationLoader.hideLoader();
                }.bind(this))
            }

        },

        beforeModel: function (params, transition) {
            // reload authenticated user from server
            var auth = this.get('auth');
            var status = auth.reload()
            return status;

        }
    })
;

Vaultier.IndexRoute = Ember.Route.extend(
    {
        redirect: function () {
            var auth = this.get('auth');
            if (auth.get('isAuthenticated')) {
                return this.transitionTo('Workspaces.index');
            } else {
                return this.transitionTo('Home.index');
            }
        }
    });



Po.NS('Service');

Service.Errors = Ember.Object.extend({

    /**
     * @DI ErrorController
     */
    errorController: null,

    /**
     * @DI router:main
     */
    router: null,
    errorRoute: 'ErrorGeneric',

    rendering: false,

    init: function () {
        this._super();
//        Raven.config('http://df6466226ad14775b23818b42df3a5c8@sentry.rclick.cz/5', {
//            whitelistUrls: []
//        }).install();
    },

    parseError: function (error) {
        var data = {
            title: 'Oooups! Something wrong happen here',
            message: 'Fatal error',
            template: 'ErrorGeneric',
            error: error
        }

        if (error && (error.message || error.detail)) {
            data.message = error.message || error.detail
        }

        if (error && error.title) {
            data.title = error.title
        }

        if (error && error.status == 403) {
            data.title = 'Access denied!';
            data.message = 'You do not have access to desired area'
        }

        if (error && error.status == 404) {
            data.template = 'Error404'
        }

        return data
    },

    consoleError: function(error, level) {
        level = level || 'error';
        // log error
        if (error.stack) {
            console[level](error.stack)
        } else {
            console[level](error);
        }

    },

    renderError: function (error) {
        var ctrl = this.get('errorController')
        var data = this.parseError(error)
        ctrl.set('error', error)
        ctrl.set('content', data)

        var router = this.get('router');
        var errorRoute = this.get('errorRoute')
        router.intermediateTransitionTo(errorRoute)
        ApplicationLoader.hideLoader()
    },

    logError: function (error) {
        var c = this.get('container');

        this.consoleError(error);

        // capture user
//        Raven.setUser(null)
//        var auth = c.lookup('service:auth');
//        var user;
//        if (auth && (user = auth.get('user'))) {
//            user = {
//                email: user.get('email'),
//                id: user.get('id')
//            }
//            Raven.setUser(user)
//        }
//        // capture current path
//        var a = c.lookup('controller:application')
//        var currentPath = '';
//        if (a) {
//            currentPath = a.get('currentPath')
//        }
//
//        //capture tags
//        var tags = {}
//        tags['type'] = error.type;
//        tags['errorDuringRendering'] = this.get('rendering')
//        tags['currentPath'] = currentPath
//
        //Raven.captureException(error, {extra: tags});
    },

    processError: function (error) {
        try {
            this.logError(error)
        } catch (e) {
            console.error('--CANNOT-CAPTURE-ERROR')
            console.log(e.stack)
        }
        try {
            this.renderError(error)
        } catch (e) {
            console.error('--CANNOT-RENDER-ERROR--');
            console.error(e.stack);
        }
    }


})

Po.NS('Service');

Service.Environment = Ember.Object.extend({

    workspace: null,
    vault: null,
    card: null,
    secret: null,
    router: null

});
Service.Environment.reopenClass(Utils.Singleton);

Po.NS('Service');

Service.Auth = Ember.Object.extend({

    init: function () {
        this._super(arguments);
        this.promises = Service.AuthPromises.create({
            store: this.store,
            coder: this.coder
        })

    },

    /**
     * @DI store:main
     */
    store: null,

    /**
     * @DI service:coder
     */
    coder: null,

    /**
     * @DI router:main
     */
    router: null,

    /**
     * @DI service:session
     */
    session: null,

    /**
     * @DI service:storage
     */
    storage: null,

    token: null,

    /**
     * Current authenticated user model
     */
    user: null,
    checked: false,
    privateKey: null,

    /**
     * Transition to be retried after successfull login
     */
    transition: null,

    isAuthenticated: function () {
        return this.get('user.id') !== null
    }.property('user'),

    isChecked: function () {
        return this.get('checked') == true
    }.property('user', 'checked'),

    generateKeys: function (callback) {
        var coder = this.get('coder');
        return this.coder.generateKeys(callback);
    },


    checkPermissions: function (transition, check, noPromise) {
        var fn = function (model) {
            var result = false;
            try {
                result = check(model)
            } catch (e) {
                console.error(e.stack)
            }

            if (!result) {
                var e = new Error('Missing client permission');
                e.status = 403
                throw e
            }
            return result
        }.bind(this)

        if (noPromise) {
            return fn()
        } else {
            return fn
        }

    },


    /**
     * Logs in user promise
     *
     * if success promise returns Vaultier.User model
     * if error promise returns null
     *
     * @param email
     * @param privateKey
     * @param bool transitionAfterLogin
     * @returns {Ember.RSVP.Promise}
     */
    login: function (email, privateKey, transitionAfterLogin) {
        // ensure  email is not undefined
        // lowercase email (btw: lowercase done also by server)
        if (!email) {
            email = ''
        }
        email = email.toLowerCase();

        return this.promises.login(email, privateKey)
            .then(
                // successfull login
                function (user) {
                    // save credentials
                    this.setAuthenticatedUser(user, privateKey, this.promises.get('token'))

                    // transition to previously requested page
                    if (transitionAfterLogin) {
                        var transition = this.get('transition');
                        if (transition) {
                            transition.retry()
                        } else {
                            this.get('router').transitionTo('index')
                        }
                    }

                    return user
                }.bind(this),

                // unsuccessfull login
                function () {
                    this.setAuthenticatedUser(null)
                    return Ember.RSVP.reject()
                }.bind(this))
    },

    rememberUser: function (email,privateKey, ttl) {
        if (email && ttl) {
            this.get('storage').set('remember', {
                email: email,
                privateKey: privateKey,
                ttl: ttl
            }, ttl);
        } else {
            this.get('storage').remove('remember');
        }
    },

    getRememberedUser: function (user) {
        return this.get('storage').get('remember', null);
    },

    /**
     * Used to reload user by token from server
     * returns true or false - user token is valid / user token is invalid
     * @returns {Ember.RSVP.Promise}
     */
    reload: function () {
        var session = this.loadFromSession() || {};
        var sessionUser = session.user || null
        var sessionPrivateKey = session.privateKey || null;
        var sessionToken = session.token || null;

        return this.promises.user(sessionUser, sessionToken)
            .then(
                //success
                function (user) {
                    return this.setAuthenticatedUser(
                        user,
                        sessionPrivateKey,
                        sessionToken
                    )
                }.bind(this),
                //fail
                function () {
                    return this.setAuthenticatedUser(null)
                }.bind(this))
    },


    logout: function () {
        return this.promises.logout()
            .then(function () {
                this.setAuthenticatedUser(null);
            }.bind(this))
            .then(function() {
                window.location = '/'
            })
    },

    /**
     * Checks if user is authenticated
     * if not redirects to login and store transition to be retried after succesfull login
     * @param {Transition} transition
     */
    checkAuthenticatedOrLogin: function (transition) {
        if (!this.get('isAuthenticated')) {
            // abort transition
            $.notify('You do not have access to secured area. Please login', 'error');
            transition.abort();

            // store transition
            this.set('transition', transition)

            //redirect to login
            this.get('router').transitionTo('AuthLogin');
            return false;
        }
        return true;
    },

    setAuthenticatedUser: function (user, privateKey, token) {
        var result;

        if (user && privateKey && token) {

            result = true;
            this.setProperties({
                checked: true,
                isAuthenticated: true,
                user: user,
                privateKey: privateKey,
                token: token
            })

        } else {

            result = false;

            this.setProperties({
                checked: true,
                isAuthenticated: false,
                user: null,
                privateKey: null,
                token: null
            })


        }
        // saves to session
        this.saveToSession();

        return result;
    },

    saveToSession: function () {
        this.session.set('auth', {
            token: this.get('token'),
            email: this.get('user.email'),
            user: this.get('user.id'),
            privateKey: this.get('privateKey')
        });
    },

    loadFromSession: function () {
        return this.session.get('auth');
    }



})
;


Service.AuthPromises = Ember.Object.extend({

    token: null,
    /**
     * @config
     */
    store: null,
    /**
     * @config
     */
    coder: null,

    _auth: function (email, privateKey) {
        var coder = this.coder;
        var signature = coder.sign(email, privateKey);

        return Utils.RSVPAjax({
            url: '/api/auth/auth',
            type: 'post',
            data: {
                email: email,
                signature: signature
            }})
    },

    _retrieveUser: function (id) {
        if (!id) {
           return Ember.RSVP.reject('User id not specified')
        }
        return this.get('store').find('User', id)
            .catch(function (error) {
                throw Error('Cannot retrieve user with id {id}'.replace('{id}', id))
            })
    },

    _useToken: function (token) {
        Ember.$.ajaxSetup({
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-Vaultier-Token', token);
            }
        });
        this.set('token', token);
        return Ember.RSVP.resolve();
    },

    _resetToken: function () {
        Ember.$.ajaxSetup({
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-Vaultier-Token', '');
            }
        });
        this.set('token', null)

        return Ember.RSVP.resolve();
    },

    _unauth: function () {
        return Utils.RSVPAjax({
            url: '/api/auth/logout',
            type: 'post'
        })
    },

    user: function (user, token) {
        this._useToken(token)
        return this._retrieveUser(user)
    },

    logout: function () {
        return Ember.RSVP.resolve()
            .then(this._unauth())
            .then(this._resetToken())
    },

    login: function (email, privateKey) {
        var user;
        var token;
        return Ember.RSVP.resolve()
            .then(function() {
                return this._auth(email, privateKey)
            }.bind(this))

            .then(function(response) {
                user = response.user;
                token = response.token
                return this._useToken(token)
            }.bind(this))

            .then(function() {
                return this._retrieveUser(user)
            }.bind(this))
    }


})
;


Po.NS('Service');

Service.Session = Ember.CoreObject.extend({

    init: function() {
        if (!window.sessionStorage) {
            throw 'Vaultier requires sessionStorage to be supported by browser'
        }
    },

    prefix: 'vaultier.',

    set: function (key, value) {
        Ember.$(document).sessionStorage(this.prefix + key, value);
    },

    get: function (key, def) {
        var val = Ember.$(document).sessionStorage(this.prefix + key);
        if ( (typeof val=='undefined' || val===null) && typeof def!='undefined') {
            return def;
        }
        return val;
    },

    remove: function (key) {
        return Ember.$(document).sessionStorage(this.prefix + key, null);
    }

});


Po.NS('Service');

Service.Storage = Ember.CoreObject.extend({

    init: function() {
        if (!window.localStorage) {
            throw 'Vaultier requires localStorage to be supported by browser'
        }
    },

    prefix: 'vaultier.',

    set: function (key, value, ttl) {
        var ttl = ttl || 0;
        $.jStorage.set(this.prefix + key, value);
        $.jStorage.setTTL(this.prefix + key, ttl);
    },

    get: function (key, def) {
        var val = $.jStorage.get(this.prefix + key);
        if ( (typeof val=='undefined' || val===null) && typeof def!='undefined') {
            return def;
        }
        return val;
    },

    remove: function (key) {
        return $.jStorage.deleteKey(this.prefix + key);
    }

});


Po.NS('Service');

Service.Coder = Ember.Object.extend({

    TestingGenerator: Ember.Object.extend({

        getPrivateKey: function () {
            return this.private
        },

        getPublicKey: function () {
            return this.public
        },

        getKey: function (callback) {
            this.private = $('div.vlt-test-private-key').text().trim()
            this.public = $('div.vlt-test-public-key').text().trim()

            if (callback) {
                return callback(this)
            } else {
                return this
            }
        }

    }),

    generateKeys: function (callback) {
        if (this.get('config.FT_FEATURES.dev_shared_key')) {
            // development generator
            var generator = this.TestingGenerator.create();
        } else {
            // production generator
            var generator = new JSEncrypt({default_key_size: 2048});
        }

        var build = function () {
            return  {
                privateKey: generator.getPrivateKey(),
                publicKey: generator.getPublicKey()
            }
        }

        if (callback) {
            generator.getKey(function () {
                callback(build())
            });
        } else {
            generator.getKey()
            return build();
        }
    },

    sign: function (value, privateKey) {
        var rsa = new RSAKey();
        rsa.readPrivateKeyFromPEMString(privateKey);
        var signature = hex2b64(rsa.signString(value, 'sha1'));

        return signature;
    },

    encryptRSA: function (value, publicKey) {
        var decoder = new JSEncrypt();
        decoder.setPublicKey(publicKey)
        var result = decoder.encrypt(value);

        return result;
    },

    encryptWorkspaceKey: function(value, publicKey) {
        return this.encryptRSA(value, publicKey);
    },

    decryptRSA: function (value, privateKey) {
        var decoder = new JSEncrypt();
        decoder.setPrivateKey(privateKey);
        var result = decoder.decrypt(value);

        return result;
    },

    decryptWorkspaceKey: function(value, privateKey) {
        return this.decryptRSA(value, privateKey);
    },

    generateWorkspaceKey: function () {
        var length = 32;
        var text = '';
        for (var i = 0; i < length; i++) {
            text = text + String.fromCharCode(
                Math.floor(Math.random() * (255))
            )
       }
        return text;
    },


    decryptAES: function (value, passPhrase) {
        return CryptoJS.AES.decrypt(value, passPhrase).toString(CryptoJS.enc.Utf8);
    },

    encryptAES: function (value, passPhrase) {
        return CryptoJS.AES.encrypt(value, passPhrase).toString()
    },

    decryptWorkspaceData: function(data, workspaceKey) {
        return this.decryptAES(data, workspaceKey)
    },

    encryptWorkspaceData: function(data, workspaceKey) {
        return this.encryptAES(data, workspaceKey)
    }



});


Po.NS('Service');

Service.Invitations = Ember.Object.extend({

    SESSION_KEY: 'invitations',

    /**
     * @DI service:session
     */
    session: null,
    /**
     * @DI service:auth
     */
    auth: null,
    /**
     * @DI store:main
     */
    store: null,
    /**
     * @DI router:main
     */
    router: null,

    init: function () {
        this._super();
        this.env = Service.Environment.current()
    },


    _memberPromise: function (workspace, emailOrId, send, resend) {
        var id = parseInt(emailOrId)

        if (id) {
            // do get - resend invitation
            return Utils.RSVPAjax({
                url: '/api/members/' + id + '/',
                type: 'get'
            });
        } else {
            // do post - invite - send invitation
            return Utils.RSVPAjax({
                url: '/api/members/',
                type: 'post',
                data: {
                    workspace: Utils.E.recordId(workspace),
                    email: emailOrId,
                    send: send,
                    resend: resend
                }
            })
        }


    },

    _invitePromise: function (member, role, params) {
        var data = {
            member: member.id,
            level: role,
            to_workspace: Utils.E.recordId(params.to_workspace),
            to_vault: Utils.E.recordId(params.to_vault),
            to_card: Utils.E.recordId(params.to_card)
        };
        return  Utils.RSVPAjax({
            url: '/api/roles/',
            type: 'post',
            data: data
        });
    },


    invite: function (workspace, emailOrId, role, params, send, resend) {
        send = Po.F.optional(send, false);
        resend = Po.F.optional(resend, false);

        return Ember.RSVP.resolve()
            .then(
                function () {
                    return this._memberPromise(workspace, emailOrId, send, resend)
                }.bind(this))

            .then(
                function (member) {
                    return this._invitePromise(member, role, params);
                }.bind(this))
    },

    _storeInvitationToSession: function (id, hash, data) {
        return new Ember.RSVP.Promise(function (resolve, reject) {
            var invitation = {
                id: id,
                hash: hash
            };

            //todo: validate invitation here, on error reject with appropriet status error

            var invitations = this.get('session').get(this.SESSION_KEY, {});
            invitations[id] = invitation;
            this.session.set(this.SESSION_KEY, invitations);

            resolve(invitation);
        }.bind(this));
    },

    hasInvitationsInSession: function () {
        var invitations = this.session.get(this.SESSION_KEY, null);
        return invitations !== null;
    },

    acceptInvitationsInSession: function (invitations) {
        if (invitations) {
            invitations = Ember.RSVP.resolve(invitations)
        } else {
            invitations = this.fetchInvitationsInSession();
        }

        var promise = invitations
            .then(function (invitations) {
                var promises = [];
                invitations.forEach(function (invitation) {
                    invitation.set('status', 200);
                    promises.push(invitation.saveRecord())
                })
                return Ember.RSVP.all(promises)
            });
        return promise
    },

    clearInvitationsInSession: function () {
        this.session.set(this.SESSION_KEY, null);
    },


    _validateInvitation: function (id, hash) {
        return Ember.RSVP.resolve();
    },


    /**
     * Fetches all invitations stored in session from server
     */
    fetchInvitationsInSession: function () {
        var invitations = this.session.get(this.SESSION_KEY, {});
        var promises = []
        var store = this.get('store');

        for (i in invitations) {
            if (invitations.hasOwnProperty(i)) {
                promises.push(store.find('Invitation', invitations[i].hash));
            }
        }

        return Ember.RSVP.all(promises)
    },


    /**
     *   Function encapsulates using of url invitation
     *
     *   transition has to be aborted before use
     *
     *   Workflow provided
     *
     *   - store invitation to session
     *   - if authenticated redirects to list of invitations to accept
     *   - if not authenticated, redirects to page, where user is required to login before use of invitation
     *
     * @param id
     * @param hash
     * @returns {Ember.RSVP.Promise}
     */
    useInvitation: function (id, hash) {
        return Ember.RSVP.resolve()

            .then(function () {
                return this._validateInvitation(id, hash);
            }.bind(this))

            .then(function () {
                return this._storeInvitationToSession(id, hash);
            }.bind(this))

            .then(function () {
                if (this.get('auth').get('isAuthenticated')) {
                    return this.get('router').transitionTo('Invitation.accept')
                } else {
                    return this.get('router').transitionTo('Invitation.anonymous')
                }
            }.bind(this))

    }


})


Po.NS('Service');

Service.WorkspaceKeyDecryptSoftError = function () {
    var error = Error.apply(this, arguments);
    this.stack = error.stack
}

Service.WorkspaceKey = Ember.Object.extend(
    Ember.Evented,
    {

        /**
         * @DI Service.Coder
         */
        coder: null,
        /**
         * @DI Service.Auth
         */
        auth: null,

        /**
         * @DI store:main
         */
        store: null,

        /**
         * @DI service:keytransfer
         */

        keytransfer: null,

        membersToApprove: null,
        workspace: null,
        workspaceKey: null,

        checkInterval: 60000,
        checkIntervalId: null,

        init: function () {
            this._super(this, arguments);
        },

        startChecking: function (workspace) {
            // start checking interval
            this.set('checkIntervalId', setInterval(
                function () {
                    this.checkWorkspaceKey(workspace);
                }.bind(this),
                this.get('checkInterval')
            ));
        },

        stopChecking: function () {
            clearInterval(this.get('checkIntervalId'));
        },

        checkWorkspaceKey: function (workspace) {
            this.get('store').find('Workspace', workspace.get('id'))
                .then(function (workspaceCheck) {
                    if (workspaceCheck.get('membership.status') == Vaultier.Member.proto().statuses['MEMBER'].value) {
                        this.stopChecking();
                        workspace.reloadRecord()
                            .then(function () {
                                this.selectWorkspace(workspace);
                                $.notify(
                                    ['Keys to workspace "{workspace}" has been transfered to you. ',
                                        'You can now fully work with workspace']
                                        .join('')
                                        .replace('{workspace}', workspace.get('name')),
                                    {
                                        autoHideDelay: 10000
                                    }
                                )
                                this.trigger('keyTransfered', workspace)
                            }.bind(this))
                    }
                }.bind(this))

        },

        selectWorkspace: function (workspace) {

            this.set('membersToApprove', null)
            this.set('workspace', workspace)

            if (workspace) {
                this.stopChecking();

                var cryptedKey = workspace.get('membership.workspace_key');
                var workspaceKey = null;
                workspace.set('keyError', false);

                if (this.hasValidWorkspaceKey()) {
                    try {
                        workspaceKey = this.get('keytransfer').decryptWorkspaceKey(cryptedKey)
                    } catch (error) {
                        console.error(error.stack)
                        workspace.set('keyError', true);
                    }

                    this.set('workspaceKey', workspaceKey)
                } else {
                    this.startChecking(workspace);
                }
            } else {
                this.set('workspaceKey', null)
            }
        },

        /**
         * Returns whether current user has valid key on current selected workspace
         * @return bool
         */
        hasValidWorkspaceKey: function () {
            var workspace = this.get('workspace');
            return workspace.get('membership.status') == Vaultier.Member.proto().statuses['MEMBER'].value;
        },

        transferKeyToCreatedWorkspace: function (workspace) {
            var keytransfer = this.get('keytransfer');
            var decryptedKey = keytransfer.generateWorkspaceKey();
            return keytransfer.transferKeyToMember(workspace.get('membership.id'), decryptedKey)
        },

        decryptWorkspaceData: function (data) {
            var coder = this.get('coder');
            var workspace = this.get('workspace')

            // this is code for test mocking
            // to be used later in mocks
//            if (!this.get('test')) {
//                Ember.run.later(function () {
//                    console.log('trigger');
//                    this.trigger('keyTransfered', workspace)
//                }.bind(this), 1000)
//                this.set('test', true);
//                throw new Service.WorkspaceKeyDecryptSoftError('Cannot decrypt: workspace.membership.status {status}'.replace('{status}', workspace.get('membership.status')))
//            }


            if (!workspace) {
                throw new Error('Workspace not selected')
            }

            if (this.hasValidWorkspaceKey) {
                var workspaceKey = this.get('workspaceKey');
                data = coder.decryptWorkspaceData(data, workspaceKey)
                data = JSON.parse(data)
                return data
            } else {
                throw new Service.WorkspaceKeyDecryptSoftError('Cannot decrypt: workspace.membership.status {status}'.replace('{status}', workspace.get('membership.status')))
                return null
            }
        },

        encryptWorkspaceData: function (data) {
            var coder = this.get('coder');
            var workspace = this.get('workspace')
            if (!workspace) {
                throw new Error('Workspace not selected')
            }

            if (this.hasValidWorkspaceKey) {
                var workspaceKey = this.get('workspaceKey');
                data = JSON.stringify(data)
                return coder.encryptWorkspaceData(data, workspaceKey)
            } else {
                throw new Error('Cannot encrypt. workspace.membership.status {status}'.replace('{status}', workspace.get('membership.status')))
            }

        }


    });



Po.NS('Service');

Service.KeyTransfer = Ember.Object.extend({


    /**
     * @DI Service.Coder
     */
    coder: null,

    /**
     * @DI service:auth
     */
    auth: null,

    /**
     * @DI store:main
     */
    store: null,

    interval: 60000,

    _registeredQuery: null,

    init: function () {
        this._super.apply(this, arguments);
        this.register();
    },

    destroy: function () {
        this.unregister();
        this._super.apply(this, arguments);
    },

    register: function () {
        if (this._registeredQuery) {
            throw Error('Already registered')
        }

        var query = this._query.bind(this);
        this._registeredQuery = setInterval(query, this.interval)
        query();
    },

    unregister: function () {
        clearInterval(this._registeredQuery)
        this._registeredQuery = null
    },

    _query: function () {
        if (this.get('auth.isAuthenticated')) {
            this.get('store')
                .find('WorkspaceKey')
                .then(function (members) {
                    var promises = []
                    members.forEach(function (member) {
                        // do only for foreign memberships
                        if (member.get('user') != this.get('auth.user.id')) {

                            // for each member
                            var workspaceId = member.get('workspace');
                            if (workspaceId) {
                                this.get('store').find('Workspace', workspaceId)
                                    .then(function (workspace) {
                                        try {
                                            var encryptedKey = workspace.get('membership.workspace_key');
                                            var decryptedKey = this.decryptWorkspaceKey(encryptedKey);
                                            promises.push(this.transferKeyToMember(member, decryptedKey));
                                        } catch (error) {
                                            console.error('Keytransfer failed for member {id}'.replace('{id}', member.get('id')))
                                            console.error(error.stack);
                                        }
                                    }.bind(this));
                            } else {
                                console.error('missing workspace id')
                            }
                        }
                    }.bind(this));

                    return Ember.RSVP.all(promises);
                }.bind(this))
        }
    },

    generateWorkspaceKey: function () {
        return this.get('coder').generateWorkspaceKey();
    },

    decryptWorkspaceKey: function (encryptedKey) {
        var key = encryptedKey;

        var coder = this.get('coder');
        var privateKey = this.get('auth.privateKey');
        key = coder.decryptWorkspaceKey(key, privateKey);
        if (!key) {
            throw new Error('Cannot decrypt workspace key')
        }
        return key
    },


    transferKeyToMember: function (member, decryptedKey) {
        var id = Utils.E.recordId(member);
        var store = this.get('store');
        var coder = this.get('coder');
        var promise =
            store.find('WorkspaceKey', id)
                .then(function (member) {
                    var publicKey = member.get('public_key')
                    var wk = coder.encryptWorkspaceKey(decryptedKey, publicKey);
                    member.set('workspace_key', wk)
                    return member.saveRecord()
                })

        return promise
    }

});



Po.NS('Service');

Service.ChangeKey = Ember.Object.extend({

    /**
     * @DI service:auth
     */
    auth: null,

    /**
     * @DI store:main
     */
    store: null,

    /**
     * @DI service:coder
     */

    coder: null,

    generateKeys: function (callback) {
        return this.get('auth').generateKeys(callback);
    },

    changeKey: function (incomingPPK) {

        if (!this.get('auth.isAuthenticated')) {
            throw Error('Only authenticated user can change his privatekey');
        }
        var currentPrivateKey = this.get('auth.privateKey');
        var incomingPrivateKey = incomingPPK.privateKey;
        var incomingPublicKey = incomingPPK.publicKey;
        var currentUser = this.get('auth.user');
        var coder = this.get('coder');

        var promise = this.get('store')
            .find('UserKey', currentUser.get('id'))
            .then(function (user) {
                // set user dirty, force update
                user.set('isDirty', true)

                // set public key for user
                user.set('public_key', incomingPublicKey)

                // update all workspace keys
                user.get('membership').forEach(function (member) {

                    //decode current workspace key
                    var workspaceKey = coder.decryptWorkspaceKey(
                        member.workspace_key,
                        currentPrivateKey
                    )

                    // encode new workspace key
                    var incomingWorkspaceKey = coder.encryptWorkspaceKey(
                        workspaceKey,
                        incomingPublicKey
                    )

                    member.workspace_key = incomingWorkspaceKey
                }.bind(this));


                return user
                    // saves new keys
                    .saveRecord()

                    // then relogin with new credentials
                    .then(function () {
                        return this.get('auth').login(currentUser.get('email'), incomingPrivateKey)
                    }.bind(this))


            }.bind(this));

        return promise;
    }


});


Po.NS('Service');

/**
 * Service is responsible of new user environment initialization
 * e.g. when user registers and has  no invitation new workspace and default vault is created
 *
 */
Service.NewUserInit = Ember.Object.extend({
    /**
     * @DI service:auth
     */
    auth: null,

    /**
     * @DI service:invitations
     */
    invitations: null,


    /**
     * @DI service:router
     */
    router: null,


    /**
     * Creates route transition function after initialization
     * @param {Vaultier.Vault}vault
     * @param {Vaultier.Workspace}workspace
     */
    createTransitionFunction: function (workspace, vault) {
        var router = this.get('router');
        if (!vault || !workspace) {
            return function () {
                router.transitionTo('index')
            }
        } else {
            return function () {
                router.transitionTo('Vault.index', workspace, vault);
            }
        }
    },


    /**
     * if condition met function creates workspace and vault for new user
     *
     * returns success promise with desired transition function,
     * which executed transition router to page desired by initialization
     *
     * resolve({
     *          transitionAfterRegister: function,
     *          createdWorkspace: Vaultier.Workspace
     *          createdVault: Vaultier.Vault
     * })
     *
     * @return {Ember.RSVP.Promise}
     */
    initializeUser: function () {
        var auth = this.get('auth');
        var invitations = this.get('invitations')

        if (!auth.get('isAuthenticated')) {
            throw new Error('User is not authenticated')
        }

        // in case there are invitations in session do nothing
        if (invitations.hasInvitationsInSession()) {
            return Ember.RSVP.resolve(this.createTransitionFunction());
        }

        // prepare variables and copywriting
        var helpers = Utils.HandlebarsHelpers.create();
        var nickname = helpers.ucfirst(auth.get('user.nickname'));
        var workspaceName = '{nickname}\'s workspace';
        var workspaceDescription = '{nickname}\'s default workspace to store vaults, cards and secrets';
        var vaultName = 'Default vault';
        var vaultDescription = '{nickname}\'s default vault to store cards and secrets';

        // prepare objects to save
        var w = new Vaultier.Workspace()
        w.setProperties({
            name: workspaceName.replace('{nickname}', nickname),
            description: workspaceDescription.replace('{nickname}', nickname)
        });

        var v = new Vaultier.Vault();
        v.setProperties({
            name: vaultName.replace('{nickname}', nickname),
            description: vaultDescription.replace('{nickname}', nickname)
        });


        // saves the object
        var promise = Ember.RSVP.resolve()
            .then(function () {
                return w.saveRecord()
            })
            .then(function () {
                v.set('workspace', w.get('id'))
                return v.saveRecord();
            })
            .then(function () {
                return new Ember.RSVP.Promise(function (resolve) {
                    resolve({
                        transitionAfterRegister: this.createTransitionFunction(w,v),
                        /**
                         * Stores default workspace if created by newuserinitservice
                         */
                        defaultWorkspace: w,
                        /**
                         * Stores default vault if created by newuserinitservice
                         */
                        defaultVault: v
                    })
                }.bind(this));
            }.bind(this))

        return promise
    }

})
;


/**
 * Handles created_at updated_at and dateformats
 */
Vaultier.CreatedUpdatedMixin = Ember.Mixin.create({
    created_at: RL.attr('date', { readOnly: true }),
    updated_at: RL.attr('date', { readOnly: true }),
    created_by: RL.attr('object',{ readOnly: true }),

    updated_ago: function () {
        var u = this.get('updated_at');
        var t;
        try {
            t = moment(u).fromNow();
        } catch (e) {
            console.error(e.stack)
        }
        return t;
    }.property('updated_at'),

    created_ago: function () {
        var u = this.get('created_at');
        var t;
        try {
            t = moment(u).fromNow();
        } catch (e) {
            console.error(e.stack)
        }
        return t;
    }.property('created_at')
});




Vaultier.MutableModel = Vaultier.MutableModel || {}

Vaultier.MutableModel.Mixin = Ember.Mixin.create({

    init: function () {
        this._super.apply(this, arguments);

        var typeField = this.get('mutableModelTypeField');
        if (!typeField) {
            throw new Error('mutableModelTypeField must be specified');
        }

        var mapping = this.get('mutableModelMapping');
        if (!mapping) {
            throw new Error('mutableModelMapping has to be specified ')
        }

        this.addObserver(typeField, this, function () {
            this.applyMutableMixin(this.getMutableType());
        })

    },

    getMutableType: function () {
        var typeField = this.get('mutableModelTypeField');
        return this.get(typeField);
    },

    getMutableClass: function (type) {
        var mapping = this.get('mutableModelMapping');
        var cls = mapping[type];
        if (!cls) {
            throw new Error('Mutation mixin class not found for type {type}'.replace('{type}', type));
        }
        return cls;
    },

    applyMutableMixin: function (type) {
        var clsName = this.getMutableClass(type);
        var cls = Ember.get(clsName);
        if (!cls)
            throw new Error('Cannot instantiate secret class mixin {mixin} for type {type}'
                .replace('{type}', type)
                .replace('{mixin}', clsName)
            );

        var applied = cls.detect(this)
        if (applied) {
            throw new Error('Cannot apply mixin {mixin}, already applied {applied}'
                .replace('{mixin}', clsName)
                .replace('{applied}', appliedMixin)
            );
        }


        cls.apply(this);
        cls.mixins.forEach(function (mixin) {
            if (mixin.properties.init) {
                mixin.properties.init.apply(this);
            }
        }.bind(this));
        this.set('mutableMixinApplied', clsName);

    }

})


Vaultier.EncryptedModel = Vaultier.EncryptedModel || {}

var getEncryptedDataKey = function (encryptedField) {
    return '_decrypted-data-' + encryptedField;
}

Vaultier.EncryptedModel.Mixin = Ember.Mixin.create({

    EncryptedModelMixedIn: true,

    /**
     * @DI service:workspacekey
     */
    workspacekey: null,

    /**
     * Overriden constructor
     * Retrieves dependencies from container
     */
    init: function () {
        this.workspacekey = Vaultier.__container__.lookup('service:workspacekey');
        this._super.apply(this, arguments);

        if (this.get('isNew')) {
            this.set('decrypted', true);
        }
    },

    /**
     map of all decrypted fields
     @property fields
     @type Ember.Map
     */
    decryptedFields: Ember.computed(function () {
        var map = Ember.Map.create();
        this.constructor.eachComputedProperty(function (name, meta) {
            if (meta.isDecryptedField) {
                map.set(name, true);
            }
        });
        return map;
    }),

    /**
     * map of all encrypted fields
     *
     * This is only solution how to retrieve properties in runtime (including mixed in computed properties over mixin.apply method)
     *
     * @property fields
     * @type Ember.Map
     *
     *
     */
    encryptedFields: Ember.computed(function () {
        var props = Ember.meta(this, false).descs;
        var map = Ember.Map.create();
        for (var k in props) {
            var p = props[k];
            if (p instanceof Ember.ComputedProperty && p._meta && p._meta.isDecryptedField) {
                map.set(p._meta.encryptedField, true);
            }
        }
        return map;
    }),


    /**
     map of all dirty encrypted fields
     @property fields
     @type Ember.Map
     */
    getDirtyEncryptedFields: function () {
        var map = Ember.Map.create();
        this.get('encryptedFields').forEach(function (encryptedField) {
            var data = this.getDecryptedData(encryptedField);
            if (data && data.isDirty) {
                map.set(encryptedField, true);
            }
        }.bind(this));
        return map;
    },

    areDecryptedDataDirty: function (decryptedData) {
        var dataKeys = Ember.keys(decryptedData['data']);
        var cleanDataKeys = Ember.keys(decryptedData['cleanData']);
        if (dataKeys.length !== cleanDataKeys.length) {
            return true;
        }
        for (var i = 0; i < dataKeys.length; i++) {
            var key = dataKeys[i];
            if (Ember.get(decryptedData, 'data.' + key) != Ember.get(decryptedData, 'cleanData.' + key)) {
                return true;
            }
        }
        return false;
    },

    setDecryptedData: function (encryptedField, data, initial) {
        var key = getEncryptedDataKey(encryptedField);
        var data = data || {};

        var decryptedData = {
            cleanData: data.cleanData || {},
            data: data,
            isDirty: null
        }

        if (initial) {
            decryptedData.cleanData = Ember.merge({}, data)
            decryptedData.isDirty = false;
        } else {
            decryptedData['isDirty'] = this.areDecryptedDataDirty(decryptedData)
        }

        this.set(key, decryptedData)
    },

    clearDecryptedData: function () {
        this.get('encryptedFields').forEach(function (encryptedField) {
            this.setDecryptedData(encryptedField);
        }.bind(this));
    },

    getDecryptedData: function (encryptedField) {
        var key = getEncryptedDataKey(encryptedField);
        var data = this.get(key);

        if (data) {
            return data;
        } else {
            this.setDecryptedData(encryptedField);
            return this.get(key);
        }
    },

    decryptField: function (encryptedField) {
        var encryptedData = this.get(encryptedField);
        var data;

        if (encryptedData) {
            data = this.workspacekey.decryptWorkspaceData(encryptedData) || {};
        }
        else {
            data = null
        }
        this.setDecryptedData(encryptedField, data, true);
    },

    decryptFields: function () {
        this.get('encryptedFields').forEach(function (encryptedField) {
            this.decryptField(encryptedField);
        }.bind(this))
    },

    encryptField: function (encryptedField) {
        var decryptedData = this.getDecryptedData(encryptedField);
        var data = this.workspacekey.encryptWorkspaceData(decryptedData['data']);
        this.set(encryptedField, data);
    },

    deserialize: function (options) {
        var deserialized = this._super.apply(this, arguments);
        deserialized.clearDecryptedData();

        this.set('decrypted', false);
        try {
            deserialized.decryptFields();
            this.set('decrypted', true);
        } catch (e) {
            this.set('decrypted', false);
            console.error('Secret decryption failed');
            console.error(e.stack);
            throw e
        }

        return deserialized;
    },

    serialize: function (options) {
        this.getDirtyEncryptedFields().forEach(function (encryptedField) {
            this.encryptField(encryptedField);
        }.bind(this));
        return this._super.apply(this, arguments);
    }
})

/**
 * Each field to be automatically decrypted/encrypted should be marked by this model attribute decorator
 * @param encryptedField {String} source encrypted field out of which decrypted field will be decrypted
 * @param decryptedField {String} name of decrypted field to be contained in decrypted {} out of encrypted field
 */
Vaultier.EncryptedModel.decryptedField = function (encryptedField, decryptedField) {
    return Ember.computed(function (key, value) {
        if (!Vaultier.EncryptedModel.Mixin.detect(this)) {
            throw new Error('Only models with mixin Vaultier.EncryptedModelMixin can have decryptedField');
        }

        // decryptedField is optional, if encrypted stored key differs from field name
        if (decryptedField) {
            key = decryptedField
        }

        // retrieve decrypted data from cache
        var data = this.getDecryptedData(encryptedField);

        // Getter
        if (arguments.length === 1) {
            if (data) {
                return Ember.get(data, 'data.' + key);
            } else {
                return undefined
            }
        }

        // Setter
        else {
            Ember.set(data, 'data.' + key, value);
            Ember.set(data, 'isDirty', this.areDecryptedDataDirty(data));
            this.set('isDirty', true);
            return this
        }


    }).property(getEncryptedDataKey(encryptedField))
        .meta({
            encryptedField: encryptedField,
            isDecryptedField: true
        })
}


Vaultier.RollbackMixin = Ember.Mixin.create({

    init: function () {
        this._super.apply(this, arguments);

        this.on('didLoad', function () {
            this.storeCleanValues();
        }.bind(this));
        this.on('didUpdate', function () {
            this.storeCleanValues();
        }.bind(this));
        this.on('didCreate', function () {
            this.storeCleanValues();
        }.bind(this));

        this.storeCleanValues();
    },

    cleanValues: {},

    storeCleanValues: function () {
        this.set('cleanValues', {});
        Ember.get(this.constructor, 'fields').forEach(function (field) {
            this.set('cleanValues.' + field, this.get(field));
        }.bind(this));
    },

    rollback: function () {
        if (this.get('isSaving')) {
            throw Error('Cannot rollback. Record is in state isSaving.')
        }
        Ember.get(this.constructor, 'fields').forEach(function (field) {
            this.set(field, this.get('cleanValues.' + field));
        }.bind(this));
        this.set('isDirty', false);
    }

});


Vaultier.JSONSerializer = RESTless.JSONSerializer.extend({
    // Vaultier posts are native jsons without root
    serialize: function (resource, options) {
        options = options || {};
        options.nonEmbedded = true;
        return this._super.apply(this, [resource, options]);
    },

    keyForResourceName: function (name) {
        return name
    },

    // Vaultier does not use camelizations
    attributeNameForKey: function (klass, key) {
        return key;
    }
});

Vaultier.RESTAdapter = RL.RESTAdapter.extend({
    url: '/',
    namespace: 'api',

    serializer: Vaultier.JSONSerializer.create(),

    buildUrl: function (model, key) {
        var resourcePath = this.resourcePath(Ember.get(model.constructor, 'resourceName'));
        var resourceListFormat = Ember.get(model.constructor, 'resourceListFormat');
        var resourceDetailFormat =  Ember.get(model.constructor, 'resourceDetailFormat');
        var resourceFormat
        var rootPath = this.get('rootPath');
        var primaryKeyName = Ember.get(model.constructor, 'primaryKey');
        var dataType = ''
        var url;
        var id = '';

        if (key) {
            id = key;
        } else if (model.get(primaryKeyName)) {
            id = model.get(primaryKeyName);
        }

        if (this.get('useContentTypeExtension') && dataType) {
            var dataType = this.get('serializer.dataType');
        }

        if (!resourceListFormat) {
            resourceListFormat = '{rootPath}/{resourcePath}/{dataType}'
        }

        if (!resourceDetailFormat) {
            resourceDetailFormat = '{rootPath}/{resourcePath}/{id}/{dataType}'
        }

        resourceFormat = id ? resourceDetailFormat : resourceListFormat

        var url = resourceFormat
            .replace('{rootPath}',rootPath)
            .replace('{resourcePath}', resourcePath)
            .replace('{id}', id)
            .replace('{dataType}', dataType)

        return url;
    }
}).create()

Vaultier.RESTAdapter.registerTransform('object', {
    deserialize: function (native) {
        return native;
    },
    serialize: function (deserialized) {
        return deserialized
    }
});

Vaultier.Client = RL.Client.create({
    adapter: Vaultier.RESTAdapter,

    createRecord: function (cls, data) {
        return Vaultier[cls].create(data);
    },

    find: function () {
        var model = arguments[0];
        var params = arguments[1];
        return Vaultier[model].fetch(params)
    }

});




Vaultier.User = RL.Model.extend(
    Vaultier.CreatedUpdatedMixin,
    Vaultier.RollbackMixin,
    {
        email: RL.attr('string'),
        nickname: RL.attr('string'),
        public_key: RL.attr('string'),

        saveRecord : function() {
            var email = this.get('email');
            if (email) {
                this.set('email', email.toLowerCase());
            }
            return this._super.apply(this, arguments);
        }

    });



Vaultier.UserKey = RL.Model.extend({
        public_key: RL.attr('string'),
        membership: RL.attr('object')
    });

Vaultier.UserKey.reopenClass({
    resourceDetailFormat: '{rootPath}/users/{id}/key/'
})



Vaultier.Workspace = RL.Model.extend(
    Vaultier.CreatedUpdatedMixin,
    Vaultier.RollbackMixin,
    {
        init: function () {
            this.set('workspacekey', Vaultier.__container__.lookup('service:workspacekey'))
            return this._super.apply(this, arguments);
        },

        /**
         * @DI service:workspacekey
         */
        workspacekey: null,

        /**
         * Managed by Service.WorkspaceKey, True when key cannot be decrypted
         */
        keyError: false,

        name: RL.attr('string'),
        slug: RL.attr('string'),
        description: RL.attr('string'),
        perms: RL.attr('object', { readOnly: true }),
        membership: RL.attr('object', { readOnly: true }),


        /**
         * Returns if user given by membership has workspacekey
         */
        hasValidKey: function () {
            return this.get('membership.status') == Vaultier.Member.proto().statuses['MEMBER'].value
        }.property('membership.status'),


        saveRecord: function () {
            var isNew = this.get('isNew');
            var promise = this._super.apply(this, arguments)
            var workspace = this;
            if (isNew) {
                // after save, approve workspace
                promise = promise
                    .then(function () {
                        return this.get('workspacekey').transferKeyToCreatedWorkspace(workspace)
                    }.bind(this))
                    .then(function () {
                        return workspace.reloadRecord()
                    }.bind(this))
            }

            return promise
        }


    }
)
;



Vaultier.WorkspaceKey = RL.Model.extend(
    {
        public_key: RL.attr('string'),
        workspace_key: RL.attr('longs'),
        status: RL.attr('string'),
        workspace: RL.attr('object'),
        user: RL.attr('object')
    })



'use strict';

Vaultier.Member = RL.Model.extend(
    Vaultier.CreatedUpdatedMixin,
    {
        status: RL.attr('number'),
        email: RL.attr('string'),
        nickname: RL.attr('string'),
        user: RL.attr('object'),
        workspace: RL.attr('object'),

        statuses: new Utils.ConstantList({
            'INVITED': {
                value: 100,
                text: 'INVITED'
            },
            'MEMBER_WITHOUT_WORKSPACE_KEY': {
                value: 200,
                text: 'MEMBER_WITHOUT_WORKSPACE_KEY'
            },
            'MEMBER': {
                value: 300,
                text: 'MEMBER'
            }
        })

    });




Vaultier.Invitation = RL.Model.extend(
    Vaultier.CreatedUpdatedMixin,
    {
        invitation_email: RL.attr('string'),
        invitation_hash: RL.attr('string'),
        status: RL.attr('number'),
        roles: RL.hasMany('Vaultier.InvitationRole')
    })

Vaultier.Invitation.reopenClass({
    primaryKey: 'invitation_hash'
});

Vaultier.InvitationRole = RL.Model.extend(
    Vaultier.CreatedUpdatedMixin,
    {
        to_name: RL.attr('string'),
        to_type: RL.attr('number'),

        name: function () {
            var Role = Vaultier.Role.proto();
            var type = this.get('to_type');
            var to_name = this.get('to_name');
            if (type == Role.types['TO_WORKSPACE'].value) {
                return 'Invited to workspace "{to_name}"'.replace('{to_name}', to_name)
            }

            if (type == Role.types['TO_VAULT'].value) {
                return 'Invited to vault "{to_name}"'.replace('{to_name}', to_name)
            }

            if (type == Role.types['TO_CARD'].value) {
                return 'Invited to card "{to_name}"'.replace('{to_name}', to_name)
            }

        }.property('to_name', 'to_type')


    })


Vaultier.Role = RL.Model.extend(
    Vaultier.CreatedUpdatedMixin,
    Vaultier.RollbackMixin,
    {

        auth: null,

        init: function() {
            this.set('auth', Vaultier.__container__.lookup('service:auth'))
            return this._super.apply(this, arguments);
        },


        level: RL.attr('number'),
        member: RL.attr('object'),
        to_workspace: RL.attr('object'),
        to_vault: RL.attr('object'),
        to_card: RL.attr('object'),

        roles: new Utils.ConstantList({
            'CREATE': {
                value: 50,
                text: 'Create new',
                desc:'Can read this object. Can create new child objects. Can modify, delete, invite and grant permissions to created objects'
            },
            'READ': {
                value: 100,
                desc: 'Can read this object and all child objects',
                text: 'View only'
            },
            'WRITE': {
                value: 200,
                text: 'Manage',
                desc: 'Can create, modify, delete, invite and grant permissions to this object and all child objects'
            }
        }),

        types: new Utils.ConstantList({
            'TO_WORKSPACE': {
                value: 100,
                text: 'TO_WORKSPACE'
            },
            'TO_VAULT': {
                value: 200,
                text: 'TO_VAULT'
            },
            'TO_CARD': {
                value: 300,
                text: 'TO_CARD'
            }
        }),

        isCurrentUser: function() {
            var auth = this.get('auth');
            var id = auth.get('user.id')
            return this.get('member.user') == id;
        }.property('member.user'),

        isMember : function() {
            return this.get('member.status') == Vaultier.Member.proto().statuses['MEMBER'].value;
        }.property('member.status'),

        isInvited : function() {
            return this.get('member.status') == Vaultier.Member.proto().statuses['INVITED'].value;
        }.property('member.status'),

        isMemberWithoutKeys : function() {
            return this.get('member.status') == Vaultier.Member.proto().statuses['MEMBER_WITHOUT_WORKSPACE_KEY'].value;
        }.property('member.status'),

        printableDesc: function() {
            var val = this.roles.getByValue(this.get('level'));
            if (val) {
                return val.desc
            } else {
                return 'Unknown role level'
            }

        }.property('level'),

        printableName: function() {
            var val = this.roles.getByValue(this.get('level'));
            if (val) {
                return val.text
            } else {
                return 'Unknown role level'
            }
        }.property('level')

    });




Vaultier.Vault = RL.Model.extend(
    Vaultier.CreatedUpdatedMixin,
    Vaultier.RollbackMixin,
    {
        name: RL.attr('string'),
        slug: RL.attr('string'),
        workspace: RL.attr('number'),
        description: RL.attr('string'),
        perms: RL.attr('object')

    });



Vaultier.Card = RL.Model.extend(
    Vaultier.CreatedUpdatedMixin,
    Vaultier.RollbackMixin,
    {
        name: RL.attr('string'),
        slug: RL.attr('string'),
        description: RL.attr('string'),
        vault: RL.attr('number'),
        perms: RL.attr('object')
    });


var decryptedField = Vaultier.EncryptedModel.decryptedField;

Vaultier.Secret = RL.Model.extend(
    Vaultier.CreatedUpdatedMixin,
    Vaultier.EncryptedModel.Mixin,
    Vaultier.MutableModel.Mixin,
    {
        mutableModelTypeField: 'type',
        mutableModelMapping: {
            100: 'Vaultier.SecretNoteMixin',
            200: 'Vaultier.SecretPasswordMixin',
            300: 'Vaultier.SecretFileMixin'
        },

        types: new Utils.ConstantList({
            'NOTE': {
                value: 100,
                text: 'NOTE'
            },
            'PASSWORD': {
                value: 200,
                text: 'PASSWORD'
            },
            'FILE': {
                value: 300,
                text: 'FILE'
            }
        }),

        type: RL.attr('number'),
        data: RL.attr('string'),
        blob_meta: RL.attr('string'),
        card: RL.attr('number'),
        perms: RL.attr('object'),
        name: RL.attr('string')

    });

Vaultier.SecretNoteMixin = Ember.Mixin.create({
    note: decryptedField('data', 'note'),

    isNote: function () {
        return this.get('type') == this.types['NOTE'].value;
    }.property('type')

})

Vaultier.SecretPasswordMixin = Ember.Mixin.create({
    password: decryptedField('data', 'password'),
    username: decryptedField('data', 'username'),
    url: decryptedField('data', 'url'),
    note: decryptedField('data', 'note'),

    isPassword: function () {
        return this.get('type') == this.types['PASSWORD'].value;
    }.property('type')
})

Vaultier.SecretFileMixin = Ember.Mixin.create({
    /**
     * blob_meta encrypted attrs
     */
    filename: decryptedField('blob_meta', 'filename'),
    filesize: decryptedField('blob_meta', 'filesize'),
    filetype: decryptedField('blob_meta', 'filetype'),

    /**
     * data encrypted attrs
     */
    password: decryptedField('data', 'password'),
    username: decryptedField('data', 'username'),
    url: decryptedField('data', 'url'),
    note: decryptedField('data', 'note'),

    blob: null,

    /**
     * @DI store:main
     */
    store: null,

    init: function () {
        this.set('store', Vaultier.__container__.lookup('store:main'))
        this.on('didLoad', this, this.emptyBlob)
        this.on('didReload', this, this.emptyBlob)
        this.emptyBlob();
    },

    isFile: function () {
        return this.get('type') == this.types['FILE'].value;
    }.property('type'),

    emptyBlob: function () {
        this.set('blob', new Vaultier.SecretBlob({
            id: this.get('id')
        }));
    },


    loadBlob: function () {
        var blob = this.get('blob');
        if (!blob.get('isNew')) {
            return Ember.RSVP.resolve(blob)
        } else {
            var promise = this.get('store')
                .find('SecretBlob', this.get('id'))
                .then(function (blob) {
                    this.set('blob', blob);
                    return blob;
                }.bind(this));
            return promise;
        }
    },

    saveRecord: function () {
        var blob = this.get('blob');
        return this
            ._super.apply(this, arguments)
            .then(function () {
                blob.set('id', this.get('id'))
                blob.saveRecord();
            }.bind(this))
            .then(this.emptyBlob.bind(this))
    }

})

Vaultier.SecretBlob = RL.Model.extend(
    Vaultier.EncryptedModel.Mixin,
    {
        blob_meta: RL.attr('string'),
        blob_data: RL.attr('string'),

        filename: decryptedField('blob_meta', 'filename'),
        filesize: decryptedField('blob_meta', 'filesize'),
        filetype: decryptedField('blob_meta', 'filetype'),
        filedata: decryptedField('blob_data', 'filedata'),

        /**
         * @DI service:workspacekey
         */
        workspacekey: null,

        serialize: function () {
            data = this._super.apply(this, arguments)
            var formData = new FormData()
            formData.append('blob_data', new Blob([data['blob_data']], { type: 'application/octet-stream'}))
            formData.append('blob_meta', data['blob_meta']);
            return formData
        },

        saveRecord: function () {
            if (this.get('isDirty')) {
                var params = {
                    url: '/api/secret_blobs/' + this.get('id') + '/',
                    type: 'PUT',
                    data: this.serialize(),
                    processData: false,
                    contentType: false
                };
                return Utils.RSVPAjax(params)
            } else {
                return Ember.RSVP.resolve(this);
            }
        }
    });


//# sourceMappingURL=core.js.map