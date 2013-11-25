Po.NS('Service');

Service.Members = Ember.Object.extend({

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

    membersToApprove: null,
    workspace: null,
    workspaceKey: null,

    selectWorkspace: function (workspace) {
        this.set('membersToApprove', null)

        this.set('workspace', workspace)

        if (workspace) {
            this.set('workspaceKey', this.decryptWorkspaceKey(workspace))
        } else {
            this.set('workspaceKey', null)
        }
    },

    decryptWorkspaceKey: function (workspace) {
        workspace.set('keyError', false)
        var key = workspace.get('membership.workspace_key');
        if (key) {
            var coder = this.get('coder');
            var privateKey = this.get('auth.privateKey');
            key = coder.decryptRSA(key, privateKey);
            if (!key) {
                workspace.set('keyError', true)
                throw new Error('Cannot decrypt workspace key')
            }
        } else {
            // generate new
            key = this.get('coder').generateWorkspaceKey();
        }
        return key
    },

    loadMembersToApprove: function () {
        var workspace = this.get('workspace')
        if (!workspace) {
            throw Error('Workspace not selected')
        }

        var promise = this.get('store').find('Member', {
            workspace: Utils.E.recordId(workspace),
            status: Vaultier.Member.proto().statuses['NON_APPROVED_MEMBER'].value
        })

        promise.then(function (data) {
            this.set('membersToApprove', data)
        }.bind(this))

        return promise;
    },

    approveMember: function (memberId, workspaceKey) {
        var store = this.get('store');
        var coder = this.get('coder');
        var promise =
            store.find('MemberWorkspaceKey', memberId)
                .then(function (member) {
                    var publicKey = member.get('public_key')
                    var wk = coder.encryptRSA(workspaceKey, publicKey);
                    member.set('workspace_key', wk)
                    return member.save()
                })

        return promise
    },

    approveNewWorkspace: function (workspace) {
        var workspaceKey = this.decryptWorkspaceKey(workspace)
        return this.approveMember(workspace.get('membership.id'), workspaceKey)
    },

    approveMembers: function () {
        var members = this.get('membersToApprove')
        if (!members) {
            throw Error('Members not loaded')
        }
        var workspace = this.get('workspace')
        if (!workspace) {
            throw Error('Workspace not selected')
        }

        var workspaceKey = this.get('workspaceKey')

        var promises = []
        members.forEach(function (member) {
            promises.push(this.approveMember(member.get('id'), workspaceKey))
        }.bind(this))

        var promises = Ember.RSVP.all(promises);
        return promises;

    },

    decryptWorkspaceData: function (data) {
        var coder = this.get('coder');
        var workspace = this.get('workspace')
        if (!workspace) {
            throw Error('Workspace not selected')
        }
        var workspaceKey = this.get('workspaceKey');

        data = coder.decryptAES(data, workspaceKey)
        data = JSON.parse(data)
        return data
    },

    encryptWorkspaceData: function (data) {
        var coder = this.get('coder');
        var workspace = this.get('workspace')
        if (!workspace) {
            throw Error('Workspace not selected')
        }
        var workspaceKey = this.get('workspaceKey');

        data = JSON.stringify(data)
        return coder.encryptAES(data, workspaceKey)
    }


});

