Vaultier.DocumentsRoute = Ember.Route.extend(
    {

        beforeModel: function (transition) {

            // only authenticated user can access
            if (!this.get('auth').checkAuthenticatedOrLogin(transition)) {
                return false;
            }

            // if any invitations store in session, user will be redirected
            if (this.get('invitations').hasInvitationsInSession()) {
                transition.abort();
                var url = transition.router.generate('Invitation.accept');
                this.router.replaceWith(url);
                return;
            }
        }


    });

Vaultier.DocumentsIndexRoute = Ember.Route.extend(
    {
        model: function (params, transition) {
            var store = this.get('store');
            return store
                .find('Node')
                .then(function (nodes) {
                    var node = nodes.objectAt(0);
                    this.transitionTo('Document.list', node.get('id'));
                }.bind(this));
        }

    });


