Vaultier.MembersAdminListItemView = Em.View.extend({

    layoutName: 'MembersAdmin/MembersAdminListItem',

    id: null,

    didInsertElement: function () {
        this.set('id', $(this.get('element')).attr('id') + '-collapse');
        this._super();
    },

    targetElement: function () {
        return '#' + this.get('id');
    }.property('id'),

    member: function () {
        return this.get('content');
    }.property('content'),

    rolesLoaded: function () {
        return this.get('member.roles.length') != undefined;
    }.property('member.roles'),

    actions: {

        /**
         * Delete the given role for a concrete member inside the actual workspace
         * @param context
         * @param role
         */
        deleteRole: function (member, role) {
//
//                Vaultier.confirmModal(this, 'Are you sure you want to delete this permission?', function () {

            var promise = role
                .saveRecord()

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

            ApplicationLoader.promise(promise);
//                });
        },

        /**
         * Retrieves one member roles for the actual workspace
         * @param context
         * @param member
         */
        loadRoles: function (member) {
            if (member.get('roles') == undefined) {
                var store = this.get('store');
                var promise = store
                    .find('Role', {
                        member: member.get('id')
                    })
                    .then(function (roles) {
                        member.set('roles', roles)
                        member.set('roles_count', roles.get('length'));
                    }.bind(this));
                ApplicationLoader.promise(promise);
            }
        },

        /**
         * Delete a member from the workspace and all his roles inside of it
         * @param context
         * @param member
         */
        deleteMember: function (members, member) {
//            console.log(member);
//            Vaultier.confirmModal(this, 'Are you sure you want to delete this member?', function () {

            //console.log(members);

            if (!member.get('removed')) {
                member.set('removed', true);
                Ember.run.later(this, function () {
                    members.removeObject(member);
                }, 500)
            }


            return;

            var promise = member
                .saveRecord()
                .then(function () {
                    members.removeObject(member);
                    $.notify('Member has been removed', 'success');
                }.bind(this))
                .catch(function (error) {
                    $.notify('Oooups! Something went wrong.', 'error');
                    console.error(error);
                    //this.get('errors').logError(error);
                }.bind(this));

            ApplicationLoader.promise(promise);
//            }.bind(this));
        }
    }
});

Vaultier.MembersAdminListView = Em.View.extend({
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

