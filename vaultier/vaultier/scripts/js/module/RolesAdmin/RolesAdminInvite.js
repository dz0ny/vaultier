Vaultier.RolesAdminInviteRoute = Ember.Route.extend(
    {

        inviteObject: null,

        model: function (params, transition) {
            this.setProperties(this.setupInviteData(params));

            // check permissions
            if (!this.get('auth').checkPermissions(transition, function () {
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

        getDefaultRoleLevel: function() {
            return Vaultier.Role.proto().roles['READ'].value
        },

        actions: {
            save: function (invited, role, resend) {
                var invitations = this.get('invitations');
                var inviteWorkspace = this.get('inviteWorkspace');
                var inviteParams = this.get('inviteParams');
                var invitedPromises = [];

                invited.forEach(function (emailOrId) {
                    invitedPromises.push(
                        invitations.invite(
                            inviteWorkspace,
                            emailOrId,
                            role.level,
                            inviteParams,
                            true,
                            resend
                        ));
                });

                var bulk = Ember.RSVP.all(invitedPromises)
                    .then(function () {
                        $.notify('Your invitations have been saved', 'success');
                        window.history.go(-1);
                    })
                    .catch(function () {
                        $.notify('Ooops! Something went wrong.', 'error');
                    })

                ApplicationLoader.promise(bulk);

                return bulk;
            }
        },

        setupController: function (ctrl, model) {
            ctrl.set('workspace', this.modelFor('Workspace'))
            ctrl.set('breadcrumbs', this.setupBreadcrumbs());
            ctrl.set('invited', []);
            ctrl.set('role', {level: this.getDefaultRoleLevel()});
            ctrl.set('roleLevels', this.setupRoleLevels());
            ctrl.set('defaultValue', Vaultier.Role.proto().roles.toArray()[0].value);
            ctrl.set('invitation_lifetime',this.get('config.invitation_lifetime'));
        },

        renderTemplate: function () {
            // this is important if you want to inherite this route https://github.com/emberjs/ember.js/issues/1872 to use proper controller
            this.render('RolesAdminInvite', {controller: this.get('controller')})
        }

    });

Vaultier.RolesAdminInviteController = Ember.Controller.extend({
    workspace: null,
    role: null,
    invited: [],
    resend: true,

    isSubmitDisabled: function () {
        return !this.get('invited.length') || !this.get('role.level')
    }.property('invited.length', 'role.level'),

    breadcrumbs: null
});

Vaultier.RolesAdminInviteView = Ember.View.extend({
    templateName: 'RolesAdmin/RolesAdminInvite',
    layoutName: 'Layout/LayoutStandard',

    Select: Ember.Selectize.extend({
        didInsertElement: function() {
            this.renderOptions = {
                option: function (item, escape) {
                    var item = Vaultier.Role.proto().roles.getByValue(item.data.value);
                    return [
                        '<div>',
                            '<div>' + item.text + '</div>',
                            '<div class="help-block">' + item.desc + '</div>',
                        '</div>'
                    ].join('')
                  }
              };
              this._super();
        },

        changeData: function (obj) {
            var roleType = Vaultier.Role.proto().roles.getByValue(obj.value);
            set(this, 'selection', roleType);
            set(this, 'data.level', obj.value);
        }
    })
});