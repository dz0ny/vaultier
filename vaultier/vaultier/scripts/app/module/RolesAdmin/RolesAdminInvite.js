Vaultier.RolesAdminInviteRoute = Ember.Route.extend(
    {

        setupRoleLevels: function () {
                return Vaultier.dal.model.Role.proto().roles.toArray();
        },

        getDefaultRoleLevel: function () {
            return Vaultier.dal.model.Role.proto().roles['READ'].value
        },

        actions: {
            save: function (invited, role, resend) {

                Utils.Logger.log.debug(invited);
                Utils.Logger.log.debug(role);
                Utils.Logger.log.debug(resend);
                Utils.Logger.log.debug(this.get('invitations'));
                Utils.Logger.log.debug(this.get('store'));

                var invitedPromises = [];

                invited.forEach(function (emailOrId) {
                    invitedPromises.push(
                        this.get('invitations').invite(
                            this.get('tree').getSelectedNode(),
                            emailOrId,
                            role.level,
                            true,
                            resend
                        ));
                }.bind(this));

                var bulk = Ember.RSVP.all(invitedPromises)
                    .then(function () {
                        $.notify('Your invitations have been saved', 'success');
                        window.history.go(-1);
                    })
                    .catch(function (e) {
                        Utils.Logger.log.debug(e);
                        $.notify('Ooops! Something went wrong.', 'error');
                    })

                ApplicationKernel.UI.showLoaderUponPromise(bulk);

                return bulk;
            }
        },

        setupController: function (ctrl, model) {
            Utils.Logger.log.debug('Vaultier.RolesAdminInviteRoute setupController');

            ctrl.set('invited', []);
            ctrl.set('role', {level: this.getDefaultRoleLevel()});
            ctrl.set('roleLevels', this.setupRoleLevels());
            ctrl.set('defaultValue', this.getDefaultRoleLevel());
            ctrl.set('invitation_lifetime', this.get('config.invitation_lifetime'));
        },

        renderTemplate: function () {
            // this is important if you want to inherite this route https://github.com/emberjs/ember.js/issues/1872 to use proper controller
            this.render('RolesAdminInvite', {controller: this.get('controller')})
        }

    });

Vaultier.RolesAdminInviteController = Ember.Controller.extend({
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

    didInsertElement: function () {
        Utils.Logger.log.debug(this.get('parentView'));
        this.get('parentView').set('showLeftTreeNodePanel', false);
    },

    Select: Ember.Selectize.extend({
        didInsertElement: function () {
            this.renderOptions = {
                option: function (item, escape) {
                    var item = Vaultier.dal.model.Role.proto().roles.getByValue(item.data.value);
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
            var roleType = Vaultier.dal.model.Role.proto().roles.getByValue(obj.value);
            set(this, 'selection', roleType);
            set(this, 'data.level', obj.value);
        }
    })
});