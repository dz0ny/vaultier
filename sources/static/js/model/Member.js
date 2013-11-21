Vaultier.Member = DS.Model.extend(
    CreatedUpdatedMixin, {
        status: DS.attr('number'),
        email: DS.attr('string'),
        nickname: DS.attr('string'),
        user: DS.attr(),
        workspace: DS.attr(),

        statuses: new Utils.ConstantList({
            'INVITED': {
                value: 100,
                text: 'INVITED'
            },
            'NON_APPROVED_MEMBER': {
                value: 200,
                text: 'NON_APPROVED_MEMBER'
            },
            'MEMBER': {
                value: 300,
                text: 'MEMBER'
            }
        })

    });

Vaultier.MemberWorkspaceKey = DS.Model.extend({
    public_key: DS.attr('string'),
    workspace_key: DS.attr('string'),
    status: DS.attr('string')
})


Vaultier.MemberRole = DS.Model.extend({
    created_by: DS.attr(),
    to_name: DS.attr('string'),
    to_type: DS.attr('number'),

    name: function() {
        var Role =  Vaultier.Role.proto();
        var type = this.get('to_type');
        var to_name  = this.get('to_name');
        if  (type == Role.types['TO_WORKSPACE'].value) {
            return 'Invited to workspace "{to_name}"'.replace('{to_name}', to_name)
        }

        if  (type == Role.types['TO_VAULT'].value) {
            return 'Invited to vault "{to_name}"'.replace('{to_name}', to_name)
        }

        if  (type == Role.types['TO_CARD'].value) {
            return 'Invited to card "{to_name}"'.replace('{to_name}', to_name)
        }

    }.property('to_name', 'to_type')


})