Vaultier.LayoutSearchBoxView = Ember.View.extend({
    tagName: 'span',
    templateName: 'Layout/SearchBox',

    actions: {

    },

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

        var el = $(this.get('element'));
        var input = el.find('input');

        input.typeahead({
            remote: '/static/lib/typeahead.js/example.json?q=%QUERY',
            rateLimitWait: 1000,
            template: [
                '<p class="repo-language">{{language}}</p>',
                '<p class="repo-name">{{name}}</p>',
                '<p class="repo-description">{{description}}</p>'
            ].join(''),
            engine: templatingEngine,
        });
        el.find('.tt-hint').addClass('form-control');
    }

});

Vaultier.LayoutSearchBoxController = Ember.Controller.extend({
});
