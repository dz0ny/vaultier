Vaultier.Role = DS.Model.extend(
    CreatedUpdatedMixin,
    {
        level: DS.attr('number'),
        member: DS.attr(),
        to_workspace: DS.attr(),
        to_vault: DS.attr(),
        to_card: DS.attr(),

        roles: new Utils.ConstantList({
            'READ': {
                value: 100,
                text: 'READ'
            },
            'WRITE': {
                value: 200,
                text: 'WRITE'
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


