Vaultier.MemberInviteRoute = Ember.Route.extend({

    inviteObject: null,

    model: function (params, queryParams) {
        return this.setupInviteObject();
    },

    /**
     * override this to setup invite workspace and invite to object
     */
    setupInviteObject: function () {
        this.inviteObject = this.modelFor('Vault');
        this.inviteWorkspace = this.inviteObject;
    },

    /**
     * override this to setup invite breadcrumbs
     */
    setupBreadcrumbs: function () {
        return Vaultier.Breadcrumbs.create({router: this.get('router')})
            .addHome()
            .addWorkspace()
            .addText('Invite collaborators');
    },

    actions: {
        save: function (invited, role) {
            var invitations = Service.Invitations.current();
            var promise = Ember.RSVP.resolve();
            var workspace = this.inviteWorkspace;

            invited.forEach(function (email) {
                promise.then(invitations.invite(workspace, email, role, true, false));
            });

            promise.then(function () {
                $.notify('Your invitations has been saved', 'success');
                window.history.go(-1);
            }.bind(this))

            return promise;
        }
    },

    setupController: function (ctrl, model) {
        ctrl.set('breadcrumbs', this.setupBreadcrumbs());
        ctrl.set('content', {});
        ctrl.set('roles', Vaultier.Role.proto().roles);
    }

});

Vaultier.MemberInviteController = Ember.ObjectController.extend({
    invited: [],
    role: null,
    isButtonNextEnabled: function () {
        return this.invited.length < 1;
    }.property('invited'),
    breadcrumbs: null
});

Vaultier.MemberInviteView = Ember.View.extend({
    templateName: 'Member/MemberInvite',
    layoutName: 'Layout/LayoutStandard'

});