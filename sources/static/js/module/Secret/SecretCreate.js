Vaultier.SecretCreateSelectRoute = Ember.Route.extend({

    setupController: function (ctrl, model) {
        ctrl.set('content', {});
        ctrl.set('tab', 'select');
        ctrl.set('submitButtonHidden', true);

        // set breadcrumbs
        ctrl.set('breadcrumbs',
            Vaultier.Breadcrumbs.create({router: this.get('router')})
                .addHome()
                .addWorkspace()
                .addVault()
                .addCard()
                .addText('Create new secret')
        );
    },

    renderTemplate: function () {
        this.render('SecretCreate');
        this.render('SecretTypeSelect', {outlet: 'tab', into: 'SecretCreate'});
    }
});

Vaultier.SecretCreateSubmitRoute = Ember.Route.extend({

    model: function () {
        var store = this.get('store');
        var record = store.createRecord('Secret');
        return record;
    },

    afterModel: function (model, transition) {
        switch (transition.params.type) {
            case 'file' :
                this.template = 'SecretTypeFile';
                break;
            case 'password' :
                this.template = 'SecretTypePassword';
                break;
            default:
                this.template = 'SecretTypeNote';
        }
    },

    setupController: function (ctrl, model) {
        ctrl.set('content', model);
        ctrl.set('tab', 'submit');

        // set breadcrumbs
        ctrl.set('breadcrumbs',
            Vaultier.Breadcrumbs.create({router: this.get('router')})
                .addHome()
                .addWorkspace()
                .addVault()
                .addCard()
                .addText('Create new secret')
        )
    },

    renderTemplate: function () {
        this.render('SecretCreate');
        this.render(this.template, {outlet: 'tab', into: 'SecretCreate'});
    }
});

Vaultier.SecretCreateView = Ember.View.extend({
    templateName: 'Secret/SecretCreate',
    layoutName: 'Layout/LayoutStandard',

    TabView: Ember.View.extend({
        classNameBindings: 'isActive:active'.w(),
        tagName: 'li',
        isActive: function () {
            var tab = this.get('tab');

//            var target = this.get('parentView.controller.target');
//            var route = target.router.currentHandlerInfos[target.router.currentHandlerInfos.length - 1].name;
            route = this.get('controller').get('tab');

            return tab === route;
        }.property('item').cacheable()
    })

});

Vaultier.SecretCreateSelectView = Ember.View.extend({
    templateName: 'Secret/SecretCreateSelect',
});
