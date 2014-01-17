Po.NS('Service');

Service.WorkspaceKeyDecryptSoftError = function() {
    var error = Error.apply(this, arguments);
    this.stack = error.stack
}

Service.WorkspaceKey = Ember.Object.extend(
    Ember.Evented,
    {

        /**
         * @DI Service.Coder
         */
        coder: null,
        /**
         * @DI Service.Auth
         */
        auth: null,

        /**
         * @DI store:main
         */
        store: null,

        /**
         * @DI service:keytransfer
         */

        keytransfer: null,

        membersToApprove: null,
        workspace: null,
        workspaceKey: null,

        checkInterval: 60000,
        checkIntervalId: null,

        init: function () {
            this._super(this, arguments);
        },

        startChecking: function (workspace) {
            // start checking interval
            this.set('checkIntervalId', setInterval(
                function () {
                    this.checkWorkspaceKey(workspace);
                }.bind(this),
                this.get('checkInterval')
            ));
        },

        stopChecking: function () {
            clearInterval(this.get('checkIntervalId'));
        },

        checkWorkspaceKey: function (workspace) {
            this.get('store').find('Workspace', workspace.get('id'))
                .then(function (workspaceCheck) {
                    if (workspaceCheck.get('membership.status') == Vaultier.Member.proto().statuses['MEMBER'].value) {
                        this.stopChecking();
                        workspace.reloadRecord()
                            .then(function () {
                                this.selectWorkspace(workspace);
                                $.notify(
                                    ['Keys to workspace "{workspace}" has been transfered to you. ',
                                        'You can now fully work with workspace']
                                        .join('')
                                        .replace('{workspace}', workspace.get('name')),
                                    {
                                        autoHideDelay: 10000
                                    }
                                )
                                this.trigger('keyTransfered', workspace)
                            }.bind(this))
                    }
                }.bind(this))

        },

        selectWorkspace: function (workspace) {

            this.set('membersToApprove', null)
            this.set('workspace', workspace)

            if (workspace) {
                this.stopChecking();

                var cryptedKey = workspace.get('membership.workspace_key');
                var workspaceKey = null;
                workspace.set('keyError', false);

                if (workspace.get('membership.status') == Vaultier.Member.proto().statuses['MEMBER'].value) {
                    try {
                        workspaceKey = this.get('keytransfer').decryptWorkspaceKey(cryptedKey)
                    } catch (error) {
                        console.error(error);
                        workspace.set('keyError', true);
                    }

                    this.set('workspaceKey', workspaceKey)
                } else {
                    this.startChecking(workspace);
                }
            } else {
                this.set('workspaceKey', null)
            }
        },


        loadMembersWithoutWorkspaceKey: function () {
            var workspace = this.get('workspace')
            if (!workspace) {
                throw Error('Workspace not selected')
            }

            var promise = this.get('store')

                .find('Member', {
                    workspace: Utils.E.recordId(workspace),
                    status: Vaultier.Member.proto().statuses['MEMBER_WITHOUT_WORKSPACE_KEY'].value
                })
                .then(function (data) {
                    this.set('membersToApprove', data)
                    return data
                }.bind(this))

            return promise;
        },

        transferKeysToMembers: function () {
            var members = this.get('membersToApprove')
            if (!members) {
                throw Error('Members not loaded')
            }
            var workspace = this.get('workspace')
            if (!workspace) {
                throw Error('Workspace not selected')
            }

            var promises = []
            var keytransfer = this.get('keytransfer');
            var decryptedKey = this.get('workspaceKey')

            members.forEach(function (member) {
                promises.push(this.keytransfer.transferKeyToMember(member, decryptedKey))
            }.bind(this))

            var promises = Ember.RSVP.all(promises);
            return promises;
        },


        transferKeyToCreatedWorkspace: function (workspace) {
            var keytransfer = this.get('keytransfer');
            var decryptedKey = keytransfer.generateWorkspaceKey();
            return keytransfer.transferKeyToMember(workspace.get('membership.id'), decryptedKey)
        },


        decryptWorkspaceData: function (data) {
            var coder = this.get('coder');
            var workspace = this.get('workspace')
            if (!workspace) {
                throw Error('Workspace not selected')
            }

            if (workspace.get('membership.status') == Vaultier.Member.proto().statuses['MEMBER'].value) {
                var workspaceKey = this.get('workspaceKey');
                data = coder.decryptAES(data, workspaceKey)
                data = JSON.parse(data)
                return data
            } else {
                throw new Service.WorkspaceKeyDecryptSoftError('Cannot decrypt: workspace.membership.status {status}'.replace('{status}', workspace.get('membership.status')))
                return null
            }

        },

        encryptWorkspaceData: function (data) {
            var coder = this.get('coder');
            var workspace = this.get('workspace')
            if (!workspace) {
                throw Error('Workspace not selected')
            }

            if (workspace.get('membership.status') == Vaultier.Member.proto().statuses['MEMBER'].value) {
                var workspaceKey = this.get('workspaceKey');
                data = JSON.stringify(data)
                return coder.encryptAES(data, workspaceKey)
            } else {
                throw Error('Cannot encrypt. workspace.membership.status {status}'.replace('{status}', workspace.get('membership.status')))
                return data
            }

        }


    });

