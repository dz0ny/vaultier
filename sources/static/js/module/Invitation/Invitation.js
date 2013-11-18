Vaultier.InvitationUseRoute = Ember.Route.extend(
    Utils.ErrorAwareRouteMixin,
    {
        model: function (params, transition) {
            transition.abort();
            return Service.Invitations.current().useInvitation(params.invitation, params.hash, params.data)
                .then(function () {
                    transition
                })
                .fail(this.handleErrors(transition))
        }
    });

Vaultier.InvitationListRoute = Ember.Route.extend(
//    Utils.ErrorAwareRouteMixin,
    {

        model: function () {
            var promise = Service.Invitations.current().listRolesInSession();
            return promise;
        },

        setupController: function (ctrl, model) {
            ctrl.set('content', model)
            ctrl.set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router')})
                    .addHome()
                    .addText('List of invitations')
            );
        }
    });


Vaultier.InvitationAcceptedRoute = Ember.Route.extend(
//    Utils.ErrorAwareRouteMixin,
    {
    });

Vaultier.InvitationAnonymousRoute = Ember.Route.extend(
//    Utils.ErrorAwareRouteMixin,
    {
    });


Vaultier.InvitationAcceptedView = Ember.View.extend({
    templateName: 'Invitation/InvitationAccepted',
    layoutName: 'Layout/LayoutStandard'
});

Vaultier.InvitationListView = Ember.View.extend({
    templateName: 'Invitation/InvitationList',
    layoutName: 'Layout/LayoutStandard'
});


Vaultier.InvitationAnonymousView = Ember.View.extend({
    templateName: 'Invitation/InvitationAnonymous',
    layoutName: 'Layout/LayoutStandard'
});
