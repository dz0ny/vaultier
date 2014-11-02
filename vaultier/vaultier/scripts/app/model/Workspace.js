Vaultier.Workspace = RL.Model.extend(
    Vaultier.CreatedUpdatedMixin,
    Vaultier.RollbackMixin,
    {
        init: function () {
            this.set('workspacekey', Vaultier.__container__.lookup('service:workspacekey'));
            return this._super.apply(this, arguments);
        },

        /**
         * @DI service:workspacekey
         */
        workspacekey: null,

        /**
         * Managed by Service.WorkspaceKey, True when key cannot be decrypted
         */
        keyError: false,

        name: RL.attr('string'),
        slug: RL.attr('string'),
        description: RL.attr('string'),
        perms: RL.attr('object', { readOnly: true }),
        membership: RL.attr('object', { readOnly: true }),


        /**
         * Returns if user given by membership has workspacekey
         */
        hasValidKey: function () {
            return this.get('membership.status') == Vaultier.Member.proto().statuses['MEMBER'].value;
        }.property('membership.status'),


        saveRecord: function () {
            var isNew = this.get('isNew');
            var promise = this._super.apply(this, arguments);
            var workspace = this;
            if (isNew) {
                // after save, approve workspace
                promise = promise
                    .then(function () {
                        return this.get('workspacekey').transferKeyToCreatedWorkspace(workspace);
                    }.bind(this))
                    .then(function () {
                        return workspace.reloadRecord();
                    }.bind(this))
            }

            return promise;
        },

        objectType: function () {
            return Vaultier.Role.proto().types['TO_WORKSPACE'].value;
        }.property()


    }
)
;

