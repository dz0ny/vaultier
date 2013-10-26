Vaultier.MemberInviteRoute = Ember.Route.extend({

    inviteObject: null,

    model: function (params, queryParams) {
        this.setProperties(this.setupInviteData(params));
    },

    /**
     * override this to setup invite workspace and invite to object
     */
    setupInviteData: function (params) {
        throw 'Please override this in your route'
    },

    /**
     * override this to setup invite breadcrumbs
     */
    setupBreadcrumbs: function () {
        throw 'Please override this in your route'
    },

    /**
     * override this to setup invite breadcrumbs
     */
    setupRoleLevels: function () {
        return Vaultier.Role.proto().roles.toArray();
    },

    actions: {
        save: function (invited, role) {
            var invitations = Service.Invitations.current();
            var inviteWorkspace = this.get('inviteWorkspace');
            var inviteParams = this.get('inviteParams');
            var invitedPromises = [];

            invited.forEach(function (email) {
                invitedPromises.push(
                    invitations.invite(
                        inviteWorkspace,
                        email,
                        role,
                        inviteParams,
                        true,
                        false
                    ));
            });

            var bulk = Ember.RSVP.all(invitedPromises)
                .then(function () {
                    $.notify('Your invitations has been saved', 'success');
                    window.history.go(-1);
                });

            return bulk;
        }
    },

    setupController: function (ctrl, model) {
        ctrl.set('breadcrumbs', this.setupBreadcrumbs());
        ctrl.set('content', {});
        ctrl.set('roleLevels', this.setupRoleLevels());
    },

    renderTemplate: function () {
        // this is important if you want to inherite this route https://github.com/emberjs/ember.js/issues/1872 to use proper controller
        this.render('MemberInvite', {controller: this.get('controller')})
    }

});

Vaultier.MemberInviteController = Ember.ObjectController.extend({
    invited: [],
    role: null,
    isButtonNextEnabled: function () {
        return false;

        return this.invited.length < 1;
    }.property('invited'),
    breadcrumbs: null
});

Vaultier.MemberInviteView = Ember.View.extend({
    templateName: 'Member/MemberInvite',
    layoutName: 'Layout/LayoutStandard'

});