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
        var router = this.get('router');

        var navigate = function (item) {

            if (item.type == 'card') {
                var url = router.generate('Card.index', item.workspace.slug, item.vault.slug, item.slug).replace('#','')
                ctrl.transitionToRoute(url)
            } else {
                var url = router.generate('Vault.index', item.workspace.slug, item.slug).replace('#', '')
                ctrl.transitionToRoute(url)
            }
        }

        input.selectize({
            valueField: 'uid',
            labelField: 'name',
            searchField: 'name',
            sortField: 'sort',
            highlight: false,
            options: [],
            create: false,
            onType: function(s) {
              if (s.trim()=='') {
                  this.clearOptions();
                  this.refreshOptions(true);
              }
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
        selectize.on('item_add', function (value, item) {
            navigate(selectize.options[value]);
        })


    }
});

Vaultier.LayoutSearchBoxController = Ember.Controller.extend({
});
