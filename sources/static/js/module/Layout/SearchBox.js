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
