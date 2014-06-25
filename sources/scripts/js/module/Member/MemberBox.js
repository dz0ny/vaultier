Vaultier.MemberBoxComponent = Ember.Component.extend({
    layoutName: 'Member/MemberBox',


    hasRead: function () {
        return this.get('rolesRead').length != 0
    }.property('rolesRead'),

    rolesRead: function () {
        return this.get('roles').filter(function (role) {
            if (role.get('level') == Vaultier.Role.proto().roles['READ'].value) {
                return role;
            }
        });
    }.property('roles'),

    hasCreate: function () {
        return this.get('rolesCreate').length != 0
    }.property('rolesCreate'),

    rolesCreate: function () {
        return this.get('roles').filter(function (role) {
            if (role.get('level') == Vaultier.Role.proto().roles['CREATE'].value) {
                return role;
            }
        });
    }.property('roles'),


    hasWrite: function () {
        return this.get('rolesWrite').length != 0
    }.property('rolesWrite'),

    rolesWrite: function () {
        return this.get('roles').filter(function (role) {
            if (role.get('level') == Vaultier.Role.proto().roles['WRITE'].value) {
                return role;
            }
        });
    }.property('roles')

});
