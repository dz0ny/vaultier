Vaultier.InvitationUseRoute = Ember.Route.extend(
    Utils.ErrorAwareRouteMixin,
    {
        model: function (params, transition) {
            return Service.Invitations.current().useInvitation(transition, params.id, params.hash);
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


Vaultier.InvitationAnonymousView = Ember.View.extend({
    templateName: 'Invitation/InvitationAnonymous',
    layoutName: 'Layout/LayoutStandard'
});
