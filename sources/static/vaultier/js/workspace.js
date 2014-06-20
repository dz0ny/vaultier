Vaultier.WorkspacesRoute = Ember.Route.extend(
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

Vaultier.WorkspacesIndexRoute = Ember.Route.extend(
    {
        model: function (params, transition) {
            var store = this.get('store');
            var promise = store
                .find('Workspace')
                .then(function (workspaces) {
                    if (workspaces.get('length') == 1) {
                        var workspace = workspaces.objectAt(0);
                        this.transitionTo('Workspace.index', workspace.get('slug'));
                    } else {
                        this.transitionTo('Workspaces.select');
                    }
                }.bind(this))

            return promise
        }

    });


Vaultier.WorkspacesSelectRoute = Ember.Route.extend(
    {

        model: function () {
            var store = this.get('store');
            var promise = store.find('Workspace')
            return promise;
        },

        setupController: function (ctrl, model) {
            this._super(ctrl, model);

            ctrl.set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router')})
                    .addHome()
                    .addText('List of workspaces', '/static/vaultier/images/icon-home-grey.png')
            );
        },

        renderTemplate: function () {
            this.render('WorkspacesIndex');
        }
    });


Vaultier.WorkspacesIndexView = Ember.View.extend({
    templateName: 'Workspace/WorkspacesIndex',
    layoutName: 'Layout/LayoutStandard'
});

Vaultier.WorkspacesIndexItemView = Ember.View.extend({
    templateName: 'Workspace/WorkspacesIndexItem'
});

Vaultier.WorkspacesIndexWithoutKeysView = Ember.View.extend({
    templateName: 'Workspace/WorkspacesIndexWithoutKeys'
});


Vaultier.WorkspacesCreateRoute = Ember.Route.extend({
    actions: {
        save: function () {
            var record = this.get('controller.content');
            var promise = record.saveRecord()
                .then(
                    function () {
                        $.notify('You workspace has been successfully created.', 'success');
                        this.transitionTo('Workspace.index', record.get('slug'));
                    }.bind(this))

                .catch(function (error) {
                    $.notify('Oooups! Something went wrong.', 'error');
                    this.get('errors').logError(error);
                }.bind(this))

            ApplicationLoader.promise(promise);

            return promise
        }
    },

    setupController: function (ctrl, model) {
        this._super(ctrl, model);

        // set breadcrumbs
        ctrl.set('breadcrumbs',
            Vaultier.Breadcrumbs.create({router: this.get('router')})
                .addHome()
                .addText('Create new workspace')
        )
    },

    model: function (params) {
        var store = this.get('store');
        var record = store.createRecord('Workspace');
        return record;
    }

});

Vaultier.WorkspacesCreateController = Ember.ObjectController.extend({
    breadcrumbs: null
});

Vaultier.WorkspacesCreateView = Ember.View.extend({
    templateName: 'Workspace/WorkspacesCreate',
    layoutName: 'Layout/LayoutStandard'
});


Vaultier.WorkspaceKeysMixin = Ember.Mixin.create({

    checkWorkspaceKeys: function () {
        workspace = this.modelFor('Workspace');
        if (workspace.get('membership.status') != Vaultier.Member.proto().statuses['MEMBER'].value) {
            this.transitionTo('Workspace.noKeys');
            return false;
        }
        return true
    }

});

Vaultier.WorkspaceRoute = Ember.Route.extend(
    Vaultier.WorkspaceKeysMixin,
    {

        /**
         * @DI service:workspacekey
         */
        workspacekey: null,

        model: function (params, transition) {
            var promise = this.get('store').find('Workspace', params.workspace)

            return promise;
        },

        afterModel: function (workspace, transition) {
            // select working workspace
            this.get('workspacekey').selectWorkspace(workspace)

            // set environments
            // @deprecated
            Service.Environment.current().set('workspace', workspace);

            this.checkWorkspaceKeys()
        },

        deactivate: function () {
            Service.Environment.current().set('workspace', null);
        },

        serialize: function (model) {
            // primitives
            if (typeof model == 'string' || typeof model == 'number') {
                return model
            }

            return {
                workspace: model.get('slug')
            }
        },

        actions: {
            deleteWorkspace: function (workspace) {
                Vaultier.confirmModal(this, 'Are you sure?', function () {
                    var promise = workspace
                        .deleteRecord()
                        .then(
                            function () {
                                $.notify('Your workspace has been successfully deleted.', 'success');
                                this.transitionTo('Workspaces.select');
                            }.bind(this))
                        .catch(function (error) {
                            $.notify('Oooups! Something went wrong.', 'error');
                            throw error
                        }.bind(this))

                    ApplicationLoader.promise(promise);

                }.bind(this));
            }
        }
    });

Vaultier.WorkspaceIndexRoute = Ember.Route.extend(
    Vaultier.WorkspaceKeysMixin,
    Ember.Evented,
    {
        beforeModel: function () {
            if (this.checkWorkspaceKeys()) {
                this.transitionTo('Vaults.index')
            }
        }
    })

/**
 * Class represents route when user has no workspacekey. User is redirected to here when he has no workspace key
 * from any page inside workspace
 * @type Ember.Route
 */
Vaultier.WorkspaceNoKeysRoute = Ember.Route.extend({

    /**
     * Service workspacekey is injected by depencency container
     * @DI service:workspacekey
     */
    workspacekey: null,

    /**
     * Method is automatically called when workspace key is transfered
     */
    keysTransfered : function() {
        this.transitionTo('Workspace.index', workspace);
    },

    /**
     * When route is activated bind to workspacekey service keyTransfered event to
     * redirect to workspace index
     */
    activate: function() {
        var workspacekey = this.get('workspacekey');
        workspacekey.on('keyTransfered', this, this.keysTransfered);
    },

    /**
     * Detach from keyTransfered event
     */
    deactivate: function() {
        var workspacekey = this.get('workspacekey');
        workspacekey.off('keyTransfered', this, this.keysTransfered);
    },

    setupController: function (ctrl, model) {
        this._super.apply(this, arguments);

        // set breadcrumbs
        ctrl.set('breadcrumbs',
            Vaultier.Breadcrumbs.create({router: this.get('router')})
                .addHome()
                .addWorkspace()
                .addText('Waiting for keys')
        )
    }
})

Vaultier.WorkspaceNoKeysView = Ember.View.extend({
    templateName: 'Workspace/WorkspaceNoKeys',
    layoutName: 'Layout/LayoutStandard'
});


Vaultier.WorkspaceEditRoute = Ember.Route.extend(
    Vaultier.WorkspaceKeysMixin,
    {

        beforeModel: function() {
            this.checkWorkspaceKeys();
        },

        model: function (params, transition) {
            var workspace = this.modelFor('Workspace');

            if (!this.get('auth').checkPermissions(transition, function () {
                return workspace.get('perms.update')
            }.bind(this), true)) {
                return;
            }

            return workspace
        },

        setupController: function (ctrl, model) {
            this._super(ctrl, model);

            // set breadcrumbs
            ctrl.set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router')})
                    .addHome()
                    .addWorkspace()
                    .addText('Edit workspace')
            )
        },

        actions: {
            save: function () {
                var record = this.get('controller.content');
                var promise = record
                    .saveRecord()
                    .then(function () {
                        $.notify('Your changes has been successfully saved.', 'success');
                        history.go(-1);
                    }.bind(this))

                    .catch(function (error) {
                        $.notify('Oooups! Something went wrong.', 'error');
                        this.get('errors').logError(error);
                    }.bind(this))

                ApplicationLoader.promise(promise);
            }
        }
    });

Vaultier.WorkspaceEditController = Ember.ObjectController.extend({
    breadcrumbs: null
});

Vaultier.WorkspaceEditView = Ember.View.extend({
    templateName: 'Workspace/WorkspaceEdit',
    layoutName: 'Layout/LayoutStandard'
});


/**
 * Workspace memberships, because of nested routing in namespace of vault
 */
Vaultier.WorkspaceMemberIndexRoute = Vaultier.MemberIndexRoute.extend(
    Vaultier.WorkspaceKeysMixin,
    {
        beforeModel: function () {
            this.checkWorkspaceKeys();
        },

        setupInviteData: function (params) {
            var workspace = this.modelFor('Workspace');
            return {
                inviteObject: workspace
            }
        },

        setupBlocks: function () {
            return {workspace: true}
        },

        setupBreadcrumbs: function () {
            return Vaultier.Breadcrumbs.create({router: this.get('router')})
                .addHome()
                .addWorkspace()
                .addCollaboratorsIndex('Workspace.memberIndex');
        },

        setupInviteRoute: function (models) {
            return {
                inviteRouteName: 'Workspace.memberInvite'
            }
        }
    }
)
;


Vaultier.WorkspaceMemberIndexController = Vaultier.MemberIndexController.extend({
});


Vaultier.WorkspaceMemberInviteRoute = Vaultier.MemberInviteRoute.extend(
    Vaultier.WorkspaceKeysMixin,
    {

        beforeModel: function () {
            this.checkWorkspaceKeys();
        },

        setupInviteData: function (params) {
            var workspace = this.modelFor('Workspace');
            return {
                inviteObject: workspace,
                inviteParams: { to_workspace: workspace},
                inviteWorkspace: workspace
            }
        },

        setupBreadcrumbs: function () {
            return Vaultier.Breadcrumbs.create({router: this.get('router')})
                .addHome()
                .addWorkspace()
                .addCollaboratorsIndex('Workspace.memberIndex')
                .addCollaboratorsInvite('Workspace.memberInvite');
        }

    });

Vaultier.WorkspaceMemberInviteController = Vaultier.MemberInviteController.extend({
});


Ember.TEMPLATES["Workspace/WorkspacesIndex"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n        <div class=\"vlt-page-toolbar pull-right\">\n\n            <div\n                    title=\"\n                    Workspaces are used to organize your secrets. All your vaults, cards and secrets are\n                    stored inside workspace. You can also collaborate with your team at the workspace\n                    \"\n                    data-toggle=\"tooltip\"\n                    data-placement=\"bottom\"\n                    >\n                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-primary")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "Workspaces.create", options) : helperMissing.call(depth0, "link-to", "Workspaces.create", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </div>\n        </div>\n    ");
  return buffer;
  }
function program2(depth0,data) {
  
  
  data.buffer.push("\n                    <span class=\"glyphicon glyphicon-plus\"></span>\n                Create new workspace\n                ");
  }

function program4(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n            <div class=\"col-md-8 col-md-offset-2\">\n                <h4>Please select workspace you want to work with</h4>\n\n                <div class=\"list-group\">\n                    ");
  stack1 = helpers.each.call(depth0, {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[],types:[],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                </div>\n            </div>\n        ");
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.WorkspacesIndexItemView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                    ");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n            <div class=\"jumbotron vlt-bigbox vlt-workspace col-md-8 col-md-offset-2\">\n                <div class=\"vlt-header\">\n                    <div class=\"vlt-icon\">\n\n                    </div>\n                    <div class=\"vlt-title\">\n                        <h1>You do not have any workspace yet</h1>\n                    </div>\n                </div>\n\n                <p>\n                    Workspaces are used to organize your secrets. All your vaults, cards and secrets are\n                    stored inside workspace. You can also collaborate with your team at the workspace\n                </p>\n\n                <p class=\"top-30\">\n                    ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-lg btn-primary")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "Workspaces.create", options) : helperMissing.call(depth0, "link-to", "Workspaces.create", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                </p>\n            </div>\n        ");
  return buffer;
  }
function program8(depth0,data) {
  
  
  data.buffer.push("\n                        <span class=\"glyphicon glyphicon-plus\"></span>\n                        Create new workspace\n                    ");
  }

  data.buffer.push("<div class=\"vlt-page-nav\">\n\n    ");
  stack1 = helpers['if'].call(depth0, "length", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n    <div class=\"clearfix\"></div>\n\n</div>\n\n<div class=\"row\">\n    <div class=\"col-md-12\">\n\n        ");
  stack1 = helpers['if'].call(depth0, "length", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(7, program7, data),fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n    </div>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["Workspace/WorkspacesIndexItem"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n    <div class=\"vlt-icon\">\n        <img src=\"/static/vaultier/images/icon-workspace-grey.png\"/>\n    </div>\n    <div class=\"vlt-text\">\n        <h4 class=\"list-group-item-heading\">");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h4>\n\n        <p class=\"list-group-item-text\">\n            ");
  stack1 = helpers._triageMustache.call(depth0, "description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </p>\n\n        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.WorkspacesIndexWithoutKeysView", {hash:{
    'workspace': ("")
  },hashTypes:{'workspace': "ID"},hashContexts:{'workspace': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n\n        <div class=\"top-15\">\n            <div class=\"vlt-footer-item help-block pull-left\">\n                ");
  data.buffer.push(escapeExpression((helper = helpers.printUser || (depth0 && depth0.printUser),options={hash:{
    'ellipsis': (20),
    'prefix': ("Created by:")
  },hashTypes:{'ellipsis': "INTEGER",'prefix': "STRING"},hashContexts:{'ellipsis': depth0,'prefix': depth0},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "created_by", options) : helperMissing.call(depth0, "printUser", "created_by", options))));
  data.buffer.push("\n            </div>\n            <div class=\"vlt-footer-item help-block pull-right\">\n                ");
  data.buffer.push(escapeExpression((helper = helpers.printAgo || (depth0 && depth0.printAgo),options={hash:{
    'prefix': ("Latest modification at:")
  },hashTypes:{'prefix': "STRING"},hashContexts:{'prefix': depth0},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "updated_at", options) : helperMissing.call(depth0, "printAgo", "updated_at", options))));
  data.buffer.push("\n            </div>\n            <div class=\"clearfix\"></div>\n        </div>\n\n        <div class=\"clearfix\"></div>\n    </div>\n\n");
  return buffer;
  }

  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("list-group-item vlt-workspace-item")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Workspace.index", "slug", options) : helperMissing.call(depth0, "link-to", "Workspace.index", "slug", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n\n\n");
  return buffer;
  
});

Ember.TEMPLATES["Workspace/WorkspacesIndexWithoutKeys"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\n    <div class=\"alert alert-warning top-15\">\n        <b> Your access to workspace is limited.<br/></b>\n        Workspace key has not been transfered to you yet. Key will be transfered to you automatically once\n        some workspace team member will go online.\n    </div>\n");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\n    <div class=\"alert alert-danger top-15\">\n        <b>Workspace key error. <br/></b>\n        Your workspace key cannot be decoded. It means you have no access to workspace secret data\n    </div>\n");
  }

  stack1 = helpers.unless.call(depth0, "view.workspace.hasValidKey", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n");
  stack1 = helpers['if'].call(depth0, "view.workspace.keyError", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["Workspace/WorkspacesCreate"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"vlt-dialog col-md-8 col-md-offset-2 top-50\">\n    <form>\n        <div class=\"vlt-dialog-content\">\n            <div class=\"modal-header\">\n                <h2>Create new workspace</h2>\n            </div>\n            <div class=\"vlt-dialog-body\">\n\n                <div class=\"col-md-10 col-md-offset-1\">\n\n                    <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("content.errors.name:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n                        <label for=\"workspace-name\">Name</label>\n                        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextField", {hash:{
    'elementId': ("workspace-name"),
    'valueBinding': ("content.name"),
    'class': ("form-control")
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                        <span class=\"error\">\n                            ");
  stack1 = helpers._triageMustache.call(depth0, "content.errors.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        </span>\n                    </div>\n\n                    <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("content.errors.description:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n                        <label for=\"workspace-description\">Description</label>\n                        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextArea", {hash:{
    'elementId': ("workspace-description"),
    'valueBinding': ("content.description"),
    'class': ("form-control"),
    'rows': (5)
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING",'rows': "INTEGER"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0,'rows': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                        <span class=\"error\">\n                            ");
  stack1 = helpers._triageMustache.call(depth0, "content.errors.description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        </span>\n                    </div>\n                </div>\n\n                <div class=\"clearfix\"></div>\n\n            </div>\n            <div class=\"vlt-dialog-footer\">\n                <a href=\"javascript:window.history.go(-1)\" class=\"btn btn-default btn-sm\">\n                    <span class=\"glyphicon glyphicon-chevron-left\"></span>\n                    Back\n                </a>\n                <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("saveDisabled")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"btn btn-primary\">\n                    <span class=\"glyphicon glyphicon-ok\"></span>\n                    Create new workspace\n                </button>\n            </div>\n\n        </div>\n    </form>\n</div>\n\n\n");
  return buffer;
  
});

Ember.TEMPLATES["Workspace/WorkspaceEdit"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"vlt-dialog col-md-8 col-md-offset-2 top-50\">\r\n    <form>\r\n        <div class=\"vlt-dialog-content\">\r\n            <div class=\"vlt-dialog-header\">\r\n                <h2>Edit workspace</h2>\r\n            </div>\r\n            <div class=\"vlt-dialog-body\">\r\n\r\n                <div class=\"col-md-10 col-md-offset-1\">\r\n\r\n                    <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("errors.name:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n                        <label for=\"workspace-name\">Name</label>\r\n\r\n                        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextField", {hash:{
    'elementId': ("workspace-name"),
    'valueBinding': ("content.name"),
    'class': ("form-control")
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        <span class=\"error\">\r\n                            ");
  stack1 = helpers._triageMustache.call(depth0, "content.errors.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        </span></div>\r\n\r\n                    <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("errors.description:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n                        <label for=\"workspace-description\">Description</label>\r\n                        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextArea", {hash:{
    'elementId': ("workspace-description"),
    'valueBinding': ("content.description"),
    'class': ("form-control"),
    'rows': (5)
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING",'rows': "INTEGER"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0,'rows': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        <span class=\"error\">\r\n                            ");
  stack1 = helpers._triageMustache.call(depth0, "content.errors.description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        </span>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"clearfix\"></div>\r\n\r\n            </div>\r\n            <div class=\"vlt-dialog-footer\">\r\n                <a href=\"javascript:window.history.go(-1)\" class=\"btn btn-default btn-sm\">\r\n                    <span class=\"glyphicon glyphicon-chevron-left\"></span>\r\n                    Back\r\n                </a>\r\n                <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("saveDisabled")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"btn btn-primary\">\r\n                    <span class=\"glyphicon glyphicon-ok\"></span>\r\n                    Save changes\r\n                </button>\r\n            </div>\r\n\r\n        </div>\r\n    </form>\r\n</div>\r\n\r\n\r\n");
  return buffer;
  
});

Ember.TEMPLATES["Workspace/WorkspaceNoKeys"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div class=\"row top-30\">\n    <div class=\"col-md-12\">\n        <div class=\"jumbotron vlt-bigbox vlt-no-keys col-md-8 col-md-offset-2\">\n            <div class=\"vlt-header\">\n                <div class=\"vlt-icon\">\n\n                </div>\n                <div class=\"vlt-title\">\n                    <h1>You do not have keys to workspace yet </h1>\n                </div>\n            </div>\n            <p>\n                Please wait till keys will be automatically transfered to you\n                when somebody of team goes online. You will get email once keys received.\n                <br/>\n                <br/>\n                Keys are used to encrypt and decrypt workspace data\n\n            </p>\n        </div>\n    </div>\n</div>\n\n");
  
});

//# sourceMappingURL=workspace.js.map