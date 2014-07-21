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
        this._super.apply(this, arguments);
        Vaultier.LayoutSearchBoxViewVaultTpl = this.vaultTpl = Vaultier.LayoutSearchBoxViewVaultTpl || Handlebars.compile(this.vaultTpl);
        Vaultier.LayoutSearchBoxViewCardTpl = this.cardTpl = Vaultier.LayoutSearchBoxViewCardTpl || Handlebars.compile(this.cardTpl);
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
            onChange: function(){
                "use strict";
                this.clearCache();
            },
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
                        var result = [];
                        data.cards.forEach(function (card) {
                            sort++;
                            card.id = card.slug;
                            card.sort = sort;
                            card.type = 'card';
                            card.uid = 'c-' + card.id;
                            result.push(Ember.Object.create(card));
                        });

                        data.vaults.forEach(function (vault) {
                            sort++;
                            vault.id = vault.slug;
                            vault.sort = sort;
                            vault.type = 'vault';
                            vault.uid = 'v-' + vault.id;
                            result.push(Ember.Object.create(vault));
                        });

                        callback(result);
                    }
                });
            }
        });

        var selectize = input[0].selectize;

        selectize.on('item_add', function (value) {
            var item = selectize.options[value];

            selectize.clearOptions();
            selectize.refreshOptions(true);

            selectize.blur();

            navigate(item);
        });

        selectize.on('load', function(result){
            "use strict";
            var $control = selectize.$control;
            if (!result || result.length) {
                $control.removeClass('has-error');
            } else {
                $.notify('No matches found', 'error');
                $control.addClass('has-error');
            }
        });


    }
});

Vaultier.LayoutSearchBoxController = Ember.Controller.extend({
});


/**
 * {{dot-dot-dot value=body height="40"}}
 */
Vaultier.DotDotDotComponent = Ember.Component.extend({
  tagName: 'span',

  // Maximum height before the ellipse kicks in.
  height: 40,

  didInsertElement: function() {
      this._super();
      this.updateDOM();
  },

  // {Observer} Watches for content changes
  _contentDidChange: function() {
    this.updateDOM();
  }.observes('value'),

  // Updates the DOM with the current values
  updateDOM: function() {
    var height = parseInt(this.get('height'), 10) || 40;
    if(this.get('state') === 'inDOM') {
      this.$().text(this.get('value'));
      this.$().dotdotdot({ height: height });
    }
  }
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



//# sourceMappingURL=layout.js.map