'use strict';

Vaultier.RolesAdminManagementRoute = Vaultier.RolesAdminIndexRoute.extend({
    model: function (params, transition) {

        this.setProperties(this.setupInviteData(params));

        var workspace = this.modelFor('Workspace');

        var store = this.get('store');
        var members = store.find('Member', { workspace: workspace.get('id')})
            .then(function (response) {
                return Em.ArrayProxy.create({
                    content: response
                });
            });

        var queries = {
            workspace: workspace,
            members: members
        };
        return  Ember.RSVP.hash(queries);
    },

    setupController: function (ctrl, model) {

        ctrl.set('content', model);

        // set breadcrumbs
        ctrl.set('breadcrumbs', this.setupBreadcrumbs(model))
    },

    renderTemplate: function () {
        this.render('RolesAdminManagement', {controller: this.get('controller')});
    },
    actions: {
        deleteRole: function (context, role) {

            Vaultier.confirmModal(this, 'Are you sure you want to delete this permission?', function () {

                var promise = role
                    .deleteRecord()
                    .then(function () {
                        var roles = context.get('roles');
                        roles.removeObject(role);
                        $.notify('Role has been removed', 'success');
                    }.bind(this))
                    .catch(function (error) {
                        $.notify('Ooops! Something went wrong.', 'error');
                        this.get('errors').logError(error);
                    }.bind(this));

                ApplicationLoader.promise(promise);
            });
        },
        loadRoles: function (context, member) {
            var roles = context.get('roles');

            var store = this.get('store');
            var promise = store.find(
                'Role',
                {
                    to_workspace: member.get('workspace'),
                    to_member: member.get('id')
                }).then(function (response) {
                    var memberRoles = Em.ArrayProxy.create({content: response}).toArray();

                    context.set('roles', memberRoles);
                    return memberRoles;
                }.bind(this));
            ApplicationLoader.promise(promise);
        },
        deleteMember: function (context, member) {

            Vaultier.confirmModal(this, 'Are you sure you want to delete this member?', function () {

                var promise = member
                    .deleteRecord()
                    .then(function () {
                        var members = context.get('members');
                        members.removeObject(member);
                        $.notify('RolesAdmin has been removed', 'success');
                    }.bind(this))
                    .catch(function (error) {
                        $.notify('Ooops! Something went wrong.', 'error');
                        this.get('errors').logError(error);
                    }.bind(this));

                ApplicationLoader.promise(promise);
            });
        }
    }
});

Vaultier.RolesAdminManagementController = Vaultier.RolesAdminIndexController.extend({
    members: function () {

        var user = this.get('auth.user');
        return this.get('content.members').filter(function (item, index) {
                return item.get('email') !== user.get('email');
            }
        ).toArray();
    }.property('content.@each')
});


Vaultier.RolesAdminManagementView = Vaultier.RolesAdminIndexView.extend({
    templateName: 'RolesAdmin/RolesAdminManagement'
});


Vaultier.RolesAdminManagerAccordionComponent = Em.Component.extend({
    store: null,
    layoutName: 'RolesAdmin/RolesAdminManagerAccordion',
    buildId: function (str) {
        str = str.replace(/[@\.]/g, ' ');
        return Em.String.dasherize(str) + '-roles';
    },
    targetElement: function () {
        var str = this.buildId(this.get('member.nickname'));
        return '#' + str;
    }.property(),
    id: function () {
        return this.buildId(this.get('member.nickname'));
    }.property(),
    roles: null,
    control: null,
    member: null,
    roleLevels: function () {
        return Vaultier.Role.proto().roles.toArray();
    }.property('content.@each'),
    actions: {

        loadRoles: function () {
            this.sendAction('loadRoles', this.get('context'), this.get('member'));
        },
        deleteRole: function (role) {
            this.sendAction('deleteRole', this.get('context'), role);
        },
        deleteMember: function (member) {
            this.sendAction('deleteMember', this.get('context'), member);
        }
    }
})
;