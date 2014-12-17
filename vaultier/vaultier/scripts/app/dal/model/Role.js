ApplicationKernel.namespace('Vaultier.dal.model');

/**
 * @module vaultier-dal-model
 * @class Vaultier.dal.model.Role
 * @extends RL.Model
 */
Vaultier.dal.model.Role = RL.Model.extend(
    Vaultier.dal.mixin.CreatedUpdatedMixin,
    Vaultier.dal.mixin.RollbackMixin,
    {

        auth: null,

        init: function() {
            this.set('auth', Vaultier.__container__.lookup('service:auth'))
            return this._super.apply(this, arguments);
        },


        level: RL.attr('number'),
        member: RL.attr('object'),
        node: RL.attr('object'),

        roles: new Utils.ConstantList({
            'CREATE': {
                value: 100,
                text: 'Create new',
                desc:'Can read this object. Can create new child objects. Can modify, delete, invite and grant permissions to created objects'
            },
            'READ': {
                value: 200,
                desc: 'Can read this object and all child objects',
                text: 'View only'
            },
            'WRITE': {
                value: 300,
                text: 'Manage',
                desc: 'Can create, modify, delete, invite and grant permissions to this object and all child objects'
            }
        }),

        permissions: new Utils.ConstantList({
            'READ': "read",
            'CREATE': "create",
            'UPDATE': "update",
            'DELETE': "delete",
            'INVITE': "invite"
        }),

        types: new Utils.ConstantList({
            'TO_WORKSPACE': {
                value: 100,
                text: 'TO_WORKSPACE'
            },
            'TO_VAULT': {
                value: 200,
                text: 'TO_VAULT'
            },
            'TO_CARD': {
                value: 300,
                text: 'TO_CARD'
            }
        }),

        isCurrentUser: function() {
            var auth = this.get('auth');
            var id = auth.get('user.id')
            return this.get('member.user') == id;
        }.property('member.user'),

        isMember : function() {
            return this.get('member.status') == Vaultier.dal.model.Member.proto().statuses['MEMBER'].value;
        }.property('member.status'),

        isInvited : function() {
            return this.get('member.status') == Vaultier.dal.model.Member.proto().statuses['INVITED'].value;
        }.property('member.status'),

        isMemberWithoutKeys : function() {
            return this.get('member.status') == Vaultier.dal.model.Member.proto().statuses['MEMBER_WITHOUT_WORKSPACE_KEY'].value;
        }.property('member.status'),

        printableDesc: function() {
            var val = this.roles.getByValue(this.get('level'));
            if (val) {
                return val.desc
            } else {
                return 'Unknown role level'
            }

        }.property('level'),

        printableName: function() {
            var val = this.roles.getByValue(this.get('level'));
            if (val) {
                return val.text
            } else {
                return 'Unknown role level'
            }
        }.property('level'),

        /**
         * Return true if the given object is related to this role
         */
        isRelatedToObject: function (object) {
            return this.get('node') === object.get('id');
        }

    });


