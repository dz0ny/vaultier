Vaultier.MembersAdminRoute = Ember.Route.extend({
        model: function (params) {
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
            ctrl.set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router'), environment: this.get('environment')})
                    .addHome()
                    .addWorkspace()
                    .addText('Member management')
            );
        },

        actions: {

            /**
             * Delete the given role for a concrete member inside the actual workspace
             * @param context
             * @param role
             */
            deleteRole: function (context, role) {

                Vaultier.confirmModal(this, 'Are you sure you want to delete this permission?', function () {

                    var promise = role
                        .deleteRecord()
                        .then(function () {
                            var roles = context.get('roles');
                            roles.removeObject(role);
                            $.notify('Role has been remove', 'success');
                        }.bind(this))
                        .catch(function (error) {
                            $.notify('Oooups! Something went wrong.', 'error');
                            this.get('errors').logError(error);
                        }.bind(this));

                    ApplicationLoader.promise(promise);
                });
            },

            /**
             * Retrieves one member roles for the actual workspace
             * @param context
             * @param member
             */
            loadRoles: function (context, member) {
                var roles = context.get('roles');

                var store = this.get('store');
                var promise = store.find(
                    'Role',
                    {
                        to_member: member.get('id')
                    }).then(function (response) {
                        var memberRoles = Em.ArrayProxy.create({content: response}).toArray();

                        if (memberRoles.length) {
                            context.set('roles', memberRoles);
                        }

                        return memberRoles;
                    }.bind(this));
                ApplicationLoader.promise(promise);
            },

            /**
             * Delete a member from the workspace and all his roles inside of it
             * @param context
             * @param member
             */
            deleteMember: function (member) {
                Vaultier.confirmModal(this, 'Are you sure you want to delete this member?', function () {

                    var promise = member
                        .deleteRecord()
                        .then(function () {
                            var members = this.get('controller.content.members');
                            members.removeObject(member);
                            $.notify('Member has been remove', 'success');
                        }.bind(this))
                        .catch(function (error) {
                            $.notify('Oooups! Something went wrong.', 'error');
                            this.get('errors').logError(error);
                        }.bind(this));

                    ApplicationLoader.promise(promise);
                }.bind(this));
            }
        }
    }
);


Vaultier.MembersAdminController = Em.Controller.extend({

    members: function () {

        var user = this.get('auth.user');
        return this.get('content.members').filter(function (item, index) {
                return item.get('email') !== user.get('email');
            }
        );
    }.property('content.members.@each')
});


Vaultier.MembersAdminView = Em.View.extend({
    layoutName: 'Layout/LayoutStandard',
    templateName: 'MembersAdmin/MembersAdmin'
});


Vaultier.MembersAdminRoleItemView = Em.View.extend({
    templateName: function() {

        var role = this.get('role');

        if (role.get('to_workspace')) {
            return 'MembersAdmin/MembersAdminRoleItemWorkspace';
        } else if (role.get('to_vault')) {
            return 'MembersAdmin/MembersAdminRoleItemVault';
        } else if (role.get('to_card')) {
            return 'MembersAdmin/MembersAdminRoleItemCard';
        } else {
            throw 'Role is no of any type';
        }
    }.property('controller.role.to_workspace', 'controller.role.to_vault', 'controller.role.to_card'),

    deleteRole: function (role) {
        this.sendAction('deleteRole', role);
    }
});


/**
 * Component renders a member as a row inside a panel
 */
Vaultier.MembersAdminAccordionComponent = Em.Component.extend({

    store: null,

    layoutName: 'MembersAdmin/MembersAdminAccordion',

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
            this.sendAction('deleteMember', member);
        }
    }
})
;


//# sourceMappingURL=members_admin.js.map