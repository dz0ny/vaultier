/**
 *
 * Mixin to be used on routes, to provide actions for MembersList views
 *
 * @class MembersAdminListActionsMixin
 * @namespace Vaultier
 */
Vaultier.MembersAdminListActionsMixin = Ember.Mixin.create({
    actions: {
        deleteRole: function (member, role) {

            var loggedUserId = this.get('auth.user.id');
            var deleteUserId = member.get('user');

            if (loggedUserId == deleteUserId && role.get('to_workspace') != null) {
                throw new Error('You can not delete yourself.');
            } else {
                Vaultier.confirmModal(this, 'Are you sure you want to delete this permission?', function () {

                    var promise = role
                        .deleteRecord()

                        .then(function () {

                            var roles = member.get('roles');
                            roles.removeObject(role);
                            member.set('roles_count', roles.get('length'));

                            $.notify('Role has been remove', 'success');
                        }.bind(this))

                        .catch(function (error) {
                            $.notify('Oooups! Something went wrong.', 'error');
                            this.get('errors').logError(error);
                        }.bind(this));

                    ApplicationKernel.UI.showLoaderUponPromise(promise);

                });
            }
        },

        /**
         * Delete a member from the workspace and all his roles inside of it
         * @param context
         * @param member
         */

        deleteMember: function (members, member) {
            var loggedUserId = this.get('auth.user.id');
            var deleteUserId = member.get('user');

            if (loggedUserId == deleteUserId) {
                throw new Error('You can not delete yourself.');
            } else {
                Vaultier.confirmModal(this, 'Are you sure you want to delete this member?', function () {

                    var promise = member
                        .deleteRecord()

                        .then(function () {
                            members.removeObject(member);
                            $.notify('Member has been removed', 'success');
                        }.bind(this))

                        .catch(function (error) {
                            $.notify('Oooups! Something went wrong.', 'error');
                            console.error(error);
                            //this.get('errors').logError(error);
                        }.bind(this));

                    ApplicationKernel.UI.showLoaderUponPromise(promise);
                }.bind(this));
            }
        },

        /**
         * Retrieves one member roles for the actual workspace
         * @param context
         * @param member
         */
        loadRoles: function (member) {
            var store = this.get('controller.store');
            var promise = store
                .find('Role', {
                    member: member.get('id')
                })
                .then(function (roles) {
                    member.set('roles', roles)
                    member.set('roles_count', roles.get('length'));
                }.bind(this));
            ApplicationKernel.UI.showLoaderUponPromise(promise);
        }
    }
});

/**
 *
 * Single member item
 *
 * @class MembersAdminListItemView
 * @namespace Vaultier
 */
Vaultier.MembersAdminListItemView = Ember.View.extend({

    layoutName: 'MembersAdmin/MembersAdminListItem',

    member: function (key, member) {

        if (arguments.length > 1 && !this.get('_member')) {
            // setter
            this.set('_member', member)
        }

        return this.get('_member');
    }.property('_member'),

    myself: function() {
        var loggedUserId = this.get('controller.auth.user.id');
        var deleteUserId = this.get('content.user');
        return loggedUserId == deleteUserId;
    }.property(),

    onRolesEmpty: function () {
        if (!this.get('member.roles.length')) {
            this.hideRoles();
        }
    }.observes('member.roles.length'),

    onRolesLoaded: function () {
        if (this.get('member.roles.length')) {
            this.showRoles();
        }
    }.observes('member.roles'),


    showRoles: function () {
        Ember.run.next(function () {
            this.$('.vlt-panel-members-roles').slideDown();
        }.bind(this))
    },

    hideRoles: function () {
        Ember.run.next(function () {
            this.$('.vlt-panel-members-roles').slideUp();
        }.bind(this))
    },

    toggleRoles: function () {
        Ember.run.next(function () {
            this.$('.vlt-panel-members-roles').slideToggle();
        }.bind(this))
    },

    animateOut: function (done) {
        EmberExt.AnimatedIf.Transitions.create().runFx(this.$(), 'slideUp').then(done);
    },

    AnimatedView: Ember.View.extend({
        animateOut: function (done) {
            EmberExt.AnimatedIf.Transitions.create().runFx(this.$(), 'slideUp').then(done);
        }
    }),

    actions: {

        /**
         * Toggles roles
         * @param context
         * @param role
         */
        toggleRoles: function (member) {
            this.set('member', member);
            if (this.get('member.roles')) {
                this.toggleRoles();
            } else {
                this.get('controller').send('loadRoles', member);
            }


        }
    }
});

/**
 *
 * Single role item of single member
 *
 * @class MembersAdminRoleItemView
 * @namespace Vaultier
 */
Vaultier.MembersAdminRoleItemView = Ember.View.extend({
    templateName: 'MembersAdmin/MembersAdminRoleItem',

    cannotDelete: function() {
        var loggedUserId = this.get('controller.auth.user.id');
        var deleteUserId = this.get('role.member.user');
        return loggedUserId == deleteUserId && this.get('role.to_workspace') != null;
    }.property(),

    animateOut: function (done) {
        EmberExt.AnimatedIf.Transitions.create().runFx(this.$(), 'slideUp').then(done);
    },

    icon: function () {
        var types = Vaultier.Role.proto().types;
        if (this.get('role.relatedObjectType') == types.TO_CARD.value) {
            return '/static/vaultier/images/icon-card-grey.png';
        }
        if (this.get('role.relatedObjectType') == types.TO_VAULT.value) {
            return '/static/vaultier/images/icon-vault-grey.png';
        }
        if (this.get('role.relatedObjectType') == types.TO_WORKSPACE.value) {
            return '/static/vaultier/images/icon-workspace-grey.png';
        }
    }.property('role.relatedObjectType')
});

/**
 *
 * List view of all members
 *
 * @class MembersAdminListView
 * @namespace Vaultier
 */
Vaultier.MembersAdminListView = Ember.View.extend({
    layoutName: 'MembersAdmin/MembersAdminList',

    membersView: function () {
        var members = this.get('members');
        return Ember.CollectionView.extend({

            content: members,

            createChildView: function (itemViewClass, attrs) {
                if (attrs) {
                    attrs.members = members;
                }
                return this._super.apply(this, arguments);
            },

            emptyView: Ember.View.extend({
                template: Ember.Handlebars.compile("The collection is empty")
            }),

            itemViewClass: Vaultier.MembersAdminListItemView

        });
    }.property()

});

