Vaultier.WorkspacesRoute=Ember.Route.extend({beforeModel:function(e){if(!this.get("auth").checkAuthenticatedOrLogin(e))return!1;if(this.get("invitations").hasInvitationsInSession()){e.abort();var t=e.router.generate("Invitation.accept");return void this.router.replaceWith(t)}}}),Vaultier.WorkspacesIndexRoute=Ember.Route.extend({model:function(){var e=this.get("store"),t=e.find("Workspace").then(function(e){if(1==e.get("length")){var t=e.objectAt(0);this.transitionTo("Workspace.index",t.get("slug"))}else this.transitionTo("Workspaces.select")}.bind(this));return t}}),Vaultier.WorkspacesSelectRoute=Ember.Route.extend({model:function(){var e=this.get("store"),t=e.find("Workspace");return t},setupController:function(e,t){this._super(e,t),e.set("breadcrumbs",Vaultier.Breadcrumbs.create({router:this.get("router"),environment:this.get("environment")}).addHome().addText("List of workspaces","/static/vaultier/images/icon-home-grey.png"))},renderTemplate:function(){this.render("WorkspacesIndex")}}),Vaultier.WorkspacesIndexView=Ember.View.extend({templateName:"Workspace/WorkspacesIndex",layoutName:"Layout/LayoutStandard"}),Vaultier.WorkspacesIndexItemView=Ember.View.extend({templateName:"Workspace/WorkspacesIndexItem"}),Vaultier.WorkspacesIndexWithoutKeysView=Ember.View.extend({templateName:"Workspace/WorkspacesIndexWithoutKeys"});
Vaultier.WorkspacesCreateRoute=Ember.Route.extend({actions:{save:function(){var e=this.get("controller.content"),t=e.saveRecord().then(function(){$.notify("You workspace has been successfully created.","success"),this.transitionTo("Workspace.index",e.get("slug"))}.bind(this)).catch(function(e){$.notify("Oooups! Something went wrong.","error"),this.get("errors").logError(e)}.bind(this));return ApplicationLoader.promise(t),t}},setupController:function(e,t){this._super(e,t),e.set("breadcrumbs",Vaultier.Breadcrumbs.create({router:this.get("router"),environment:this.get("environment")}).addHome().addText("Create new workspace"))},model:function(){var e=this.get("store"),t=e.createRecord("Workspace");return t}}),Vaultier.WorkspacesCreateController=Ember.ObjectController.extend({breadcrumbs:null}),Vaultier.WorkspacesCreateView=Ember.View.extend({templateName:"Workspace/WorkspacesCreate",layoutName:"Layout/LayoutStandard"});
Vaultier.WorkspaceKeysMixin=Ember.Mixin.create({checkWorkspaceKeys:function(){var e=this.modelFor("Workspace");return e.get("membership.status")!=Vaultier.Member.proto().statuses.MEMBER.value?(this.transitionTo("Workspace.noKeys"),!1):!0}}),Vaultier.WorkspaceRoute=Ember.Route.extend(Vaultier.WorkspaceKeysMixin,{workspacekey:null,model:function(e){var t=this.get("store").find("Workspace",e.workspace);return t},afterModel:function(e){this.get("workspacekey").selectWorkspace(e),this.get("environment").set("workspace",e),this.checkWorkspaceKeys()},deactivate:function(){this.get("environment").set("workspace",null)},serialize:function(e){return"string"==typeof e||"number"==typeof e?e:{workspace:e.get("slug")}},actions:{deleteWorkspace:function(e){Vaultier.confirmModal(this,"Are you sure?",function(){var t=e.deleteRecord().then(function(){$.notify("Your workspace has been successfully deleted.","success"),this.transitionTo("Workspaces.select")}.bind(this)).catch(function(e){throw $.notify("Oooups! Something went wrong.","error"),e}.bind(this));ApplicationLoader.promise(t)}.bind(this))}}}),Vaultier.WorkspaceIndexRoute=Ember.Route.extend(Vaultier.WorkspaceKeysMixin,Ember.Evented,{beforeModel:function(){this.checkWorkspaceKeys()&&this.transitionTo("Vaults.index")}}),Vaultier.WorkspaceNoKeysRoute=Ember.Route.extend({workspacekey:null,keysTransfered:function(){var e=this.get("controller.workspace");this.transitionTo("Workspace.index",e)},activate:function(){var e=this.get("workspacekey");e.on("keyTransfered",this,this.keysTransfered)},deactivate:function(){var e=this.get("workspacekey");e.off("keyTransfered",this,this.keysTransfered)},model:function(){var e=this.modelFor("Workspace"),t=this.get("store"),r=t.find("Role",{to_workspace:e.get("id")}).then(function(e){return e.toArray()});return Ember.RSVP.hash({workspace:e,memberships:r})},afterModel:function(e,t){e.workspace.get("membership.status")==Vaultier.Member.proto().statuses.MEMBER.value&&(t.abort(),this.transitionTo("Workspace.index"),$.notify("Your already have valid workspace keys.","success"))},setupController:function(e,t){this._super.apply(this,arguments);var r=this.get("environment");e.set("memberships",t.memberships),e.set("workspace",t.workspace),r.set("workspace",t.workspace),e.set("breadcrumbs",Vaultier.Breadcrumbs.create({router:this.get("router"),environment:r}).addHome().addWorkspace().addText("Waiting for keys"))}}),Vaultier.WorkspaceNoKeysView=Ember.View.extend({templateName:"Workspace/WorkspaceNoKeys",layoutName:"Layout/LayoutStandard"});
Vaultier.WorkspaceEditRoute=Ember.Route.extend(Vaultier.WorkspaceKeysMixin,{beforeModel:function(){this.checkWorkspaceKeys()},model:function(e,t){var r=this.modelFor("Workspace");if(this.get("auth").checkPermissions(t,function(){return r.get("perms.update")}.bind(this),!0))return r},setupController:function(e,t){this._super(e,t),e.set("breadcrumbs",Vaultier.Breadcrumbs.create({router:this.get("router"),environment:this.get("environment")}).addHome().addWorkspace().addText("Edit workspace"))},actions:{save:function(){var e=this.get("controller.content"),t=e.saveRecord().then(function(){$.notify("Your changes has been successfully saved.","success"),history.go(-1)}.bind(this)).catch(function(e){$.notify("Oooups! Something went wrong.","error"),this.get("errors").logError(e)}.bind(this));ApplicationLoader.promise(t)}}}),Vaultier.WorkspaceEditController=Ember.ObjectController.extend({breadcrumbs:null}),Vaultier.WorkspaceEditView=Ember.View.extend({templateName:"Workspace/WorkspaceEdit",layoutName:"Layout/LayoutStandard"});
Vaultier.WorkspaceMixin=Em.Mixin.create({beforeModel:function(){this.checkWorkspaceKeys()},setupInviteData:function(){var e=this.modelFor("Workspace");return{inviteObject:e}},setupBlocks:function(){return{workspace:!0}},setupBreadcrumbs:function(){return Vaultier.Breadcrumbs.create({router:this.get("router"),environment:this.get("environment")}).addHome().addWorkspace().addCollaboratorsIndex("Workspace.memberIndex")},setupInviteRoute:function(){return{inviteRouteName:"Workspace.memberInvite"}}}),Vaultier.WorkspaceMemberIndexRoute=Vaultier.MemberIndexRoute.extend(Vaultier.WorkspaceKeysMixin,Vaultier.WorkspaceMixin),Vaultier.WorkspaceMemberIndexController=Vaultier.MemberIndexController.extend({}),Vaultier.WorkspaceMemberInviteRoute=Vaultier.MemberInviteRoute.extend(Vaultier.WorkspaceKeysMixin,{beforeModel:function(){this.checkWorkspaceKeys()},setupInviteData:function(){var e=this.modelFor("Workspace");return{inviteObject:e,inviteParams:{to_workspace:e},inviteWorkspace:e}},setupBreadcrumbs:function(){return Vaultier.Breadcrumbs.create({router:this.get("router"),environment:this.get("environment")}).addHome().addWorkspace().addCollaboratorsIndex("Workspace.memberIndex").addCollaboratorsInvite("Workspace.memberInvite")}}),Vaultier.WorkspaceMemberInviteController=Vaultier.MemberInviteController.extend({});
"use strict";Vaultier.WorkspaceMemberManagementRoute=Vaultier.MemberManagementRoute.extend(Vaultier.WorkspaceKeysMixin,Vaultier.WorkspaceMixin),Vaultier.WorkspaceMemberManagementController=Vaultier.MemberManagementController.extend({});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIldvcmtzcGFjZXNJbmRleC5qcyIsIldvcmtzcGFjZXNDcmVhdGUuanMiLCJXb3Jrc3BhY2VJbmRleC5qcyIsIldvcmtzcGFjZUVkaXQuanMiLCJXb3Jrc3BhY2VNZW1iZXIuanMiLCJXb3Jrc3BhY2VNZW1iZXJNYW5hZ2VtZW50LmpzIl0sIm5hbWVzIjpbIlZhdWx0aWVyIiwiV29ya3NwYWNlc1JvdXRlIiwiRW1iZXIiLCJSb3V0ZSIsImV4dGVuZCIsImJlZm9yZU1vZGVsIiwidHJhbnNpdGlvbiIsInRoaXMiLCJnZXQiLCJjaGVja0F1dGhlbnRpY2F0ZWRPckxvZ2luIiwiaGFzSW52aXRhdGlvbnNJblNlc3Npb24iLCJhYm9ydCIsInVybCIsInJvdXRlciIsImdlbmVyYXRlIiwicmVwbGFjZVdpdGgiLCJXb3Jrc3BhY2VzSW5kZXhSb3V0ZSIsIm1vZGVsIiwic3RvcmUiLCJwcm9taXNlIiwiZmluZCIsInRoZW4iLCJ3b3Jrc3BhY2VzIiwid29ya3NwYWNlIiwib2JqZWN0QXQiLCJ0cmFuc2l0aW9uVG8iLCJiaW5kIiwiV29ya3NwYWNlc1NlbGVjdFJvdXRlIiwic2V0dXBDb250cm9sbGVyIiwiY3RybCIsIl9zdXBlciIsInNldCIsIkJyZWFkY3J1bWJzIiwiY3JlYXRlIiwiZW52aXJvbm1lbnQiLCJhZGRIb21lIiwiYWRkVGV4dCIsInJlbmRlclRlbXBsYXRlIiwicmVuZGVyIiwiV29ya3NwYWNlc0luZGV4VmlldyIsIlZpZXciLCJ0ZW1wbGF0ZU5hbWUiLCJsYXlvdXROYW1lIiwiV29ya3NwYWNlc0luZGV4SXRlbVZpZXciLCJXb3Jrc3BhY2VzSW5kZXhXaXRob3V0S2V5c1ZpZXciLCJXb3Jrc3BhY2VzQ3JlYXRlUm91dGUiLCJhY3Rpb25zIiwic2F2ZSIsInJlY29yZCIsInNhdmVSZWNvcmQiLCIkIiwibm90aWZ5IiwiY2F0Y2giLCJlcnJvciIsImxvZ0Vycm9yIiwiQXBwbGljYXRpb25Mb2FkZXIiLCJjcmVhdGVSZWNvcmQiLCJXb3Jrc3BhY2VzQ3JlYXRlQ29udHJvbGxlciIsIk9iamVjdENvbnRyb2xsZXIiLCJicmVhZGNydW1icyIsIldvcmtzcGFjZXNDcmVhdGVWaWV3IiwiV29ya3NwYWNlS2V5c01peGluIiwiTWl4aW4iLCJjaGVja1dvcmtzcGFjZUtleXMiLCJtb2RlbEZvciIsIk1lbWJlciIsInByb3RvIiwic3RhdHVzZXMiLCJ2YWx1ZSIsIldvcmtzcGFjZVJvdXRlIiwid29ya3NwYWNla2V5IiwicGFyYW1zIiwiYWZ0ZXJNb2RlbCIsInNlbGVjdFdvcmtzcGFjZSIsImRlYWN0aXZhdGUiLCJzZXJpYWxpemUiLCJkZWxldGVXb3Jrc3BhY2UiLCJjb25maXJtTW9kYWwiLCJkZWxldGVSZWNvcmQiLCJXb3Jrc3BhY2VJbmRleFJvdXRlIiwiRXZlbnRlZCIsIldvcmtzcGFjZU5vS2V5c1JvdXRlIiwia2V5c1RyYW5zZmVyZWQiLCJhY3RpdmF0ZSIsIm9uIiwib2ZmIiwibWVtYmVyc2hpcHMiLCJ0b193b3Jrc3BhY2UiLCJ0b0FycmF5IiwiUlNWUCIsImhhc2giLCJNRU1CRVIiLCJhcHBseSIsImFyZ3VtZW50cyIsImFkZFdvcmtzcGFjZSIsIldvcmtzcGFjZU5vS2V5c1ZpZXciLCJXb3Jrc3BhY2VFZGl0Um91dGUiLCJjaGVja1Blcm1pc3Npb25zIiwiaGlzdG9yeSIsImdvIiwiV29ya3NwYWNlRWRpdENvbnRyb2xsZXIiLCJXb3Jrc3BhY2VFZGl0VmlldyIsIldvcmtzcGFjZU1peGluIiwiRW0iLCJzZXR1cEludml0ZURhdGEiLCJpbnZpdGVPYmplY3QiLCJzZXR1cEJsb2NrcyIsInNldHVwQnJlYWRjcnVtYnMiLCJhZGRDb2xsYWJvcmF0b3JzSW5kZXgiLCJzZXR1cEludml0ZVJvdXRlIiwiaW52aXRlUm91dGVOYW1lIiwiV29ya3NwYWNlTWVtYmVySW5kZXhSb3V0ZSIsIk1lbWJlckluZGV4Um91dGUiLCJXb3Jrc3BhY2VNZW1iZXJJbmRleENvbnRyb2xsZXIiLCJNZW1iZXJJbmRleENvbnRyb2xsZXIiLCJXb3Jrc3BhY2VNZW1iZXJJbnZpdGVSb3V0ZSIsIk1lbWJlckludml0ZVJvdXRlIiwiaW52aXRlUGFyYW1zIiwiaW52aXRlV29ya3NwYWNlIiwiYWRkQ29sbGFib3JhdG9yc0ludml0ZSIsIldvcmtzcGFjZU1lbWJlckludml0ZUNvbnRyb2xsZXIiLCJNZW1iZXJJbnZpdGVDb250cm9sbGVyIiwiV29ya3NwYWNlTWVtYmVyTWFuYWdlbWVudFJvdXRlIiwiTWVtYmVyTWFuYWdlbWVudFJvdXRlIiwiV29ya3NwYWNlTWVtYmVyTWFuYWdlbWVudENvbnRyb2xsZXIiLCJNZW1iZXJNYW5hZ2VtZW50Q29udHJvbGxlciJdLCJtYXBwaW5ncyI6IkFBQUFBLFNBQVNDLGdCQUFrQkMsTUFBTUMsTUFBTUMsUUFHL0JDLFlBQWEsU0FBVUMsR0FJbkIsSUFBS0MsS0FBS0MsSUFBSSxRQUFRQywwQkFBMEJILEdBQzVDLE9BQU8sQ0FJWCxJQUFJQyxLQUFLQyxJQUFJLGVBQWVFLDBCQUEyQixDQUNuREosRUFBV0ssT0FDWCxJQUFJQyxHQUFNTixFQUFXTyxPQUFPQyxTQUFTLG9CQUVyQyxZQURBUCxNQUFLTSxPQUFPRSxZQUFZSCxPQVF4Q1osU0FBU2dCLHFCQUF1QmQsTUFBTUMsTUFBTUMsUUFFcENhLE1BQU8sV0FDSCxHQUFJQyxHQUFRWCxLQUFLQyxJQUFJLFNBQ2pCVyxFQUFVRCxFQUNURSxLQUFLLGFBQ0xDLEtBQUssU0FBVUMsR0FDWixHQUFnQyxHQUE1QkEsRUFBV2QsSUFBSSxVQUFnQixDQUMvQixHQUFJZSxHQUFZRCxFQUFXRSxTQUFTLEVBQ3BDakIsTUFBS2tCLGFBQWEsa0JBQW1CRixFQUFVZixJQUFJLGFBRW5ERCxNQUFLa0IsYUFBYSxzQkFFeEJDLEtBQUtuQixNQUVYLE9BQU9ZLE1BTW5CbkIsU0FBUzJCLHNCQUF3QnpCLE1BQU1DLE1BQU1DLFFBR3JDYSxNQUFPLFdBQ0gsR0FBSUMsR0FBUVgsS0FBS0MsSUFBSSxTQUNqQlcsRUFBVUQsRUFBTUUsS0FBSyxZQUN6QixPQUFPRCxJQUdYUyxnQkFBaUIsU0FBVUMsRUFBTVosR0FDN0JW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SixVQUFTMEgsK0JBQWlDMUgsU0FBUzJILHNCQUFzQnZILE9BQ3JFSixTQUFTNkQsbUJBQ1Q3RCxTQUFTc0csZ0JBRWJ0RyxTQUFTNEgsb0NBQXNDNUgsU0FBUzZILDJCQUEyQnpIIiwiZmlsZSI6IndvcmtzcGFjZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlZhdWx0aWVyLldvcmtzcGFjZXNSb3V0ZSA9IEVtYmVyLlJvdXRlLmV4dGVuZChcbiAgICB7XG5cbiAgICAgICAgYmVmb3JlTW9kZWw6IGZ1bmN0aW9uICh0cmFuc2l0aW9uKSB7XG5cblxuICAgICAgICAgICAgLy8gb25seSBhdXRoZW50aWNhdGVkIHVzZXIgY2FuIGFjY2Vzc1xuICAgICAgICAgICAgaWYgKCF0aGlzLmdldCgnYXV0aCcpLmNoZWNrQXV0aGVudGljYXRlZE9yTG9naW4odHJhbnNpdGlvbikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmIGFueSBpbnZpdGF0aW9ucyBzdG9yZSBpbiBzZXNzaW9uLCB1c2VyIHdpbGwgYmUgcmVkaXJlY3RlZFxuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0KCdpbnZpdGF0aW9ucycpLmhhc0ludml0YXRpb25zSW5TZXNzaW9uKCkpIHtcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uLmFib3J0KCk7XG4gICAgICAgICAgICAgICAgdmFyIHVybCA9IHRyYW5zaXRpb24ucm91dGVyLmdlbmVyYXRlKCdJbnZpdGF0aW9uLmFjY2VwdCcpO1xuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLnJlcGxhY2VXaXRoKHVybCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgIH0pO1xuXG5WYXVsdGllci5Xb3Jrc3BhY2VzSW5kZXhSb3V0ZSA9IEVtYmVyLlJvdXRlLmV4dGVuZChcbiAgICB7XG4gICAgICAgIG1vZGVsOiBmdW5jdGlvbiAocGFyYW1zLCB0cmFuc2l0aW9uKSB7XG4gICAgICAgICAgICB2YXIgc3RvcmUgPSB0aGlzLmdldCgnc3RvcmUnKTtcbiAgICAgICAgICAgIHZhciBwcm9taXNlID0gc3RvcmVcbiAgICAgICAgICAgICAgICAuZmluZCgnV29ya3NwYWNlJylcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAod29ya3NwYWNlcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAod29ya3NwYWNlcy5nZXQoJ2xlbmd0aCcpID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3b3Jrc3BhY2UgPSB3b3Jrc3BhY2VzLm9iamVjdEF0KDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc2l0aW9uVG8oJ1dvcmtzcGFjZS5pbmRleCcsIHdvcmtzcGFjZS5nZXQoJ3NsdWcnKSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zaXRpb25UbygnV29ya3NwYWNlcy5zZWxlY3QnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgICB9XG5cbiAgICB9KTtcblxuXG5WYXVsdGllci5Xb3Jrc3BhY2VzU2VsZWN0Um91dGUgPSBFbWJlci5Sb3V0ZS5leHRlbmQoXG4gICAge1xuXG4gICAgICAgIG1vZGVsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc3RvcmUgPSB0aGlzLmdldCgnc3RvcmUnKTtcbiAgICAgICAgICAgIHZhciBwcm9taXNlID0gc3RvcmUuZmluZCgnV29ya3NwYWNlJyk7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXR1cENvbnRyb2xsZXI6IGZ1bmN0aW9uIChjdHJsLCBtb2RlbCkge1xuICAgICAgICAgICAgdGhpcy5fc3VwZXIoY3RybCwgbW9kZWwpO1xuXG4gICAgICAgICAgICBjdHJsLnNldCgnYnJlYWRjcnVtYnMnLFxuICAgICAgICAgICAgICAgIFZhdWx0aWVyLkJyZWFkY3J1bWJzLmNyZWF0ZSh7cm91dGVyOiB0aGlzLmdldCgncm91dGVyJyksIGVudmlyb25tZW50OiB0aGlzLmdldCgnZW52aXJvbm1lbnQnKX0pXG4gICAgICAgICAgICAgICAgICAgIC5hZGRIb21lKClcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHQoJ0xpc3Qgb2Ygd29ya3NwYWNlcycsICcvc3RhdGljL3ZhdWx0aWVyL2ltYWdlcy9pY29uLWhvbWUtZ3JleS5wbmcnKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZW5kZXJUZW1wbGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoJ1dvcmtzcGFjZXNJbmRleCcpO1xuICAgICAgICB9XG4gICAgfSk7XG5cblxuVmF1bHRpZXIuV29ya3NwYWNlc0luZGV4VmlldyA9IEVtYmVyLlZpZXcuZXh0ZW5kKHtcbiAgICB0ZW1wbGF0ZU5hbWU6ICdXb3Jrc3BhY2UvV29ya3NwYWNlc0luZGV4JyxcbiAgICBsYXlvdXROYW1lOiAnTGF5b3V0L0xheW91dFN0YW5kYXJkJ1xufSk7XG5cblZhdWx0aWVyLldvcmtzcGFjZXNJbmRleEl0ZW1WaWV3ID0gRW1iZXIuVmlldy5leHRlbmQoe1xuICAgIHRlbXBsYXRlTmFtZTogJ1dvcmtzcGFjZS9Xb3Jrc3BhY2VzSW5kZXhJdGVtJ1xufSk7XG5cblZhdWx0aWVyLldvcmtzcGFjZXNJbmRleFdpdGhvdXRLZXlzVmlldyA9IEVtYmVyLlZpZXcuZXh0ZW5kKHtcbiAgICB0ZW1wbGF0ZU5hbWU6ICdXb3Jrc3BhY2UvV29ya3NwYWNlc0luZGV4V2l0aG91dEtleXMnXG59KTtcbiIsIlZhdWx0aWVyLldvcmtzcGFjZXNDcmVhdGVSb3V0ZSA9IEVtYmVyLlJvdXRlLmV4dGVuZCh7XG4gICAgYWN0aW9uczoge1xuICAgICAgICBzYXZlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVjb3JkID0gdGhpcy5nZXQoJ2NvbnRyb2xsZXIuY29udGVudCcpO1xuICAgICAgICAgICAgdmFyIHByb21pc2UgPSByZWNvcmQuc2F2ZVJlY29yZCgpXG4gICAgICAgICAgICAgICAgLnRoZW4oXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQubm90aWZ5KCdZb3Ugd29ya3NwYWNlIGhhcyBiZWVuIHN1Y2Nlc3NmdWxseSBjcmVhdGVkLicsICdzdWNjZXNzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zaXRpb25UbygnV29ya3NwYWNlLmluZGV4JywgcmVjb3JkLmdldCgnc2x1ZycpKTtcbiAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxuXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAkLm5vdGlmeSgnT29vdXBzISBTb21ldGhpbmcgd2VudCB3cm9uZy4nLCAnZXJyb3InKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXQoJ2Vycm9ycycpLmxvZ0Vycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgICAgICAgICBBcHBsaWNhdGlvbkxvYWRlci5wcm9taXNlKHByb21pc2UpO1xuXG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzZXR1cENvbnRyb2xsZXI6IGZ1bmN0aW9uIChjdHJsLCBtb2RlbCkge1xuICAgICAgICB0aGlzLl9zdXBlcihjdHJsLCBtb2RlbCk7XG5cbiAgICAgICAgLy8gc2V0IGJyZWFkY3J1bWJzXG4gICAgICAgIGN0cmwuc2V0KCdicmVhZGNydW1icycsXG4gICAgICAgICAgICBWYXVsdGllci5CcmVhZGNydW1icy5jcmVhdGUoe3JvdXRlcjogdGhpcy5nZXQoJ3JvdXRlcicpLCBlbnZpcm9ubWVudDogdGhpcy5nZXQoJ2Vudmlyb25tZW50Jyl9KVxuICAgICAgICAgICAgICAgIC5hZGRIb21lKClcbiAgICAgICAgICAgICAgICAuYWRkVGV4dCgnQ3JlYXRlIG5ldyB3b3Jrc3BhY2UnKVxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICBtb2RlbDogZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgICB2YXIgc3RvcmUgPSB0aGlzLmdldCgnc3RvcmUnKTtcbiAgICAgICAgdmFyIHJlY29yZCA9IHN0b3JlLmNyZWF0ZVJlY29yZCgnV29ya3NwYWNlJyk7XG4gICAgICAgIHJldHVybiByZWNvcmQ7XG4gICAgfVxuXG59KTtcblxuVmF1bHRpZXIuV29ya3NwYWNlc0NyZWF0ZUNvbnRyb2xsZXIgPSBFbWJlci5PYmplY3RDb250cm9sbGVyLmV4dGVuZCh7XG4gICAgYnJlYWRjcnVtYnM6IG51bGxcbn0pO1xuXG5WYXVsdGllci5Xb3Jrc3BhY2VzQ3JlYXRlVmlldyA9IEVtYmVyLlZpZXcuZXh0ZW5kKHtcbiAgICB0ZW1wbGF0ZU5hbWU6ICdXb3Jrc3BhY2UvV29ya3NwYWNlc0NyZWF0ZScsXG4gICAgbGF5b3V0TmFtZTogJ0xheW91dC9MYXlvdXRTdGFuZGFyZCdcbn0pO1xuIiwiVmF1bHRpZXIuV29ya3NwYWNlS2V5c01peGluID0gRW1iZXIuTWl4aW4uY3JlYXRlKHtcblxuICAgIGNoZWNrV29ya3NwYWNlS2V5czogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgd29ya3NwYWNlID0gdGhpcy5tb2RlbEZvcignV29ya3NwYWNlJyk7XG4gICAgICAgIGlmICh3b3Jrc3BhY2UuZ2V0KCdtZW1iZXJzaGlwLnN0YXR1cycpICE9IFZhdWx0aWVyLk1lbWJlci5wcm90bygpLnN0YXR1c2VzWydNRU1CRVInXS52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy50cmFuc2l0aW9uVG8oJ1dvcmtzcGFjZS5ub0tleXMnKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbn0pO1xuXG5WYXVsdGllci5Xb3Jrc3BhY2VSb3V0ZSA9IEVtYmVyLlJvdXRlLmV4dGVuZChcbiAgICBWYXVsdGllci5Xb3Jrc3BhY2VLZXlzTWl4aW4sXG4gICAge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAREkgc2VydmljZTp3b3Jrc3BhY2VrZXlcbiAgICAgICAgICovXG4gICAgICAgIHdvcmtzcGFjZWtleTogbnVsbCxcblxuICAgICAgICBtb2RlbDogZnVuY3Rpb24gKHBhcmFtcywgdHJhbnNpdGlvbikge1xuICAgICAgICAgICAgdmFyIHByb21pc2UgPSB0aGlzLmdldCgnc3RvcmUnKS5maW5kKCdXb3Jrc3BhY2UnLCBwYXJhbXMud29ya3NwYWNlKTtcblxuICAgICAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgICAgIH0sXG5cbiAgICAgICAgYWZ0ZXJNb2RlbDogZnVuY3Rpb24gKHdvcmtzcGFjZSwgdHJhbnNpdGlvbikge1xuICAgICAgICAgICAgLy8gc2VsZWN0IHdvcmtpbmcgd29ya3NwYWNlXG4gICAgICAgICAgICB0aGlzLmdldCgnd29ya3NwYWNla2V5Jykuc2VsZWN0V29ya3NwYWNlKHdvcmtzcGFjZSk7XG5cbiAgICAgICAgICAgIC8vIHNldCBlbnZpcm9ubWVudFxuICAgICAgICAgICAgdGhpcy5nZXQoJ2Vudmlyb25tZW50Jykuc2V0KCd3b3Jrc3BhY2UnLCB3b3Jrc3BhY2UpO1xuXG4gICAgICAgICAgICB0aGlzLmNoZWNrV29ya3NwYWNlS2V5cygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGRlYWN0aXZhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0KCdlbnZpcm9ubWVudCcpLnNldCgnd29ya3NwYWNlJywgbnVsbCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAobW9kZWwpIHtcbiAgICAgICAgICAgIC8vIHByaW1pdGl2ZXNcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbW9kZWwgPT0gJ3N0cmluZycgfHwgdHlwZW9mIG1vZGVsID09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vZGVsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHdvcmtzcGFjZTogbW9kZWwuZ2V0KCdzbHVnJylcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG5cbiAgICAgICAgYWN0aW9uczoge1xuICAgICAgICAgICAgZGVsZXRlV29ya3NwYWNlOiBmdW5jdGlvbiAod29ya3NwYWNlKSB7XG4gICAgICAgICAgICAgICAgVmF1bHRpZXIuY29uZmlybU1vZGFsKHRoaXMsICdBcmUgeW91IHN1cmU/JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvbWlzZSA9IHdvcmtzcGFjZVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlbGV0ZVJlY29yZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQubm90aWZ5KCdZb3VyIHdvcmtzcGFjZSBoYXMgYmVlbiBzdWNjZXNzZnVsbHkgZGVsZXRlZC4nLCAnc3VjY2VzcycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zaXRpb25UbygnV29ya3NwYWNlcy5zZWxlY3QnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5ub3RpZnkoJ09vb3VwcyEgU29tZXRoaW5nIHdlbnQgd3JvbmcuJywgJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgICAgICAgICAgICAgICAgIEFwcGxpY2F0aW9uTG9hZGVyLnByb21pc2UocHJvbWlzZSk7XG5cbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cblZhdWx0aWVyLldvcmtzcGFjZUluZGV4Um91dGUgPSBFbWJlci5Sb3V0ZS5leHRlbmQoXG4gICAgVmF1bHRpZXIuV29ya3NwYWNlS2V5c01peGluLFxuICAgIEVtYmVyLkV2ZW50ZWQsXG4gICAge1xuICAgICAgICBiZWZvcmVNb2RlbDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tXb3Jrc3BhY2VLZXlzKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zaXRpb25UbygnVmF1bHRzLmluZGV4Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRzIHJvdXRlIHdoZW4gdXNlciBoYXMgbm8gd29ya3NwYWNla2V5LiBVc2VyIGlzIHJlZGlyZWN0ZWQgdG8gaGVyZSB3aGVuIGhlIGhhcyBubyB3b3Jrc3BhY2Uga2V5XG4gKiBmcm9tIGFueSBwYWdlIGluc2lkZSB3b3Jrc3BhY2VcbiAqIEB0eXBlIEVtYmVyLlJvdXRlXG4gKi9cblZhdWx0aWVyLldvcmtzcGFjZU5vS2V5c1JvdXRlID0gRW1iZXIuUm91dGUuZXh0ZW5kKHtcblxuICAgIC8qKlxuICAgICAqIFNlcnZpY2Ugd29ya3NwYWNla2V5IGlzIGluamVjdGVkIGJ5IGRlcGVuY2VuY3kgY29udGFpbmVyXG4gICAgICogQERJIHNlcnZpY2U6d29ya3NwYWNla2V5XG4gICAgICovXG4gICAgd29ya3NwYWNla2V5OiBudWxsLFxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kIGlzIGF1dG9tYXRpY2FsbHkgY2FsbGVkIHdoZW4gd29ya3NwYWNlIGtleSBpcyB0cmFuc2ZlcnJlZFxuICAgICAqL1xuICAgIGtleXNUcmFuc2ZlcmVkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB3b3Jrc3BhY2UgPSB0aGlzLmdldCgnY29udHJvbGxlci53b3Jrc3BhY2UnKTtcbiAgICAgICAgdGhpcy50cmFuc2l0aW9uVG8oJ1dvcmtzcGFjZS5pbmRleCcsIHdvcmtzcGFjZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFdoZW4gcm91dGUgaXMgYWN0aXZhdGVkIGJpbmQgdG8gd29ya3NwYWNla2V5IHNlcnZpY2Uga2V5VHJhbnNmZXJlZCBldmVudCB0b1xuICAgICAqIHJlZGlyZWN0IHRvIHdvcmtzcGFjZSBpbmRleFxuICAgICAqL1xuICAgIGFjdGl2YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB3b3Jrc3BhY2VrZXkgPSB0aGlzLmdldCgnd29ya3NwYWNla2V5Jyk7XG4gICAgICAgIHdvcmtzcGFjZWtleS5vbigna2V5VHJhbnNmZXJlZCcsIHRoaXMsIHRoaXMua2V5c1RyYW5zZmVyZWQpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEZXRhY2ggZnJvbSBrZXlUcmFuc2ZlcmVkIGV2ZW50XG4gICAgICovXG4gICAgZGVhY3RpdmF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgd29ya3NwYWNla2V5ID0gdGhpcy5nZXQoJ3dvcmtzcGFjZWtleScpO1xuICAgICAgICB3b3Jrc3BhY2VrZXkub2ZmKCdrZXlUcmFuc2ZlcmVkJywgdGhpcywgdGhpcy5rZXlzVHJhbnNmZXJlZCk7XG4gICAgfSxcblxuICAgIG1vZGVsOiBmdW5jdGlvbiAocGFyYW1zLCBxdWVyeVBhcmFtcykge1xuICAgICAgICB2YXIgd29ya3NwYWNlID0gdGhpcy5tb2RlbEZvcignV29ya3NwYWNlJyk7XG4gICAgICAgIHZhciBzdG9yZSA9IHRoaXMuZ2V0KCdzdG9yZScpO1xuXG4gICAgICAgIC8vIGxvYWQgbWVtYmVyc2hpcHNcbiAgICAgICAgdmFyIG1lbWJlcnNoaXBzID0gc3RvcmVcbiAgICAgICAgICAgIC5maW5kKCdSb2xlJywge3RvX3dvcmtzcGFjZTogd29ya3NwYWNlLmdldCgnaWQnKSB9KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKG1lbWJlcnNoaXBzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lbWJlcnNoaXBzLnRvQXJyYXkoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHJldHVybiBwcm9taXNlIGZvciBhbGwgcmVxdWVzdHNcbiAgICAgICAgcmV0dXJuIEVtYmVyLlJTVlAuaGFzaCh7XG4gICAgICAgICAgICB3b3Jrc3BhY2U6IHdvcmtzcGFjZSxcbiAgICAgICAgICAgIG1lbWJlcnNoaXBzOiBtZW1iZXJzaGlwc1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgYWZ0ZXJNb2RlbDogZnVuY3Rpb24obW9kZWwsIHRyYW5zaXRpb24pIHtcbiAgICAgICAgaWYgKG1vZGVsLndvcmtzcGFjZS5nZXQoJ21lbWJlcnNoaXAuc3RhdHVzJykgPT0gVmF1bHRpZXIuTWVtYmVyLnByb3RvKCkuc3RhdHVzZXMuTUVNQkVSLnZhbHVlKSB7XG4gICAgICAgICAgICB0cmFuc2l0aW9uLmFib3J0KCk7XG4gICAgICAgICAgICB0aGlzLnRyYW5zaXRpb25UbygnV29ya3NwYWNlLmluZGV4Jyk7XG4gICAgICAgICAgICAkLm5vdGlmeSgnWW91ciBhbHJlYWR5IGhhdmUgdmFsaWQgd29ya3NwYWNlIGtleXMuJywgJ3N1Y2Nlc3MnKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzZXR1cENvbnRyb2xsZXI6IGZ1bmN0aW9uIChjdHJsLCBtb2RlbCkge1xuICAgICAgICB0aGlzLl9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB2YXIgZW52aXJvbm1lbnQgPSB0aGlzLmdldCgnZW52aXJvbm1lbnQnKTtcbiAgICAgICAgLy8gc2V0IG1vZGVsXG4gICAgICAgIGN0cmwuc2V0KCdtZW1iZXJzaGlwcycsIG1vZGVsLm1lbWJlcnNoaXBzKTtcbiAgICAgICAgY3RybC5zZXQoJ3dvcmtzcGFjZScsIG1vZGVsLndvcmtzcGFjZSk7XG4gICAgICAgIGVudmlyb25tZW50LnNldCgnd29ya3NwYWNlJywgbW9kZWwud29ya3NwYWNlKTtcblxuICAgICAgICAvLyBzZXQgYnJlYWRjcnVtYnNcbiAgICAgICAgY3RybC5zZXQoJ2JyZWFkY3J1bWJzJyxcbiAgICAgICAgICAgIFZhdWx0aWVyLkJyZWFkY3J1bWJzLmNyZWF0ZSh7cm91dGVyOiB0aGlzLmdldCgncm91dGVyJyksIGVudmlyb25tZW50OiBlbnZpcm9ubWVudH0pXG4gICAgICAgICAgICAgICAgLmFkZEhvbWUoKVxuICAgICAgICAgICAgICAgIC5hZGRXb3Jrc3BhY2UoKVxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KCdXYWl0aW5nIGZvciBrZXlzJylcbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxuVmF1bHRpZXIuV29ya3NwYWNlTm9LZXlzVmlldyA9IEVtYmVyLlZpZXcuZXh0ZW5kKHtcbiAgICB0ZW1wbGF0ZU5hbWU6ICdXb3Jrc3BhY2UvV29ya3NwYWNlTm9LZXlzJyxcbiAgICBsYXlvdXROYW1lOiAnTGF5b3V0L0xheW91dFN0YW5kYXJkJ1xufSk7XG4iLCJWYXVsdGllci5Xb3Jrc3BhY2VFZGl0Um91dGUgPSBFbWJlci5Sb3V0ZS5leHRlbmQoXHJcbiAgICBWYXVsdGllci5Xb3Jrc3BhY2VLZXlzTWl4aW4sXHJcbiAgICB7XHJcblxyXG4gICAgICAgIGJlZm9yZU1vZGVsOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja1dvcmtzcGFjZUtleXMoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBtb2RlbDogZnVuY3Rpb24gKHBhcmFtcywgdHJhbnNpdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgd29ya3NwYWNlID0gdGhpcy5tb2RlbEZvcignV29ya3NwYWNlJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZ2V0KCdhdXRoJykuY2hlY2tQZXJtaXNzaW9ucyh0cmFuc2l0aW9uLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gd29ya3NwYWNlLmdldCgncGVybXMudXBkYXRlJylcclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpLCB0cnVlKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gd29ya3NwYWNlO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNldHVwQ29udHJvbGxlcjogZnVuY3Rpb24gKGN0cmwsIG1vZGVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1cGVyKGN0cmwsIG1vZGVsKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNldCBicmVhZGNydW1ic1xyXG4gICAgICAgICAgICBjdHJsLnNldCgnYnJlYWRjcnVtYnMnLFxyXG4gICAgICAgICAgICAgICAgVmF1bHRpZXIuQnJlYWRjcnVtYnMuY3JlYXRlKHtyb3V0ZXI6IHRoaXMuZ2V0KCdyb3V0ZXInKSwgZW52aXJvbm1lbnQ6IHRoaXMuZ2V0KCdlbnZpcm9ubWVudCcpfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkSG9tZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFdvcmtzcGFjZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHQoJ0VkaXQgd29ya3NwYWNlJylcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFjdGlvbnM6IHtcclxuICAgICAgICAgICAgc2F2ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlY29yZCA9IHRoaXMuZ2V0KCdjb250cm9sbGVyLmNvbnRlbnQnKTtcclxuICAgICAgICAgICAgICAgIHZhciBwcm9taXNlID0gcmVjb3JkXHJcbiAgICAgICAgICAgICAgICAgICAgLnNhdmVSZWNvcmQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5ub3RpZnkoJ1lvdXIgY2hhbmdlcyBoYXMgYmVlbiBzdWNjZXNzZnVsbHkgc2F2ZWQuJywgJ3N1Y2Nlc3MnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGlzdG9yeS5nbygtMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQubm90aWZ5KCdPb291cHMhIFNvbWV0aGluZyB3ZW50IHdyb25nLicsICdlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldCgnZXJyb3JzJykubG9nRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgQXBwbGljYXRpb25Mb2FkZXIucHJvbWlzZShwcm9taXNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuVmF1bHRpZXIuV29ya3NwYWNlRWRpdENvbnRyb2xsZXIgPSBFbWJlci5PYmplY3RDb250cm9sbGVyLmV4dGVuZCh7XHJcbiAgICBicmVhZGNydW1iczogbnVsbFxyXG59KTtcclxuXHJcblZhdWx0aWVyLldvcmtzcGFjZUVkaXRWaWV3ID0gRW1iZXIuVmlldy5leHRlbmQoe1xyXG4gICAgdGVtcGxhdGVOYW1lOiAnV29ya3NwYWNlL1dvcmtzcGFjZUVkaXQnLFxyXG4gICAgbGF5b3V0TmFtZTogJ0xheW91dC9MYXlvdXRTdGFuZGFyZCdcclxufSk7XHJcbiIsIi8qKlxuICogV29ya3NwYWNlIG1lbWJlcnNoaXBzLCBiZWNhdXNlIG9mIG5lc3RlZCByb3V0aW5nIGluIG5hbWVzcGFjZSBvZiB2YXVsdFxuICovXG5WYXVsdGllci5Xb3Jrc3BhY2VNaXhpbiA9IEVtLk1peGluLmNyZWF0ZSh7XG4gICAgICAgIGJlZm9yZU1vZGVsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrV29ya3NwYWNlS2V5cygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldHVwSW52aXRlRGF0YTogZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgICAgICAgdmFyIHdvcmtzcGFjZSA9IHRoaXMubW9kZWxGb3IoJ1dvcmtzcGFjZScpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBpbnZpdGVPYmplY3Q6IHdvcmtzcGFjZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXR1cEJsb2NrczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHt3b3Jrc3BhY2U6IHRydWV9XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0dXBCcmVhZGNydW1iczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIFZhdWx0aWVyLkJyZWFkY3J1bWJzLmNyZWF0ZSh7cm91dGVyOiB0aGlzLmdldCgncm91dGVyJyksIGVudmlyb25tZW50OiB0aGlzLmdldCgnZW52aXJvbm1lbnQnKX0pXG4gICAgICAgICAgICAgICAgLmFkZEhvbWUoKVxuICAgICAgICAgICAgICAgIC5hZGRXb3Jrc3BhY2UoKVxuICAgICAgICAgICAgICAgIC5hZGRDb2xsYWJvcmF0b3JzSW5kZXgoJ1dvcmtzcGFjZS5tZW1iZXJJbmRleCcpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldHVwSW52aXRlUm91dGU6IGZ1bmN0aW9uIChtb2RlbHMpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaW52aXRlUm91dGVOYW1lOiAnV29ya3NwYWNlLm1lbWJlckludml0ZSdcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9KTtcblxuVmF1bHRpZXIuV29ya3NwYWNlTWVtYmVySW5kZXhSb3V0ZSA9IFZhdWx0aWVyLk1lbWJlckluZGV4Um91dGUuZXh0ZW5kKFxuICAgIFZhdWx0aWVyLldvcmtzcGFjZUtleXNNaXhpbixcbiAgICBWYXVsdGllci5Xb3Jrc3BhY2VNaXhpblxuKTtcblxuXG5WYXVsdGllci5Xb3Jrc3BhY2VNZW1iZXJJbmRleENvbnRyb2xsZXIgPSBWYXVsdGllci5NZW1iZXJJbmRleENvbnRyb2xsZXIuZXh0ZW5kKHtcbn0pO1xuXG5cblZhdWx0aWVyLldvcmtzcGFjZU1lbWJlckludml0ZVJvdXRlID0gVmF1bHRpZXIuTWVtYmVySW52aXRlUm91dGUuZXh0ZW5kKFxuICAgIFZhdWx0aWVyLldvcmtzcGFjZUtleXNNaXhpbixcbiAgICB7XG5cbiAgICAgICAgYmVmb3JlTW9kZWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tXb3Jrc3BhY2VLZXlzKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0dXBJbnZpdGVEYXRhOiBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICAgICAgICB2YXIgd29ya3NwYWNlID0gdGhpcy5tb2RlbEZvcignV29ya3NwYWNlJyk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGludml0ZU9iamVjdDogd29ya3NwYWNlLFxuICAgICAgICAgICAgICAgIGludml0ZVBhcmFtczogeyB0b193b3Jrc3BhY2U6IHdvcmtzcGFjZX0sXG4gICAgICAgICAgICAgICAgaW52aXRlV29ya3NwYWNlOiB3b3Jrc3BhY2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBzZXR1cEJyZWFkY3J1bWJzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gVmF1bHRpZXIuQnJlYWRjcnVtYnMuY3JlYXRlKHtyb3V0ZXI6IHRoaXMuZ2V0KCdyb3V0ZXInKSwgZW52aXJvbm1lbnQ6IHRoaXMuZ2V0KCdlbnZpcm9ubWVudCcpfSlcbiAgICAgICAgICAgICAgICAuYWRkSG9tZSgpXG4gICAgICAgICAgICAgICAgLmFkZFdvcmtzcGFjZSgpXG4gICAgICAgICAgICAgICAgLmFkZENvbGxhYm9yYXRvcnNJbmRleCgnV29ya3NwYWNlLm1lbWJlckluZGV4JylcbiAgICAgICAgICAgICAgICAuYWRkQ29sbGFib3JhdG9yc0ludml0ZSgnV29ya3NwYWNlLm1lbWJlckludml0ZScpO1xuICAgICAgICB9XG5cbiAgICB9KTtcblxuVmF1bHRpZXIuV29ya3NwYWNlTWVtYmVySW52aXRlQ29udHJvbGxlciA9IFZhdWx0aWVyLk1lbWJlckludml0ZUNvbnRyb2xsZXIuZXh0ZW5kKHtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5WYXVsdGllci5Xb3Jrc3BhY2VNZW1iZXJNYW5hZ2VtZW50Um91dGUgPSBWYXVsdGllci5NZW1iZXJNYW5hZ2VtZW50Um91dGUuZXh0ZW5kKFxuICAgIFZhdWx0aWVyLldvcmtzcGFjZUtleXNNaXhpbixcbiAgICBWYXVsdGllci5Xb3Jrc3BhY2VNaXhpbik7XG5cblZhdWx0aWVyLldvcmtzcGFjZU1lbWJlck1hbmFnZW1lbnRDb250cm9sbGVyID0gVmF1bHRpZXIuTWVtYmVyTWFuYWdlbWVudENvbnRyb2xsZXIuZXh0ZW5kKHt9KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=