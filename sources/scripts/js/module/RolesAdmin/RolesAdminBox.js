Vaultier.RolesAdminBoxComponent = Ember.Component.extend({
    layoutName: 'RolesAdmin/RolesAdminBox',

    init: function () {
        this._super.apply(this, arguments);
        this.checkParameters();
    },

    object: null,

    checkParameters: function () {
        var roles = this.get('roles');
        var user = this.get('user');
        if (Object.prototype.toString.call(roles) != '[object Array]') {
            throw new Error('Roles array has to be passed as roles=[Vaultier.Role] parameter');
        }

        if (!user || user.constructor != Vaultier.User) {
            throw new Error('Current user has to be passed as user=Vaultier.User')
        }

    },


    processedRoles: function () {
        // remove me from roles
        var roles = Utils.RolesProxy.create({
           content: this.get('roles')
        });

        // filter create roles for inherited permissions
        roles.filterCreateRolesByObjectScope(this.get('object'));

        // each user to be only once at result
        var foundRoles = []
        roles = roles.filter(function (role) {
            var id = role.get('member.id');
            if (foundRoles.indexOf(id) == -1) {
                foundRoles.push(id);
                return role;
            }
        });

        return roles;
    }.property('roles'),

    hasAny: function () {
        if (this.get('processedRoles').get('length') > 0) {
            return true;
        }
        return false;
    }.property('processedRoles'),

    hasRead: function () {
        return this.get('rolesRead').length != 0
    }.property('rolesRead'),

    rolesRead: function () {
        return this.get('processedRoles').filter(function (role) {
            if (role.get('level') == Vaultier.Role.proto().roles['READ'].value) {
                return role;
            }
        });
    }.property('processedRoles'),

    hasCreate: function () {
        return this.get('rolesCreate').length != 0
    }.property('rolesCreate'),

    rolesCreate: function () {
        return this.get('processedRoles').filter(function (role) {
            if (role.get('level') == Vaultier.Role.proto().roles['CREATE'].value) {
                return role;
            }
        });
    }.property('processedRoles'),


    hasWrite: function () {
        return this.get('rolesWrite').length != 0
    }.property('rolesWrite'),

    rolesWrite: function () {
        return this.get('processedRoles').filter(function (role) {
            if (role.get('level') == Vaultier.Role.proto().roles['WRITE'].value) {
                return role;
            }
        });
    }.property('processedRoles')

});
