Vaultier.Role = DS.Model.extend(
    CreatedUpdatedMixin,
    NonInvalidState,
    {

        /**
         * @DI Service.Auth
         */
        auth: null,

        level: DS.attr('number'),
        member: DS.attr(),
        to_workspace: DS.attr(),
        to_vault: DS.attr(),
        to_card: DS.attr(),

        roles: new Utils.ConstantList({
            'CREATE': {
                value: 50,
                text: 'Create own',
                desc:'Can create new, modify own, invite and grant permissions to own'
            },
            'READ': {
                value: 100,
                desc: 'Can read mine and others',
                text: 'Read'
            },
            'WRITE': {
                value: 200,
                text: 'Write',
                desc: 'Can write mine and others, invite and grant permissions to mine and others '
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

        isNonApprovedMember : function() {
            return this.get('member.status') == Vaultier.Member.proto().statuses['NON_APPROVED_MEMBER'].value;
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
        }.property('level')

    });


