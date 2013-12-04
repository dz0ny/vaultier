Vaultier.Workspace = DS.Model.extend(
    CreatedUpdatedMixin,
    ExposeCleanAttributesMixin,
    NonInvalidState,
    {
        /**
         * @DI Service.Members
         */
        members: null,

        /**
         * Managed by Service.Members, True when key cannot be decrypted
         */
        keyError: false,


        pk: DS.attr('number'),
        name: DS.attr('string'),
        slug: DS.attr('string'),
        description: DS.attr('string'),
        perms: DS.attr(),
        membership: DS.attr(),


        /**
         * Returns if user given by membership is approved on current workspace
         */
        isApproved: function () {
            return this.get('membership.status') == Vaultier.Member.proto().statuses['MEMBER'].value
        }.property('membership.status'),


        save: function () {
            var isNew = !this.get('id');
            var promise = this._super(arguments)

            if (isNew) {
                // after save, approve workspace
                promise = promise.then(function (workspace) {
                        if (isNew) {
                            return  this.get('members').approveNewWorkspace(workspace)
                                .then(function () {
                                    return workspace
                                })
                        } else {
                            return workspace
                        }
                    }.bind(this))

                    .then(function (workspace) {
                        return workspace.reload()
                    })
            }

            return promise
        }


    }
)
;

