/**
 * Component for displaying members with which node is shared
 *
 * @module vaultier-ui-rolesadmin
 * @class Vaultier.RolesAdminBoxComponent
 * @extends Ember.Component
 */
Vaultier.RolesAdminBoxComponent = Ember.Component.extend({

    /**
     * @property layoutName
     * @type {String}
     */
    layoutName: 'RolesAdmin/RolesAdminBox',

    /**
     * True if block for displaying members which has role MANAGE is shown
     *
     * @property hasAny
     * @type {boolean}
     */
    rolesManageOpen: true,

    /**
     * True if block for displaying members which has role READ is shown
     *
     * @property hasAny
     * @type {boolean}
     */
    rolesReadOpen: true,

    /**
     * True if block for displaying members which has role CREATE is shown
     *
     * @property hasAny
     * @type {boolean}
     */
    rolesCreateOpen: true,

    /**
     * @property currentNode
     * @type {Vaultier.Document.Node}
     */
    currentNode: null,

    init: function () {
        this._super.apply(this, arguments);
        this.checkParameters();
    },

    /**
     * Check if it was inserted enough arguments
     *
     * @method checkParameters
     * @private
     */
    checkParameters: function () {
        var roles = this.get('roles');
        var user = this.get('user');
        if (Object.prototype.toString.call(roles) != '[object Array]') {
            throw new Error('Roles array has to be passed as roles=[Vaultier.dal.model.Role] parameter');
        }

        if (!user || user.constructor != Vaultier.dal.model.User) {
            throw new Error('Current user has to be passed as user=Vaultier.dal.model.User')
        }

    },

    /**
     * Return prepared roles which is filtered by these rules:
     * 1. Exclude memberships for current user
     * 2. Although user can have more the one membership we want to display the user just once
     *
     * @method processedRoles
     * @returns {Utils.RolesProxy}
     * @private
     */
    processedRoles: function () {
        // remove me from roles
        var roles = Utils.RolesProxy.create({
            content: this.get('roles')
        });

        // filter create roles for inherited permissions
        roles.filterCreateRolesByObjectScope(this.get('currentNode'));

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

    /**
     * @property hasAny
     * @type {boolean}
     */
    hasAny: function () {
        return this.get('processedRoles').get('length') > 0;

    }.property('processedRoles'),

    /**
     * @property hasRead
     * @type {boolean}
     */
    hasRead: function () {
        return this.get('rolesRead').length != 0
    }.property('rolesRead'),

    /**
     * @property rolesRead
     * @type {Utils.RolesProxy}
     */
    rolesRead: function () {
        return this.get('processedRoles').filter(function (role) {
            if (role.get('level') == Vaultier.dal.model.Role.proto().roles['READ'].value) {
                return role;
            }
        });
    }.property('processedRoles'),

    /**
     * @property hasCreate
     * @type {boolean}
     */
    hasCreate: function () {
        return this.get('rolesCreate').length != 0
    }.property('rolesCreate'),

    /**
     * @property rolesCreate
     * @type {Utils.RolesProxy}
     */
    rolesCreate: function () {
        return this.get('processedRoles').filter(function (role) {
            if (role.get('level') == Vaultier.dal.model.Role.proto().roles['CREATE'].value) {
                return role;
            }
        });
    }.property('processedRoles'),

    /**
     * @property hasWrite
     * @type {boolean}
     */
    hasWrite: function () {
        return this.get('rolesWrite').length != 0
    }.property('rolesWrite'),

    /**
     * @property rolesWrite
     * @type {Utils.RolesProxy}
     */
    rolesWrite: function () {
        return this.get('processedRoles').filter(function (role) {
            if (role.get('level') == Vaultier.dal.model.Role.proto().roles['WRITE'].value) {
                return role;
            }
        });
    }.property('processedRoles'),

    actions: {

        toggleRolesManage: function () {
            Ember.run.next(function () {
                this.$('.vlt-perms-roles-manage').slideToggle();
                this.set('rolesManageOpen', !this.get('rolesManageOpen'));
            }.bind(this))
        },

        toggleRolesRead: function () {
            Ember.run.next(function () {
                this.$('.vlt-perms-roles-read').slideToggle();
                this.set('rolesReadOpen', !this.get('rolesReadOpen'));
            }.bind(this))
        },

        toggleRolesCreate: function () {
            Ember.run.next(function () {
                this.$('.vlt-perms-roles-create').slideToggle();
                this.set('rolesCreateOpen', !this.get('rolesCreateOpen'));
            }.bind(this))
        }
    }

});
