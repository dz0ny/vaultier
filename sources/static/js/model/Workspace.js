Vaultier.Workspace = RL.Model.extend(
    CreatedUpdatedMixin,
    ExposeCleanAttributesMixin,
    {
        init: function() {
            this.set('members', Vaultier.__container__.lookup('service:members'))
            return this._super.apply(this, arguments);
        },

        members: null,

        /**
         * Managed by Service.Members, True when key cannot be decrypted
         */
        keyError: false,

        name: RL.attr('string'),
        slug: RL.attr('string'),
        description: RL.attr('string'),
        perms: RL.attr('object',{ readOnly: true }),
        membership: RL.attr('object', { readOnly: true }),


        /**
         * Returns if user given by membership is approved on current workspace
         */
        isApproved: function () {
            return this.get('membership.status') == Vaultier.Member.proto().statuses['MEMBER'].value
        }.property('membership.status'),


        saveRecord: function () {
            var isNew = this.get('isNew');
            var promise = this._super.apply(this, arguments)
            var workspace = this;
            if (isNew) {
                // after save, approve workspace
                promise = promise
                    .then(function () {
                            this.get('members').approveNewWorkspace(workspace)
                    }.bind(this))
                    .then(function () {
                        return workspace.reloadRecord()
                    }.bind(this))
            }

            return promise
        }


    }
)
;

