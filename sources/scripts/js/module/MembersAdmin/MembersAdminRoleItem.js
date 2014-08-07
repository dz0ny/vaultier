Vaultier.MembersAdminRoleItemComponent = Ember.Component.extend({
    layoutName: 'MembersAdmin/MembersAdminRoleItem',

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
    }.property('role.relatedObjectType'),

//    willDestroyElement: function () {
//        var current = this.$();
//        var clone = current.clone();
//        clone.insertBefore(current.prev('script'));
//        clone.slideUp();
//    },

    actions: {
        deleteRole: function (member, role) {
            this.sendAction('deleteRole', member, role);
        }
    }
});

