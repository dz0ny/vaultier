Vaultier.Member = RL.Model.extend(
    CreatedUpdatedMixin,
    {
        status: RL.attr('number'),
        email: RL.attr('string'),
        nickname: RL.attr('string'),
        user: RL.attr('object'),
        workspace: RL.attr('object'),

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

Vaultier.MemberWorkspaceKey = RL.Model.extend(
    NonInvalidState,
    {
        public_key: RL.attr('string'),
        workspace_key: RL.attr('string'),
        status: RL.attr('string')
    })


Vaultier.MemberRole = RL.Model.extend(
    NonInvalidState,
    {
        created_by: RL.attr('object'),
        to_name: RL.attr('string'),
        to_type: RL.attr('number'),

        name: function () {
            var Role = Vaultier.Role.proto();
            var type = this.get('to_type');
            var to_name = this.get('to_name');
            if (type == Role.types['TO_WORKSPACE'].value) {
                return 'Invited to workspace "{to_name}"'.replace('{to_name}', to_name)
            }

            if (type == Role.types['TO_VAULT'].value) {
                return 'Invited to vault "{to_name}"'.replace('{to_name}', to_name)
            }

            if (type == Role.types['TO_CARD'].value) {
                return 'Invited to card "{to_name}"'.replace('{to_name}', to_name)
            }

        }.property('to_name', 'to_type')


    })