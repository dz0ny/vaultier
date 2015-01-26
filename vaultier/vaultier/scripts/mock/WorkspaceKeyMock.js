ApplicationKernel.namespace('Vaultier.Mock');


Vaultier.Mock.WorkspaceKeyMock = Ember.Object.extend(
    Ember.Evented,
    {

        //@TODO predelat
        run: function (app, container) {

        },


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
                    if (workspaceCheck.get('membership.status') == Vaultier.dal.model.Member.proto().statuses['MEMBER'].value) {
                        this.stopChecking();
                        workspace.reloadRecord()
                            .then(function () {
                                this.selectWorkspace(workspace);
                                $.notify(
                                    ['Keys to workspace "{workspace}" have been transfered to you. ',
                                        'You can now fully work with this workspace']
                                        .join('')
                                        .replace('{workspace}', workspace.get('name')),
                                    {
                                        autoHideDelay: 10000
                                    }
                                );
                                this.trigger('keyTransfered', workspace);
                            }.bind(this));
                    }
                }.bind(this));

        },

        selectWorkspace: function (workspace) {

            this.set('membersToApprove', null);
            this.set('workspace', workspace);

            if (workspace) {
                this.stopChecking();

                var cryptedKey = workspace.get('membership.workspace_key');
                var workspaceKey = null;
                workspace.set('keyError', false);

                if (this.hasValidWorkspaceKey()) {
                    try {
                        workspaceKey = this.get('keytransfer').decryptWorkspaceKey(cryptedKey)
                    } catch (error) {
                        console.error(error.stack)
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

        transferKeyToCreatedWorkspace: function (workspace) {
            return true;
        },

        decryptWorkspaceData: function (data) {
            return data;
        },

        encryptWorkspaceData: function (data) {
            return data;
        }


    });



