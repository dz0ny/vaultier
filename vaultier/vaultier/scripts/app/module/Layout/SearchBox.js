Vaultier.LayoutSearchBoxViewNodeTpl = null;

Vaultier.LayoutSearchBoxView = Ember.View.extend({
    tagName: 'span',
    templateName: 'Layout/SearchBox',

    /**
     * @DI adapter:node
     */
    adapter: null,

    nodeTpl: [
        '<div class="vlt-search-result vlt-{{typeCss}}">',
        '<div class="vlt-left-panel">',
        '<div class="vlt-icon"></div>',
        '</div>',
        '<div class="vlt-right-panel">',
        '<div class="vlt-name">{{name}}</div>',
        '<div class="vlt-path help-block">{{path}}</div>',
        '</div>',
        '</div>'
    ].join(''),

    init: function () {
        this._super.apply(this, arguments);
        Vaultier.LayoutSearchBoxViewNodeTpl = this.nodeTpl = Vaultier.LayoutSearchBoxViewNodeTpl || Handlebars.compile(this.nodeTpl);
        this.set('adapter', Vaultier.__container__.lookup('adapter:node'));
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
        var nodeTpl = this.get('nodeTpl')
        var sort = 0;

        var navigate = function (item) {
            if (item.type == Vaultier.dal.model.Node.proto().types.FOLDER.value) {
                ctrl.transitionToRoute('Document.list', item.id);
            } else {
                ctrl.transitionToRoute('Document.detail', item.id);
            }
        }

        input.selectize({
            valueField: 'id',
            labelField: 'name',
            searchField: 'keywords',
            sortField: 'sort',
            highlight: false,
            options: [],
            create: false,
            onChange: function () {
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
                    return nodeTpl(item);
                }
            },
            load: function (query, callback) {
                if (!query.length) return callback();
                this.get('adapter')
                    .searchNodesByQuery(query)
                    .then(function (nodes) {
                        //prepare node
                        var searchedNodes = [];
                        nodes.forEach(function (node) {
                            var treeNode = Vaultier.Document.Node.create({ content: node});
                            searchedNodes.pushObject({
                                id: treeNode.get('id'),
                                name: treeNode.get('name'),
                                type: treeNode.get('type'),
                                typeCss: treeNode.get('typeCss')
                            });
                        });
                        return searchedNodes;
                    }).then(function (searchedNodes) {
                        //assign path to root for every node in result
                        var promises = [];
                        searchedNodes.forEach(function (searchedNode) {
                            var promise = this.get('adapter').loadParents(searchedNode.id).
                                then(function (parents) {
                                    //build path string to which it will be shown
                                    var path = [];
                                    parents.forEach(function (parent) {
                                        path.pushObject(parent.get('name'));
                                    });
                                    searchedNode.path = path.join(' > ');
                                    return searchedNode;
                                });
                            promises.pushObject(promise);
                        }.bind(this));
                        return Ember.RSVP.Promise.all(promises);
                    }.bind(this))
                    .then(function (searchedNodes) {
                        //show result
                        callback(searchedNodes);
                    });
            }.bind(this)
        });

        var selectize = input[0].selectize;

        selectize.on('item_add', function (value) {
            var item = selectize.options[value];

            selectize.clearOptions();
            selectize.refreshOptions(true);

            selectize.blur();

            navigate(item);
        });

        selectize.on('load', function (result) {
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
