Vaultier.WorkspaceKey = RL.Model.extend(
    {
        public_key: RL.attr('string'),
        workspace_key: RL.attr('longs'),
        status: RL.attr('string'),
        workspace: RL.attr('object'),
        user: RL.attr('object')
    })

