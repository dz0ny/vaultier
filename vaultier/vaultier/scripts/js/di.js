
Vaultier.registerDI = function (app) {

    // service:config
    app.register('config:main', Vaultier.Config)
    app.inject('route', 'config', 'config:main');
    app.inject('controller', 'config', 'config:main');
    app.inject('view', 'config', 'config:main');
    app.inject('service', 'config', 'config:main');

    // service:store
    app.register('store:main', Vaultier.Client, {instantiate: false});
    app.inject('route', 'store', 'store:main');
    app.inject('controller', 'store', 'store:main');
    app.inject('component', 'store', 'store:main');
    //also there lazy loading does not work properly with ember initialize:
    RESTless.set('client', Vaultier.Client);

    app.register('store:nonpluralize', Vaultier.NonPluralizeClient, {instantiate: false});
    app.inject('route', 'storeNonPluralize', 'store:nonpluralize')

    // service:errors
    app.register('service:errors', Service.Errors);
    app.inject('route', 'errors', 'service:errors');
    app.inject('component', 'errors', 'service:errors');
    app.inject('view', 'errors', 'service:errors');

    app.inject('service:errors', 'errorController', 'controller:ErrorGeneric');
    app.inject('service:errors', 'router', 'router:main')
//    app.inject('controller', 'errors', 'service:errors');


    // service:session and service:storage
    app.register('service:session', Service.Session);
    app.register('service:storage', Service.Storage);

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
    app.inject('route:WorkspaceRolesAdminInvite', 'invitations', 'service:invitations')
    app.inject('route:VaultRolesAdminInvite', 'invitations', 'service:invitations')
    app.inject('route:CardRolesAdminInvite', 'invitations', 'service:invitations');
    app.inject('route:Workspaces', 'invitations', 'service:invitations');

    // service:keytransfer
    app.register('service:keytransfer', Service.KeyTransfer)
    app.inject('service:keytransfer', 'store', 'store:main');
    app.inject('service:keytransfer', 'auth', 'service:auth');
    app.inject('service:keytransfer', 'coder', 'service:coder');

    // service:workspacekey
    app.register('service:workspacekey', Service.WorkspaceKey);
    app.inject('service:workspacekey', 'auth', 'service:auth');
    app.inject('service:workspacekey', 'store', 'store:main');
    app.inject('service:workspacekey', 'coder', 'service:coder');
    app.inject('service:workspacekey', 'keytransfer', 'service:keytransfer');

    app.inject('route:WorkspacesCreate', 'workspacekey', 'service:workspacekey');
    app.inject('route:Workspace', 'workspacekey', 'service:workspacekey');
    app.inject('route:WorkspaceNoKeys', 'workspacekey', 'service:workspacekey');

    // service:changekey
    app.register('service:changekey', Service.ChangeKey);
    app.inject('route:SettingsKeys', 'changekey', 'service:changekey');
    app.inject('route:AuthLostKeyRecoveryRebuild', 'changekey', 'service:changekey');
    app.inject('service:changekey', 'store', 'store:main');
    app.inject('service:changekey', 'auth', 'service:auth');
    app.inject('service:changekey', 'coder', 'service:coder');

    // service:newuserinit
    app.register('service:newuserinit', Service.NewUserInit);
    app.inject('service:newuserinit', 'auth', 'service:auth');
    app.inject('service:newuserinit', 'router', 'router:main');
    app.inject('service:newuserinit', 'invitations', 'service:invitations');
    app.inject('route:AuthRegisterCreds', 'newuserinit', 'service:newuserinit')


    // components injections
    app.inject('component:change-key', 'changekey', 'service:changekey');

    // service:environment
    app.register('service:environment', Service.Environment);
    app.inject('route', 'environment', 'service:environment');
    app.inject('controller:LayoutWorkspaceBox', 'environment', 'service:environment');
    app.inject('service:invitations', 'env', 'service:environment');

    app.inject('component:roles-admin-box', 'auth', 'service:auth');
    // model injections - it is done in model inits
}