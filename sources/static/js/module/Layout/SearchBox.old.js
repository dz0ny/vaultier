Vaultier.LayoutSearchBoxView = Ember.View.extend({
    tagName: 'span',
    templateName: 'Layout/SearchBox',

    /**
     * @DI store:main
     */
    router: null,

    didInsertElement: function () {
        // prepare handlebars typeahed templating
        var templatingEngine = {
            compile: function (template) {
                var template = Handlebars.compile(template)
                return {
                    render: function (ctx) {
                        return template(ctx)
                    }
                }
            }

        };
        var ctrl = this.get('controller')
        var el = $(this.get('element'));
        var input = el.find('input');


        var filter = function (type, data) {
            var results = [];
            var data = data[type];

            data.forEach(function (item) {

                item.value = item.name
                item.tokens = item.name.split()
                item.type = type;

                if (item.workspace) {
                    item.workspace_name = item.workspace.name
                }

                if (item.vault) {
                    item.vault_name = item.vault.name
                }

                item = Ember.Object.create(item);
                item.set('workspace', Ember.Object.create(item.get('workspace')));
                item.set('vault', Ember.Object.create(item.get('vault')));

                results.push(item)
            });
            return results
        }

        var navigate = function (datum) {

            if (datum.type == 'cards') {
                ctrl.transitionToRoute('Card.index', datum.workspace, datum.vault, datum)
//                var url = router.generate('Card.index', datum.workspace, datum.vault, datum);
//                router.replaceWith(url);
            } else {
                ctrl.transitionToRoute('Vault.index', datum.workspace, datum);
//                console.log(url)
//                router.transitionTo('Vault.index', datum.workspace, datum)
            }
        }

        input.typeahead(
            [
                {
                    limit: 5,
                    name: 'cards',
                    header: '<h4>Cards found</h4>',
                    remote: {
                        url: '/api/search/search?type=cards&query=%QUERY',
                        filter: function (data) {
                            var result = filter('cards', data)
                            return result
                        }
                    },
                    template: [
                        '<div class="vlt-line vlt-name">{{name}}</div>',
                        '<div class="vlt-line vlt-path help-block">{{workspace_name}} > {{vault_name}} > {{name}}</div>',
                        '<div class="vlt-line vlt-desc help-block">{{description}}</div>'
                    ].join(''),
                    engine: templatingEngine
                },
                {
                    limit: 5,
                    name: 'vaults',
                    header: '<h4>Vaults found</h4>',
                    remote: {
                        url: '/api/search/search?type=vaults&query=%QUERY',
                        filter: function (data) {
                            var result = filter('vaults', data)
                            return result
                        }
                    },
                    template: [
                        '<div class="vlt-line vlt-name">{{name}}</div>',
                        '<div class="vlt-line vlt-path help-block">{{workspace_name}} >  {{name}}</div>',
                        '<div class="vlt-line vlt-desc help-block">{{description}}</div>'
                    ].join(''),
                    engine: templatingEngine
                }
            ]);
        el.find('.tt-hint').addClass('form-control');

        input.on('typeahead:autocompleted', function (e, datum) {
            console.log('done')
//            Ember.run.later(ctrl, function() {
//                navigate(datum)
//            }, 250)
        });


        //debug
//        Ember.run.later(this, function () {
//            input.eq(0).val("a").trigger("input");
//        }, 100)
    }

});

Vaultier.LayoutSearchBoxController = Ember.Controller.extend({
});
