Vaultier.LayoutLayoutStandardView = Ember.View.extend({
    templateName: 'Layout/LayoutStandard'
});

Vaultier.LayoutLayoutWindowView = Ember.View.extend({
    templateName: 'Layout/LayoutStandard'
});

Vaultier.LayoutFooterView = Ember.View.extend({
    templateName: 'Layout/Footer'
});


Vaultier.LayoutSecurityBoxView = Ember.View.extend({
    tagName: 'span',
    templateName: 'Layout/SecurityBox',

    actions: {
        logout: function () {
            ApplicationLoader.showLoader();
            var auth = this.get('controller.auth');
            auth.logout();
        }
    },

    didInsertElement: function () {
        var el = Ember.$(this.get('element')).find('.copy-token');
        el.click(function (e) {
            e.preventDefault();
            window.prompt("token", el.attr('href'));
        })

    }

});

Vaultier.LayoutSecurityBoxController = Ember.Controller.extend({
    showToken: function () {
        return this.get('config.FT_FEATURES.dev_show_token')
    }.property('showToken')
});


Vaultier.LayoutSearchBoxViewVaultTpl = null;
Vaultier.LayoutSearchBoxViewCardTpl = null;

Vaultier.LayoutSearchBoxView = Ember.View.extend({
    tagName: 'span',
    templateName: 'Layout/SearchBox',

    vaultTpl: [
        '<div class="vlt-search-result vlt-{{type}}">',
        '<div class="vlt-line vlt-name">{{name}}</div>',
        '<div class="vlt-line vlt-path help-block">{{workspace.name}} >  {{name}}</div>',
        '<div class="vlt-line vlt-desc help-block">{{description}}</div>',
        '</div>'
    ].join(''),

    cardTpl: [
        '<div class="vlt-search-result vlt-{{type}}">',
        '<div class="vlt-line vlt-name">{{name}}</div>',
        '<div class="vlt-line vlt-path help-block">{{workspace.name}} > {{vault.name}} > {{name}}</div>',
        '<div class="vlt-line vlt-desc help-block">{{description}}</div>',
        '</div>'
    ].join(''),

    init: function () {
        this._super.apply(this, arguments)
        Vaultier.LayoutSearchBoxViewVaultTpl = this.vaultTpl = Vaultier.LayoutSearchBoxViewVaultTpl || Handlebars.compile(this.vaultTpl)
        Vaultier.LayoutSearchBoxViewCardTpl = this.cardTpl = Vaultier.LayoutSearchBoxViewCardTpl || Handlebars.compile(this.cardTpl)
    },

    willDestroyElement: function () {
        var el = $(this.get('element'));
        var input = el.find('select');
        var selectize = input[0].selectize;
        selectize.destroy();
    },

    didInsertElement: function () {
        var ctrl = this.get('controller')
        var el = $(this.get('element'));
        var input = el.find('select');
        var vaultTpl = this.get('vaultTpl')
        var cardTpl = this.get('cardTpl')
        var sort = 0;

        var navigate = function (item) {
            if (item.type == 'card') {
                ctrl.transitionToRoute('Secret.index', item.workspace.slug, item.vault.slug, item.slug)
            } else {
                ctrl.transitionToRoute('Cards.index', item.workspace.slug, item.slug)
            }
        }

        input.selectize({
            valueField: 'uid',
            labelField: 'name',
            searchField: 'keywords',
            sortField: 'sort',
            highlight: false,
            options: [],
            create: false,
            // onType and score rewriten to leave search on remote
            onType: function (s) {
                this.clearOptions();
                this.refreshOptions(true);
            },
            score: function (search) {
                var score = this.getScoreFunction(search);
                return function (item) {
                    return score(item) + 1;
                };
            },
            render: {
                option: function (item, escape) {
                    var html = '';
                    if (item.get('type') == 'card') {
                        html = cardTpl(item)
                    } else {
                        html = vaultTpl(item)
                    }
                    return html
                }
            },
            load: function (query, callback) {
                if (!query.length) return callback();
                $.ajax({
                    url: '/api/search/search',
                    type: 'GET',
                    data: {
                        query: query
                    },
                    error: function () {
                        callback();
                    },
                    success: function (data) {
                        result = []

                        data.cards.forEach(function (card) {
                            sort++;
                            card.id = card.slug
                            card.sort = sort
                            card.type = 'card';
                            card.uid = 'c-' + card.id
                            result.push(Ember.Object.create(card))
                        });

                        data.vaults.forEach(function (vault) {
                            sort++;
                            vault.id = vault.slug;
                            vault.sort = sort;
                            vault.type = 'vault';
                            vault.uid = 'v-' + vault.id
                            result.push(Ember.Object.create(vault))
                        });

                        callback(result)
                    }
                });
            }
        })

        var selectize = input[0].selectize;

        selectize.on('item_add', function (value) {
            var item = selectize.options[value];

            selectize.clearOptions();
            selectize.refreshOptions(true);

            selectize.blur();

            navigate(item);
        })


    }
});

Vaultier.LayoutSearchBoxController = Ember.Controller.extend({
});


Vaultier.Breadcrumbs = Ember.Object.extend({

    items: null,


    addLink: function (link, title, params, icon) {
        this.items = this.items || [];
        this.items.forEach(function (item) {
            delete item.last
        });
        if (link) {
            try {
                if (params) {
                    args = [link, params]
                } else {
                    args = [link]
                }
                link = this.router.generate.apply(this.router, args)
            } catch (e) {
                console.error(e.message);
                console.error('Breadcrumbs error during generate route (' + link + ')');
            }
        }

        title = Utils.HandlebarsHelpers.current().ellipsis(title, 25)

        if (!icon) {
            icon = '/static/vaultier/images/icon-wrench-grey.png'
        }

        this.items.push({
            link: link,
            title: title,
            icon: icon,
            last: true
        })
        return this;
    },

    addText: function (text, icon) {
        this.addLink(null, text, null, icon);
        return this;
    },

    addHome: function () {
        // disabled for better user experience
        // this.addLink('index', 'Home');
        return this;
    },

    addSettings: function() {
         //return this.addLink('Settings.index', 'Settings')
        return this
    },

    addCollaboratorsIndex: function(route) {
        return this.addLink(route, 'Collaborators', null, '/static/vaultier/images/icon-user-grey.png')
    },

    addCollaboratorsInvite : function(route) {
        return this.addLink(route, 'Invite', null, '/static/vaultier/images/icon-plus-grey.png')
    },

    addVault: function () {
        var vault = Service.Environment.current().vault;
        if (vault) {
            this.addLink('Vault.index', vault.get('name'), vault,'/static/vaultier/images/icon-vault-grey.png')
        }
        return this;
    },

    addCard: function () {
        var card = Service.Environment.current().card;
        if (card) {
            this.addLink('Card.index', card.get('name'), card,'/static/vaultier/images/icon-card-grey.png')
        }
        return this;
    },


    addWorkspace: function () {
        var workspace = Service.Environment.current().workspace;
        if (workspace) {
            this.addLink('Workspace.index', workspace.get('name'), workspace, '/static/vaultier/images/icon-workspace-grey.png')
        }
        return this;
    }

})



Vaultier.LayoutWorkspaceBoxController = Ember.Controller.extend({

    env: null,

    init: function () {
        this._super();
        this.env = Service.Environment.current();
    }

})

Vaultier.LayoutWorkspaceBoxView = Ember.View.extend({
    tagName: 'span',
    templateName: 'Layout/WorkspaceBox'
});


Vaultier.LayoutConfirmView = Ember.View.extend({
    templateName: 'Layout/Confirm',

    didInsertElement: function () {
        var el = Ember.$(this.get('element')).find('.modal');
        el.modal('show');

        el.one('hidden.bs.modal', function () {
            this.get('controller.route').disconnectOutlet({
                parent: 'application',
                outlet: 'modal'
            });
        }.bind(this));
    },

    show: function (options) {
        var ctrl = options.route.get('container').lookup('controller:LayoutConfirm');
        ctrl.setProperties(options);

        options.route.render('LayoutConfirm', {
            into: 'application',
            outlet: 'modal',
            controller: 'LayoutConfirm'
        });
    },

    actions: {
        ok: function () {
            var fn = this.get('controller.fn');
            var el = Ember.$(this.get('element')).find('.modal');
            el.one('hidden.bs.modal', fn);
            el.modal('hide');
        }

    }
});

Vaultier.LayoutConfirmController = Ember.Controller.extend({
    text: null,
    fn: null,
    route: null,
    fn: null
})

Vaultier.confirmModal = function (route, text, fn) {
    var view = route.container.lookup('view:LayoutConfirm');
    view.show({
        title: 'Confirmation',
        text: text,
        route: route,
        fn: fn
    });
}



Ember.TEMPLATES["Layout/SecurityBox"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n    <div class=\"vlt-security-box dropdown\">\r\n        ");
  data.buffer.push(escapeExpression((helper = helpers.gravatarImg || (depth0 && depth0.gravatarImg),options={hash:{
    'size': (25),
    'class': ("vlt-avatar")
  },hashTypes:{'size': "INTEGER",'class': "STRING"},hashContexts:{'size': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "auth.user.cleanValues.email", options) : helperMissing.call(depth0, "gravatarImg", "auth.user.cleanValues.email", options))));
  data.buffer.push("\r\n\r\n        <a href=\"#\" class=\"vlt-username dropdown-toggle\" data-toggle=\"dropdown\">\r\n            ");
  data.buffer.push(escapeExpression((helper = helpers.ellipsis || (depth0 && depth0.ellipsis),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","INTEGER"],data:data},helper ? helper.call(depth0, "auth.user.cleanValues.nickname", 12, options) : helperMissing.call(depth0, "ellipsis", "auth.user.cleanValues.nickname", 12, options))));
  data.buffer.push("\r\n        </a>\r\n\r\n        <ul class=\"dropdown-menu caret-right vlt-dropdown\">\r\n            <li>");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "Settings.index", options) : helperMissing.call(depth0, "link-to", "Settings.index", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\r\n            <li><a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "logout", {hash:{
    'target': ("view")
  },hashTypes:{'target': "ID"},hashContexts:{'target': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" href=\"\" >Logout</a></li>\r\n\r\n            ");
  stack1 = helpers['if'].call(depth0, "showToken", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        </ul>\r\n    </div>\r\n");
  return buffer;
  }
function program2(depth0,data) {
  
  
  data.buffer.push("Settings");
  }

function program4(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                <li><a ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'href': ("auth.token")
  },hashTypes:{'href': "ID"},hashContexts:{'href': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"copy-token\" >Copy token to clipboard</a></li>\r\n            ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n    <div class=\" vlt-security-box vlt-anonymous\">\r\n       ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-primary btn-sm"),
    'activeClass': ("")
  },hashTypes:{'class': "STRING",'activeClass': "STRING"},hashContexts:{'class': depth0,'activeClass': depth0},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "AuthLogin", options) : helperMissing.call(depth0, "link-to", "AuthLogin", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n       ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-default btn-sm"),
    'activeClass': ("")
  },hashTypes:{'class': "STRING",'activeClass': "STRING"},hashContexts:{'class': depth0,'activeClass': depth0},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "AuthRegister", options) : helperMissing.call(depth0, "link-to", "AuthRegister", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n    </div>\r\n");
  return buffer;
  }
function program7(depth0,data) {
  
  
  data.buffer.push("Login");
  }

function program9(depth0,data) {
  
  
  data.buffer.push("Create an account");
  }

  stack1 = helpers['if'].call(depth0, "auth.isAuthenticated", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["Layout/WorkspaceBox"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n    <div class=\"vlt-wspace-box dropdown\">\r\n\r\n        <img class=\"vlt-wspaceimg\" src=\"/static/vaultier/images/icon-workspace-white.png \">\r\n\r\n        <a href=\"#\" class=\"vlt-wspacename dropdown-toggle\" data-toggle=\"dropdown\">\r\n            ");
  data.buffer.push(escapeExpression((helper = helpers.ellipsis || (depth0 && depth0.ellipsis),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","INTEGER"],data:data},helper ? helper.call(depth0, "env.workspace.cleanValues.name", 20, options) : helperMissing.call(depth0, "ellipsis", "env.workspace.cleanValues.name", 20, options))));
  data.buffer.push("\r\n        </a>\r\n\r\n        <ul class=\"dropdown-menu caret-right\">\r\n            <li>\r\n                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Workspace.index", "env.workspace", options) : helperMissing.call(depth0, "link-to", "Workspace.index", "env.workspace", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            </li>\r\n\r\n            ");
  stack1 = helpers['if'].call(depth0, "env.workspace.perms.update", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n            <li class=\"divider\"></li>\r\n\r\n            <li>\r\n                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "Workspaces.select", options) : helperMissing.call(depth0, "link-to", "Workspaces.select", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            </li>\r\n\r\n        </ul>\r\n    </div>\r\n");
  return buffer;
  }
function program2(depth0,data) {
  
  
  data.buffer.push("\r\n                    Go to workspace dashboard\r\n                ");
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n            <li>\r\n                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Workspace.edit", "env.workspace", options) : helperMissing.call(depth0, "link-to", "Workspace.edit", "env.workspace", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            </li>\r\n            ");
  return buffer;
  }
function program5(depth0,data) {
  
  
  data.buffer.push("\r\n                    Setup workspace\r\n                ");
  }

function program7(depth0,data) {
  
  
  data.buffer.push("\r\n                    Switch to another workspace\r\n                ");
  }

  stack1 = helpers['if'].call(depth0, "env.workspace", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["Layout/SearchBox"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div class=\"vlt-search-box\">\n    <select placeholder=\"Search ALT+S\"></select>\n</div>\n");
  
});

Ember.TEMPLATES["Layout/Breadcrumbs"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n    <div class=\"vlt-breads\">\r\n        <div class=\"container\">\r\n            ");
  stack1 = helpers.each.call(depth0, "breadcrumbs.items", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        </div>\r\n        <div class=\"clearfix\"></div>\r\n    </div>\r\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                ");
  stack1 = helpers['if'].call(depth0, "last", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(6, program6, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                ");
  stack1 = helpers.unless.call(depth0, "last", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                    <div class=\"vlt-bread active\">\r\n                        <span class=\"vlt-bread-inner\">\r\n                            ");
  stack1 = helpers['if'].call(depth0, "icon", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                            ");
  stack1 = helpers._triageMustache.call(depth0, "title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                         </span>\r\n                    </div>\r\n                ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                                <img class=\"vlt-icon\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("icon")
  },hashTypes:{'src': "ID"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n                            ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                    <div class=\"vlt-bread\">\r\n                        <a ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'href': ("link")
  },hashTypes:{'href': "ID"},hashContexts:{'href': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"vlt-bread-inner\">\r\n                            ");
  stack1 = helpers['if'].call(depth0, "icon", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                            ");
  stack1 = helpers._triageMustache.call(depth0, "title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        </a>\r\n                    </div>\r\n                ");
  return buffer;
  }

function program8(depth0,data) {
  
  
  data.buffer.push("\r\n                    <div class=\"vlt-separator\">\r\n                    |\r\n                    </div>\r\n                ");
  }

  stack1 = helpers['if'].call(depth0, "breadcrumbs", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["Layout/LayoutStandard"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                <li>\r\n                    ");
  data.buffer.push(escapeExpression((helper = helpers.render || (depth0 && depth0.render),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "LayoutSearchBox", "LayoutWorkspaceBox", options) : helperMissing.call(depth0, "render", "LayoutSearchBox", "LayoutWorkspaceBox", options))));
  data.buffer.push("\r\n                </li>\r\n            ");
  return buffer;
  }

  data.buffer.push("<nav class=\"vlt-navbar navbar navbar-static-top navbar-default\" role=\"navigation\">\r\n    <!-- Brand and toggle get grouped for better mobile display -->\r\n    <div class=\"navbar-header\">\r\n        <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\r\n            <span class=\"sr-only\">Toggle navigation</span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n        </button>\r\n        <a class=\"navbar-brand\" href=\"#\">\r\n            <img class=\"vlt-logo\" src=\"/static/vaultier/images/logo.png\"/>\r\n            <span class=\"vlt-brand\">\r\n            Vaultier\r\n            </span>\r\n        </a>\r\n    </div>\r\n\r\n    <!-- Collect the nav links, forms, and other content for toggling -->\r\n    <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\r\n        <ul class=\"nav navbar-nav\">\r\n            ");
  stack1 = helpers['if'].call(depth0, "auth.isAuthenticated", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        </ul>\r\n        <ul class=\"nav navbar-nav navbar-right\">\r\n            <li>\r\n                ");
  data.buffer.push(escapeExpression((helper = helpers.render || (depth0 && depth0.render),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "LayoutWorkspaceBox", "LayoutWorkspaceBox", options) : helperMissing.call(depth0, "render", "LayoutWorkspaceBox", "LayoutWorkspaceBox", options))));
  data.buffer.push("\r\n            </li>\r\n            <li>\r\n                ");
  data.buffer.push(escapeExpression((helper = helpers.render || (depth0 && depth0.render),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "LayoutSecurityBox", "LayoutSecurityBox", options) : helperMissing.call(depth0, "render", "LayoutSecurityBox", "LayoutSecurityBox", options))));
  data.buffer.push("\r\n            </li>\r\n        </ul>\r\n    </div>\r\n    <!-- /.navbar-collapse -->\r\n</nav>\r\n\r\n\r\n\r\n");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "Layout/Breadcrumbs", options) : helperMissing.call(depth0, "partial", "Layout/Breadcrumbs", options))));
  data.buffer.push("\r\n\r\n<div class=\"container vlt-page\">\r\n    ");
  stack1 = helpers._triageMustache.call(depth0, "yield", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n</div>\r\n\r\n");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "Layout/Footer", options) : helperMissing.call(depth0, "partial", "Layout/Footer", options))));
  data.buffer.push("\r\n\r\n");
  return buffer;
  
});

Ember.TEMPLATES["Layout/Confirm"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"modal fade\">\r\n    <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\r\n                <h4 class=\"modal-title\">");
  stack1 = helpers._triageMustache.call(depth0, "title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <p>\r\n                    ");
  stack1 = helpers._triageMustache.call(depth0, "text", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                </p>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <a href=\"#\" type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</a>\r\n                <a href=\"#\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "ok", {hash:{
    'target': ("view")
  },hashTypes:{'target': "ID"},hashContexts:{'target': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" type=\"button\" class=\"btn btn-primary\">Ok</a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["Layout/Footer"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div id=\"vlt-footer\">\n    <div class=\"container\">\n        <div class=\"pull-left\">\n            <p>\n                <a href=\"http://rightclick.formees.cz/f/vaultier/\" class=\"btn btn-success\" target=\"_blank\">\n                    Enterprise Edition & Business Solutions\n                </a>\n                <a href=\"mailto:info@rclick.cz\" class=\"btn btn-default\">\n                    Contact us\n                </a>\n            </p>\n        </div>\n        <div class=\"pull-right\">\n            <a href=\"http://www.rclick.cz/\" target=\"_blank\">\n                <img height=\"35px\" src=\"/static/vaultier/images/rclick.png\">\n            </a></p>\n        </div>\n    </div>\n</div>\n");
  
});

//# sourceMappingURL=layout.js.map