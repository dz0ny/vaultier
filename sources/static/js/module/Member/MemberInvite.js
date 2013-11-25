Vaultier.MemberInviteRoute = Ember.Route.extend(
    Utils.ErrorAwareRouteMixin,
    {

        inviteObject: null,

        model: function (params, transition) {
            this.setProperties(this.setupInviteData(params));

            // check permissions
            if (!this.checkPermissions(transition, function () {
                return this.get('inviteObject.perms.invite')
            }.bind(this), true)) {
                return;
            }
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

                invited.forEach(function (emailOrId) {
                    invitedPromises.push(
                        invitations.invite(
                            inviteWorkspace,
                            emailOrId,
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
                    })
                    .fail(function () {
                        $.notify('Oooups! Something went wrong.', 'error');
                    })

                return bulk;
            }
        },

        setupController: function (ctrl, model) {
            ctrl.set('workspace', this.modelFor('Workspace'))
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
    workspace: null,
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