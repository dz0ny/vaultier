Vaultier.Role = RL.Model.extend(
    Vaultier.CreatedUpdatedMixin,
    Vaultier.RollbackMixin,
    {

        auth: null,

        init: function() {
            this.set('auth', Vaultier.__container__.lookup('service:auth'))
            return this._super.apply(this, arguments);
        },


        level: RL.attr('number'),
        member: RL.attr('object'),
        to_workspace: RL.attr('object'),
        to_vault: RL.attr('object'),
        to_card: RL.attr('object'),

        roles: new Utils.ConstantList({
            'CREATE': {
                value: 50,
                text: 'Create new',
                desc:'Can read this object. Can create new child objects. Can modify, delete, invite and grant permissions to created objects'
            },
            'READ': {
                value: 100,
                desc: 'Can read this object and all child objects',
                text: 'View only'
            },
            'WRITE': {
                value: 200,
                text: 'Manage',
                desc: 'Can create, modify, delete, invite and grant permissions to this object and all child objects'
            }
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
            return this.get('member.status') == Vaultier.Member.proto().statuses['MEMBER'].value;
        }.property('member.status'),

        isInvited : function() {
            return this.get('member.status') == Vaultier.Member.proto().statuses['INVITED'].value;
        }.property('member.status'),

        isMemberWithoutKeys : function() {
            return this.get('member.status') == Vaultier.Member.proto().statuses['MEMBER_WITHOUT_WORKSPACE_KEY'].value;
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
         * Retrieve the type of the object related to this role
         */
        relatedObjectType: function() {

            if (this.get('to_workspace')) {
                return (this.get('types')['TO_WORKSPACE']).value;
            } else if (this.get('to_vault')) {
                return (this.get('types')['TO_VAULT']).value;
            } else if (this.get('to_card')) {
                return (this.get('types')['TO_CARD']).value;
            }

        }.property('to_vault', 'to_card', 'to_workspace'),

        relatedObjectId: function () {

            if (this.get('to_workspace')) {
                return this.get('to_workspace');
            } else if (this.get('to_vault')) {
                return this.get('to_vault');
            } else if (this.get('to_card')) {
                return this.get('to_card');
            }

        }.property('to_vault', 'to_card', 'to_workspace'),

        /**
         * Return true if the given object is related to this role
         */
        isRelatedToObject: function (object) {
            if (typeof object === 'number') {
                // the object come from a secrets and its value refer to its parent card id
                return this.get('relatedObjectId') === object;
            }

            return this.get('relatedObjectType') === object.get('objectType') &&
                this.get('relatedObjectId') === object.get('id');
        }

    });


