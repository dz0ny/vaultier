Vaultier.registerDI = function (app) {

    // service:config
    app.register('config:main', Vaultier.Config)
    app.inject('route', 'config', 'config:main');
    app.inject('controller', 'config', 'config:main');
    app.inject('view', 'config', 'config:main');
    app.inject('service', 'config', 'config:main');

    // service:store
    app.register('store:main', RESTless.get('client'), {instantiate: false})
    app.inject('route', 'store', 'store:main');
    app.inject('controller', 'store', 'store:main');

    // service:errors
    app.register('service:errors', Service.Errors)
    app.inject('route', 'errors', 'service:errors');
    app.inject('service:errors', 'errorController', 'controller:ErrorGeneric')
    app.inject('service:errors', 'router', 'router:main')

    // service:session and service:storage
    app.register('service:session', Service.Session)
    app.register('service:storage', Service.Storage)

    // service:auth
    app.register('service:auth', Service.Auth)
    app.inject('service:auth', 'coder', 'service:coder')
    app.inject('service:auth', 'store', 'store:main')
    app.inject('service:auth', 'router', 'router:main')
    app.inject('service:auth', 'session', 'service:session')
    app.inject('service:auth', 'storage', 'service:storage')
    app.inject('route', 'auth', 'service:auth');
    app.inject('controller', 'auth', 'service:auth');

    // service:coder
    app.register('service:coder', Service.Coder)

    // service:invitations
    app.register('service:invitations', Service.Invitations)
    app.inject('service:invitations', 'store', 'store:main')
    app.inject('service:invitations', 'session', 'service:session')
    app.inject('service:invitations', 'auth', 'service:auth');
    app.inject('service:invitations', 'router', 'router:main');
    app.inject('route:InvitationUse', 'invitations', 'service:invitations')
    app.inject('route:InvitationAccept', 'invitations', 'service:invitations')
    app.inject('route:WorkspaceMemberInvite', 'invitations', 'service:invitations')
    app.inject('route:VaultMemberInvite', 'invitations', 'service:invitations')
    app.inject('route:CardMemberInvite', 'invitations', 'service:invitations')
    app.inject('route:Workspaces', 'invitations', 'service:invitations')

    // service:keytransfer
    app.register('service:keytransfer', Service.KeyTransfer)
    app.inject('service:keytransfer', 'store', 'store:main');
    app.inject('service:keytransfer', 'auth', 'service:auth');
    app.inject('service:keytransfer', 'coder', 'service:coder');

    // service:members
    app.register('service:members', Service.Members)
    app.inject('service:members', 'auth', 'service:auth')
    app.inject('service:members', 'store', 'store:main');
    app.inject('service:members', 'coder', 'service:coder')
    app.inject('service:members', 'keytransfer', 'service:keytransfer')
    app.inject('route:WorkspacesCreate', 'members', 'service:members')
    app.inject('route:Workspace', 'members', 'service:members')
    app.inject('route:WorkspaceMemberApprove', 'members', 'service:members')




    // model injections - it is done in model inits

}