Vaultier.Role = DS.Model.extend(
    CreatedUpdatedMixin,
    {
        level: DS.attr('string'),
        member: DS.attr(),
        to_workspace: DS.attr(),
        to_vault: DS.attr(),
        to_card: DS.attr(),

        roles: new Utils.ConstantList({
            'DENIED': {
                value: '0',
                text: 'Denied'
            },
            'READ': {
                value: 'r',
                text: 'Read'
            },
            'CREATE': {
                value: 'c',
                text: 'Create'
            },
            'WRITE': {
                value: 'w',
                text: 'Write'
            },
            'ADMIN': {
                value: 'a',
                text: 'Admin'
            }
        }),

        isMember : function() {
            return this.get('member.status') == Vaultier.Member.proto().statuses['MEMBER'].value;
        }.property('member.status'),

        isInvited : function() {
            return this.get('member.status') == Vaultier.Member.proto().statuses['INVITED'].value;
        }.property('member.status'),

        isNonApprovedMember : function() {
            return this.get('member.status') == Vaultier.Member.proto().statuses['NON_APPROVED_MEMBER'].value;
        }.property('member.status')


    });


