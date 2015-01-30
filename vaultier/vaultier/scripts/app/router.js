/**
 * Vaultier router
 *
 * - define routing bindings here
 * - define base route classes here
 *
 * @module vaultier-routing
 * @class Vaultier.Router
 *
 */
Vaultier.Router.map(function () {

    /************************************************************
     * REGISTRATION
     ************************************************************/

    this.resource('AuthRegister', {path: '/auth/register'}, function () {
        this.route('before', { path: 'overview' });
        this.route('keys', { path: 'generate-keys' });
        this.route('creds', { path: 'submit-credentials' });
        this.route('sum', { path: '/registration-done' });
    });


    /************************************************************
     * Login
     ************************************************************/

    this.route('AuthLogin', {path: '/auth/login'});

    /*************************************************************
     * Recovery Key
     *************************************************************/

    this.resource('AuthLostKey', {path: '/lostkey'}, function () {
        this.route('success', {path: 'success'});

        this.resource('AuthLostKeyRecovery', {path: '/:id/:hash'}, function () {
            this.route('reset', {path: 'reset'});
            this.route('rebuild', {path: 'rebuild'});
            this.route('disable', {path: 'disable'});
            this.route('success', {path: 'success'});
        });
    });

    /************************************************************
     * invitations
     ************************************************************/

    this.resource('Invitation', {path: '/invitations'}, function () {
        // automatic Invitation.index
        this.route('use', { path: '/use/:invitation/:hash' });
        this.route('anonymous', { path: '/anonymous' });
        this.route('accept', { path: '/accept' });
    });

    /************************************************************
     * Settings
     ************************************************************/

    this.resource('Settings', {path: '/settings'}, function () {
        // automatic Settings.index
        this.route('personal', { path: '/personal' });
        this.route('keys', { path: '/keys' });

    });

    /************************************************************
     * Documents
     ************************************************************/

    this.resource('Documents', {path: '/documents'}, function () {
        this.resource('Document', {path: '/d/:document'}, function () {
            this.route('list', { path: '/list'});

            this.route('detail', { path: '/detail'});
            this.route('edit', { path: '/edit'});
            this.route('create', { path: '/create/:type'});
            this.route('move', { path: '/move'});

            this.route('rolesAdminIndex', { path: '/team'});
            this.route('rolesAdminInvite', { path: '/team/invite'});

            this.route('noKeys', { path: '/waiting-for-keys'});
        });
        this.route('createRoot', { path: '/create'});
        this.route('noNodes', { path: '/no-nodes'});
    });

    /************************************************************
     * System and error routes
     ************************************************************/

    this.route("ErrorGeneric", { path: "/errors/"});
    this.route("Error404", { path: "*path"}); //also referred as /errors/error-404

});

Ember.Route.reopen({
    activate: function () {
        this._super();
        window.scrollTo(0, 0);
    }
});

Vaultier.ApplicationRoute = Ember.Route.extend(
    {
        actions: {

            error: function (error, transition) {
                this.get('errors').processError(error);
                return false;
            },

            loading: function (transition, originRoute) {
//                ApplicationKernel.UI.showLoader();
                transition.promise.finally(function () {
//                    ApplicationKernel.UI.hideLoader();
                }.bind(this))
            }

        },

        beforeModel: function (params, transition) {
            // reload authenticated user from server
            var auth = this.get('auth');
            var status = auth.reload();
            return status;

        }
    })
;

Vaultier.IndexRoute = Ember.Route.extend(
    {
        redirect: function () {
            var auth = this.get('auth');
            if (auth.get('isAuthenticated')) {
                return this.transitionTo('Documents.index');
            } else {
                return this.transitionTo('AuthLogin');
            }
        }
    });

