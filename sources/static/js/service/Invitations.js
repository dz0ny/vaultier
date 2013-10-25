Po.NS('Service');

Service.Invitations = Ember.Object.extend({

    _memberPromise: function (workspace, email, send, resend) {
        return Ember.$.ajax({
            url: '/api/members/',
            type: 'post',
            data: {
                workspace: workspace.id,
                email: email,
                send: send,
                resend: resend
            }
        })
    },

    _invitePromise: function (member, role) {
        return  Ember.$.ajax({
            url: '/api/roles/',
            type: 'post',
            data: {
                member: member.id,
                level: role,
            },
            done: function (response) {
                resolve(response)
            },
            fail: function (error) {
                reject(error);
            }
        });
    },


    invite: function (workspace, email, role, send, resend) {
        send = Po.F.optional(send, false);
        resend = Po.F.optional(resend, false);

        return Ember.RSVP.resolve()
            .then(
                function () {
                    return this._memberPromise(workspace, email, send, resend)
                }.bind(this))

            .then(
                function (member) {
                    return this._invitePromise(member, role);
                }.bind(this))
    }


})
;
Service.Invitations.reopenClass(Utils.Singleton);
