Vaultier.WorkspaceMemberApproveRoute = Ember.Route.extend(
    Utils.ErrorAwareRouteMixin,
    {

        model: function (params, transition) {

            // check permissions
            var workspace = this.modelFor('Workspace');
            if (!this.checkPermissions(transition, function () {
                return workspace.get('perms.invite')
            }.bind(this), true)) {
                return;
            }

            // load members
            var promise = this.get('members').loadMembersToApprove(workspace)

            return promise
        },

        setupController: function (ctrl, model) {
            ctrl.set('content', model)

            ctrl.set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router')})
                    .addHome()
                    .addWorkspace()
                    .addLink('Workspace.memberIndex', 'Collaborators')
                    .addText('List of members to approve')
            );
        },

        actions: {
            acceptMembers: function () {
                var promise = this.get('members').approveMembers();

                promise.then(
                    function () {
                        $.notify('Members were successfully approved.', 'success');
                        history.go(-1)
                    },
                    function () {
                        $.notify('Oooups! Something went wrong.', 'error');
                    }
                )

            },

            rejectMembers: function () {
                alert('reject')
            }
        }
    });

Vaultier.WorkspaceMemberApproveController = Ember.ArrayController.extend({
    breadcrumbs: null
});

Vaultier.WorkspaceMemberApproveView = Ember.View.extend({
    templateName: 'Workspace/WorkspaceMemberApprove',
    layoutName: 'Layout/LayoutStandard'
});
