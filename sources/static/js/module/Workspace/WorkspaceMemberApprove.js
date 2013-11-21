Vaultier.WorkspaceApproveMemberRoute = Ember.Route.extend(
    Utils.ErrorAwareRouteMixin,
    {

        model: function (params, transition) {
        },

        setupController: function (ctrl, model) {
            ctrl.set('content', model)
            ctrl.set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router')})
                    .addHome()
                    .addWorkspace()
                    .addText('List of members to approve')
            );
        },

        actions: {
            acceptMembers: function () {
                alert('accept')
            },

            rejectMembers: function () {
                alert('reject')
            }
        }
    });
