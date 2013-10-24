Vaultier.MemberIndexRoute = Ember.Route.extend({

    setupController: function (ctrl) {
        // set breadcrumbs
        ctrl.set('breadcrumbs',
            Vaultier.Breadcrumbs.create({router: this.get('router')})
                .addHome()
                .addWorkspace()
                .addText('Collaborators')
        )
    }
});

Vaultier.MemberIndexView = Ember.View.extend({
    templateName: 'Member/MemberIndex',
    layoutName: 'Layout/LayoutStandard',

    didInsertElement: function () {
        $(document).ready(function () {
            $('body [data-toggle=tooltip]').tooltip();
        })
    }
});

