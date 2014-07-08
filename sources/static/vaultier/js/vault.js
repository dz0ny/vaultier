Vaultier.VaultsIndexRoute = Ember.Route.extend(
    Vaultier.WorkspaceKeysMixin,
    {

        beforeModel: function () {
            this.checkWorkspaceKeys();
        },

        model: function (params, queryParams) {
            var workspace = this.modelFor('Workspace');

            // retrieve vaults
            var store = this.get('store');
            return store.find('Vault', {workspace: workspace.get('id')});
        },

        setupController: function (ctrl, vaults) {
            ctrl.set('content', vaults);

            // retrieve workspace
            var workspace = this.modelFor('Workspace');
            this.set('workspace', workspace);
            ctrl.set('workspace', workspace);

            // set breadcrumbs
            ctrl.set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router')})
                    .addHome()
                    .addWorkspace()
            )
        }

    });

Vaultier.VaultsIndexController = Ember.ArrayController.extend({
    breadcrumbs: null
});


Vaultier.VaultsIndexView = Ember.View.extend({
    templateName: 'Vault/VaultsIndex',
    layoutName: 'Layout/LayoutStandard'
});


Vaultier.VaultIndexItemView = Ember.View.extend({
    templateName: 'Vault/VaultsIndexItem'
});


Vaultier.VaultsCreateRoute = Ember.Route.extend(
    Vaultier.WorkspaceKeysMixin,
    {

        beforeModel: function () {
            this.checkWorkspaceKeys();
        },

        model: function (params, transition) {

            if (!this.get('auth').checkPermissions(transition, function () {
                return this.modelFor('Workspace').get('perms.create')
            }.bind(this), true)) {
                return;
            }

            store = this.get('store');
            var record = store.createRecord('Vault');
            return record;
        },

        actions: {
            save: function () {
                var workspace = this.get('workspace');
                var record = this.get('controller.content');
                record.set('workspace', this.get('workspace.id'))

                var promise = record
                    .saveRecord()
                    .then(function () {
                        $.notify('Your vault has been successfully created.', 'success');
                        this.transitionTo('Vault.index', record);
                    }.bind(this))
                    .catch(function (error) {
                        $.notify('Oooups! Something went wrong.', 'error');
                        this.get('errors').logError(error);
                    }.bind(this))

                ApplicationLoader.promise(promise);
            }
        },

        setupController: function (ctrl, model) {
            this._super(ctrl, model);

            // retrieve workspace
            var workspace = this.modelFor('Workspace');
            this.set('workspace', workspace);
            this.get('controller').set('workspace', workspace);

            // set breadcrumbs
            ctrl.set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router')})
                    .addHome()
                    .addWorkspace()
                    .addText('Create new vault')
            )

        }
    });

Vaultier.VaultsCreateController = Ember.ObjectController.extend({
    workspace: null,
    breadcrumbs: null,
    env: null
});

Vaultier.VaultsCreateView = Ember.View.extend({
    templateName: 'Vault/VaultsCreate',
    layoutName: 'Layout/LayoutStandard'
});


Vaultier.VaultRoute = Ember.Route.extend(
    Vaultier.WorkspaceKeysMixin,
    {
        model: function (params, transition) {
            workspace = this.modelFor('Workspace');
            model = this.get('store')
                .find('Vault', params.vault)
                .then(function (model) {
                    if (model.get('workspace') != workspace.get('id')) {
                        var error = new Error();
                        error.status = 404
                        throw error
                    }
                    return model
                })
            return model;
        },

        afterModel: function (vault) {
            Service.Environment.current().set('vault', vault);
            this.checkWorkspaceKeys();
        },

        serialize: function (model) {
            // primitives
            if (typeof model == 'string' || typeof model == 'number') {
                return model
            }

            return {
                vault: model.get('slug')
            }
        },

        actions: {
            deleteVault: function (vault) {
                Vaultier.confirmModal(this, 'Are you sure?', function () {
                    var promise = vault
                        .deleteRecord()
                        .then(
                            function () {
                                $.notify('Your vault has been successfully deleted.', 'success');
                                this.transitionTo('Vaults.index', this.get('workspace'));
                            }.bind(this),
                            function (error) {
                                $.notify('Oooups! Something went wrong.', 'error');
                            }.bind(this)
                        );
                    ApplicationLoader.promise(promise);

                }.bind(this));


            }

        }

    });

Vaultier.VaultIndexRoute = Ember.Route.extend(
    Vaultier.WorkspaceKeysMixin,
    {
        beforeModel: function () {
            if (this.checkWorkspaceKeys()) {
                this.transitionTo('Cards.index')
            }
        }
    })


Vaultier.VaultEditRoute = Ember.Route.extend(
    Vaultier.WorkspaceKeysMixin,
    {

        beforeModel: function() {
            this.checkWorkspaceKeys();
        },

        model: function (params, transition) {
            var vault = this.modelFor('Vault');

            if (!this.get('auth').checkPermissions(transition, function () {
                return vault.get('perms.update');
            }.bind(this), true)) {
                return;
            }

            return vault
        },

        setupController: function (ctrl, model) {
            this._super(ctrl, model);

            // set breadcrumbs
            ctrl.set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router')})
                    .addHome()
                    .addWorkspace()
                    .addVault()
                    .addText('Edit vault')
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
                        this.get('errors').logError(error)
                    }.bind(this))

                 ApplicationLoader.promise(promise);
            }
        }

    });

Vaultier.VaultEditController = Ember.ObjectController.extend({
    breadcrumbs: null
});

Vaultier.VaultEditView = Ember.View.extend({
    templateName: 'Vault/VaultEdit',
    layoutName: 'Layout/LayoutStandard'
});


Vaultier.VaultMemberIndexRoute = Vaultier.MemberIndexRoute.extend(
    Vaultier.WorkspaceKeysMixin,
    {
        beforeModel: function () {
            this.checkWorkspaceKeys();
        },

        setupInviteData: function (params) {
            var vault = this.modelFor('Vault');
            return {
                inviteObject: vault
            }
        },

        setupBlocks: function () {
            return {workspace: true, vault: true}
        },

        setupBreadcrumbs: function () {
            return Vaultier.Breadcrumbs.create({router: this.get('router')})
                .addHome()
                .addWorkspace()
                .addVault()
                .addCollaboratorsIndex('Vault.memberIndex');
        },

        setupInviteRoute: function (models) {
            return {
                inviteRouteName: 'Vault.memberInvite'
            }
        }

    });


Vaultier.VaultMemberIndexController = Vaultier.MemberIndexController.extend({
});


Vaultier.VaultMemberInviteRoute = Vaultier.MemberInviteRoute.extend(
    Vaultier.WorkspaceKeysMixin,
    {

        beforeModel: function () {
            this.checkWorkspaceKeys();
        },

        /**
         * override this to setup invite workspace and invite to object
         */
        setupInviteData: function (params) {
            var vault = this.modelFor('Vault');
            var workspace = this.modelFor('Workspace');
            return {
                inviteObject: vault,
                inviteParams: { to_vault: vault},
                inviteWorkspace: workspace
            }
        },

        setupBreadcrumbs: function () {
            return Vaultier.Breadcrumbs.create({router: this.get('router')})
                .addHome()
                .addWorkspace()
                .addVault()
                .addCollaboratorsIndex('Vault.memberIndex')
                .addCollaboratorsInvite('Vault.memberInvite');
        }

    });

Vaultier.VaultMemberInviteController = Vaultier.MemberInviteController.extend({
});


Ember.TEMPLATES["Vault/VaultsIndex"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n\n        <div class=\"vlt-page-toolbar pull-right\">\n            <div>\n\n                ");
  stack1 = (helper = helpers.exp || (depth0 && depth0.exp),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "( workspace.perms.update || workspace.perms.delete)", options) : helperMissing.call(depth0, "exp", "( workspace.perms.update || workspace.perms.delete)", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n\n                ");
  stack1 = helpers['if'].call(depth0, "workspace.perms.invite", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                ");
  stack1 = helpers['if'].call(depth0, "workspace.perms.create", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n            </div>\n        </div>\n\n    ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                    <div class=\"btn-group\">\n                        <button type=\"button\" class=\"btn btn-default dropdown-toggle btn-sm\" data-toggle=\"dropdown\">\n                            <span class=\"glyphicon glyphicon-cog\"></span>\n                        </button>\n                        <ul class=\"dropdown-menu caret-left\">\n\n                            ");
  stack1 = helpers['if'].call(depth0, "workspace.perms.update", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                            ");
  stack1 = helpers['if'].call(depth0, "workspace.perms.delete", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                        </ul>\n                    </div>\n                ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n                                <li>\n                                    ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Workspace.edit", "workspace.slug", options) : helperMissing.call(depth0, "link-to", "Workspace.edit", "workspace.slug", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                </li>\n                            ");
  return buffer;
  }
function program4(depth0,data) {
  
  
  data.buffer.push("\n                                        Edit workspace\n                                    ");
  }

function program6(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                                <li>\n                                    <a href=\"#\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteWorkspace", "workspace", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push(">Delete workspace</a>\n                                </li>\n                            ");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n                    <div\n                            class=\"vlt-button-wrapper\"\n                            data-toggle=\"tooltip\"\n                            title=\n                                    \"\n                             Invite new team members to collaborate over this workspace\n                             or  grant access permission to current team members\n                             \"\n                            data-placement=\"bottom\"\n                            >\n                        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-default")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Workspace.memberIndex", "workspace.slug", options) : helperMissing.call(depth0, "link-to", "Workspace.memberIndex", "workspace.slug", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </div>\n                ");
  return buffer;
  }
function program9(depth0,data) {
  
  
  data.buffer.push("\n                            <span class=\"glyphicon glyphicon-user\"></span>\n                            Collaborate\n                        ");
  }

function program11(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n                    <div\n                            class=\"vlt-button-wrapper\"\n                            data-toggle=\"tooltip\"\n                            title=\n                                    \"\n                                    Vaults are used to organize your secrets into cards in vault.\n                                    You can also collaborate with other team members at the vault\n                                    \"\n                            data-placement=\"bottom\"\n                            >\n                        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-primary")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Vaults.create", "workspace.slug", options) : helperMissing.call(depth0, "link-to", "Vaults.create", "workspace.slug", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </div>\n                ");
  return buffer;
  }
function program12(depth0,data) {
  
  
  data.buffer.push("\n                            <span class=\"glyphicon glyphicon-plus\"></span>\n                            Create new vault\n                        ");
  }

function program14(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n            ");
  stack1 = helpers.each.call(depth0, {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(15, program15, data),contexts:[],types:[],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        ");
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.VaultIndexItemView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n            ");
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n            <div class=\"jumbotron vlt-bigbox vlt-vault col-md-8 col-md-offset-2\">\n                <div class=\"vlt-header\">\n                    <div class=\"vlt-icon\">\n\n                    </div>\n                    <div class=\"vlt-title\">\n                        <h1>You do not have any vault yet</h1>\n                    </div>\n                </div>\n\n\n                ");
  stack1 = helpers['if'].call(depth0, "workspace.perms.create", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n            </div>\n        ");
  return buffer;
  }
function program18(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n\n                    <p>\n                        Vaults are used to organize your secrets into cards in vault.\n                        You can also collaborate with other team members at the vault\n                    </p>\n\n                    <p class=\"top-30\">\n                        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-lg btn-primary")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Vaults.create", "workspace", options) : helperMissing.call(depth0, "link-to", "Vaults.create", "workspace", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </p>\n                ");
  return buffer;
  }

  data.buffer.push("<div class=\"vlt-page-nav\">\n\n    ");
  stack1 = (helper = helpers.exp || (depth0 && depth0.exp),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "( workspace.perms.invite || workspace.perms.create || workspace.perms.update || workspace.perms.delete)", options) : helperMissing.call(depth0, "exp", "( workspace.perms.invite || workspace.perms.create || workspace.perms.update || workspace.perms.delete)", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n    <div class=\"pull-left\">\n        <h2>Workspace \"");
  stack1 = helpers._triageMustache.call(depth0, "workspace.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\" dashboard</h2>\n    </div>\n\n    <div class=\"clearfix\"></div>\n\n</div>\n\n<div class=\"row\">\n    <div class=\"col-md-12\">\n\n\n        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.WorkspacesIndexWithoutKeysView", {hash:{
    'workspace': ("workspace")
  },hashTypes:{'workspace': "ID"},hashContexts:{'workspace': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n\n        ");
  stack1 = helpers['if'].call(depth0, "length", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(17, program17, data),fn:self.program(14, program14, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n    </div>\n</div>\n\n");
  return buffer;
  
});

Ember.TEMPLATES["Vault/VaultsIndexItem"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n    ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("vlt-item vlt-vault-item")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Vault.index", "", options) : helperMissing.call(depth0, "link-to", "Vault.index", "", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n        <div class=\"vlt-header\">\n            <div class=\"vlt-icon\">\n                <img src=\"/static/vaultier/images/icon-vault-dark-blue.png\">\n            </div>\n            <div class=\"vlt-title\">\n                <h3>\n                    ");
  data.buffer.push(escapeExpression((helper = helpers.ellipsis || (depth0 && depth0.ellipsis),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","INTEGER"],data:data},helper ? helper.call(depth0, "name", 35, options) : helperMissing.call(depth0, "ellipsis", "name", 35, options))));
  data.buffer.push("\n                </h3>\n\n            </div>\n        </div>\n        <div class=\"vlt-body\">\n            ");
  stack1 = helpers['if'].call(depth0, "description", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n        <div class=\"vlt-footer\">\n            <div class=\"vlt-footer-item help-block pull-left\">\n                ");
  data.buffer.push(escapeExpression((helper = helpers.printUser || (depth0 && depth0.printUser),options={hash:{
    'ellipsis': (12),
    'prefix': ("Created by:")
  },hashTypes:{'ellipsis': "INTEGER",'prefix': "STRING"},hashContexts:{'ellipsis': depth0,'prefix': depth0},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "created_by", options) : helperMissing.call(depth0, "printUser", "created_by", options))));
  data.buffer.push("\n            </div>\n            <div class=\"vlt-footer-item help-block pull-right\">\n                ");
  data.buffer.push(escapeExpression((helper = helpers.printAgo || (depth0 && depth0.printAgo),options={hash:{
    'prefix': ("Latest modification at:")
  },hashTypes:{'prefix': "STRING"},hashContexts:{'prefix': depth0},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "updated_at", options) : helperMissing.call(depth0, "printAgo", "updated_at", options))));
  data.buffer.push("\n            </div>\n            <div class=\"clearfix\"></div>\n        </div>\n        <div class=\"clearfix\"></div>\n    ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n                ");
  data.buffer.push(escapeExpression((helper = helpers.ellipsis || (depth0 && depth0.ellipsis),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","INTEGER"],data:data},helper ? helper.call(depth0, "description", 250, options) : helperMissing.call(depth0, "ellipsis", "description", 250, options))));
  data.buffer.push("\n            ");
  return buffer;
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\n                No description given\n            ");
  }

  stack1 = helpers['if'].call(depth0, "id", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n");
  return buffer;
  
});

Ember.TEMPLATES["Vault/VaultsCreate"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"vlt-dialog col-md-8 col-md-offset-2 top-50\">\n    <form>\n        <div class=\"vlt-dialog-content\">\n            <div class=\"vlt-dialog-header\">\n                <h2>Create new vault</h2>\n            </div>\n            <div class=\"vlt-dialog-body\">\n\n                <div class=\"col-md-8 col-md-offset-2\">\n\n                    <div class=\"form-group\" ");
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
  data.buffer.push(">\n                        <label for=\"workspace-description\">Description</label>\n\n                        ");
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
  data.buffer.push(" class=\"btn btn-primary\">\n                    <span class=\"glyphicon glyphicon-ok\"></span>\n                    Create new vault\n                </button>\n            </div>\n        </div>\n    </form>\n</div>\n\n");
  return buffer;
  
});

Ember.TEMPLATES["Vault/VaultEdit"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"vlt-dialog col-md-8 col-md-offset-2 top-50\">\r\n    <form>\r\n        <div class=\"vlt-dialog-content\">\r\n            <div class=\"vlt-dialog-header\">\r\n                <h2>Edit vault</h2>\r\n            </div>\r\n\r\n            <div class=\"vlt-dialog-body\">\r\n                <div class=\"col-md-8 col-md-offset-2\">\r\n\r\n                    <div class=\"form-group\"  ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("content.errors.name:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n                        <label for=\"vault-name\">Name</label>\r\n                        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextField", {hash:{
    'elementId': ("vault-name"),
    'valueBinding': ("content.name"),
    'class': ("form-control")
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        <span class=\"error\">\r\n                            ");
  stack1 = helpers._triageMustache.call(depth0, "content.errors.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        </span>\r\n                    </div>\r\n\r\n                    <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("content.errors.description:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n                        <label for=\"vault-description\">Description</label>\r\n                        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextArea", {hash:{
    'elementId': ("vault-description"),
    'valueBinding': ("content.description"),
    'class': ("form-control"),
    'rows': (5)
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING",'rows': "INTEGER"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0,'rows': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        <span class=\"error\">\r\n                            ");
  stack1 = helpers._triageMustache.call(depth0, "content.errors.description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        </span>\r\n                    </div>\r\n\r\n                </div>\r\n                <div class=\"clearfix\"></div>\r\n            </div>\r\n\r\n            <div class=\"vlt-dialog-footer\">\r\n                <a href=\"javascript:window.history.go(-1)\" class=\"btn btn-default btn-sm\">\r\n                    <span class=\"glyphicon glyphicon-chevron-left\"></span>\r\n                    Back\r\n                </a>\r\n                <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("saveDisabled")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"btn btn-primary\">\r\n                    <span class=\"glyphicon glyphicon-ok\"></span>\r\n                    Save changes\r\n                </button>\r\n            </div>\r\n\r\n        </div>\r\n    </form>\r\n</div>\r\n\r\n");
  return buffer;
  
});

//# sourceMappingURL=vault.js.map