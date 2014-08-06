Vaultier.LayoutLayoutStandardView=Ember.View.extend({templateName:"Layout/LayoutStandard"}),Vaultier.LayoutLayoutWindowView=Ember.View.extend({templateName:"Layout/LayoutStandard"}),Vaultier.LayoutFooterView=Ember.View.extend({templateName:"Layout/Footer"});
Vaultier.LayoutSecurityBoxView=Ember.View.extend({tagName:"span",templateName:"Layout/SecurityBox",actions:{logout:function(){ApplicationLoader.showLoader();var e=this.get("controller.auth");e.logout()}},didInsertElement:function(){var e=Ember.$(this.get("element")).find(".copy-token");e.click(function(t){t.preventDefault(),window.prompt("token",e.attr("href"))})}}),Vaultier.LayoutSecurityBoxController=Ember.Controller.extend({showToken:function(){return this.get("config.FT_FEATURES.dev_show_token")}.property("showToken")});
Vaultier.LayoutSearchBoxViewVaultTpl=null,Vaultier.LayoutSearchBoxViewCardTpl=null,Vaultier.LayoutSearchBoxView=Ember.View.extend({tagName:"span",templateName:"Layout/SearchBox",vaultTpl:['<div class="vlt-search-result vlt-{{type}}">','<div class="vlt-line vlt-name">{{name}}</div>','<div class="vlt-line vlt-path help-block">{{workspace.name}} >  {{name}}</div>','<div class="vlt-line vlt-desc help-block">{{description}}</div>',"</div>"].join(""),cardTpl:['<div class="vlt-search-result vlt-{{type}}">','<div class="vlt-line vlt-name">{{name}}</div>','<div class="vlt-line vlt-path help-block">{{workspace.name}} > {{vault.name}} > {{name}}</div>','<div class="vlt-line vlt-desc help-block">{{description}}</div>',"</div>"].join(""),init:function(){this._super.apply(this,arguments),Vaultier.LayoutSearchBoxViewVaultTpl=this.vaultTpl=Vaultier.LayoutSearchBoxViewVaultTpl||Handlebars.compile(this.vaultTpl),Vaultier.LayoutSearchBoxViewCardTpl=this.cardTpl=Vaultier.LayoutSearchBoxViewCardTpl||Handlebars.compile(this.cardTpl)},willDestroyElement:function(){var e=$(this.get("element")),t=e.find("select"),l=t[0].selectize;l.destroy()},didInsertElement:function(){var e=this.get("controller"),t=$(this.get("element")),l=t.find("select"),a=this.get("vaultTpl"),i=this.get("cardTpl"),r=0,n=function(t){"card"==t.type?e.transitionToRoute("Secret.index",t.workspace.slug,t.vault.slug,t.slug):e.transitionToRoute("Cards.index",t.workspace.slug,t.slug)};l.selectize({valueField:"uid",labelField:"name",searchField:"keywords",sortField:"sort",highlight:!1,options:[],create:!1,onChange:function(){"use strict";this.clearCache()},onType:function(){this.clearOptions(),this.refreshOptions(!0)},score:function(e){var t=this.getScoreFunction(e);return function(e){return t(e)+1}},render:{option:function(e){var t="";return t="card"==e.get("type")?i(e):a(e)}},load:function(e,t){return e.length?void $.ajax({url:"/api/search/search",type:"GET",data:{query:e},error:function(){t()},success:function(e){var l=[];e.cards.forEach(function(e){r++,e.id=e.slug,e.sort=r,e.type="card",e.uid="c-"+e.id,l.push(Ember.Object.create(e))}),e.vaults.forEach(function(e){r++,e.id=e.slug,e.sort=r,e.type="vault",e.uid="v-"+e.id,l.push(Ember.Object.create(e))}),t(l)}}):t()}});var s=l[0].selectize;s.on("item_add",function(e){var t=s.options[e];s.clearOptions(),s.refreshOptions(!0),s.blur(),n(t)}),s.on("load",function(e){"use strict";var t=s.$control;!e||e.length?t.removeClass("has-error"):($.notify("No matches found","error"),t.addClass("has-error"))})}}),Vaultier.LayoutSearchBoxController=Ember.Controller.extend({});
Vaultier.DotDotDotComponent=Ember.Component.extend({tagName:"span",height:40,didInsertElement:function(){this._super(),this.updateDOM()},_contentDidChange:function(){this.updateDOM()}.observes("value"),updateDOM:function(){var t=parseInt(this.get("height"),10)||40;"inDOM"===this.get("state")&&(this.$().text(this.get("value")),this.$().dotdotdot({height:t}))}});
Vaultier.Breadcrumbs=Ember.Object.extend({items:null,environment:null,addLink:function(t,e,i,n){if(this.items=this.items||[],this.items.forEach(function(t){delete t.last}),t)try{args=i?[t,i]:[t],t=this.router.generate.apply(this.router,args)}catch(r){console.error(r.message),console.error("Breadcrumbs error during generate route ("+t+")")}return e=Utils.HandlebarsHelpers.current().ellipsis(e,25),n||(n="/static/vaultier/images/icon-wrench-grey.png"),this.items.push({link:t,title:e,icon:n,last:!0}),this},addText:function(t,e){return this.addLink(null,t,null,e),this},addHome:function(){return this},addSettings:function(){return this},addCollaboratorsIndex:function(t){return this.addLink(t,"Collaborators",null,"/static/vaultier/images/icon-user-grey.png")},addCollaboratorsInvite:function(t){return this.addLink(t,"Invite",null,"/static/vaultier/images/icon-plus-grey.png")},addVault:function(){var t=this.get("environment.vault");return t&&this.addLink("Vault.index",t.get("name"),t,"/static/vaultier/images/icon-vault-grey.png"),this},addCard:function(){var t=this.get("environment.card");return t&&this.addLink("Card.index",t.get("name"),t,"/static/vaultier/images/icon-card-grey.png"),this},addWorkspace:function(){var t=this.get("environment.workspace");return t&&this.addLink("Workspace.index",t.get("name"),t,"/static/vaultier/images/icon-workspace-grey.png"),this}});
Vaultier.LayoutWorkspaceBoxController=Ember.Controller.extend({env:null,init:function(){this._super(),this.env=this.get("environment")}}),Vaultier.LayoutWorkspaceBoxView=Ember.View.extend({tagName:"span",templateName:"Layout/WorkspaceBox"});
Vaultier.LayoutConfirmView=Ember.View.extend({templateName:"Layout/Confirm",didInsertElement:function(){var o=Ember.$(this.get("element")).find(".modal");o.modal("show"),o.one("hidden.bs.modal",function(){this.get("controller.route").disconnectOutlet({parent:"application",outlet:"modal"})}.bind(this))},show:function(o){var t=o.route.get("container").lookup("controller:LayoutConfirm");t.setProperties(o),o.route.render("LayoutConfirm",{into:"application",outlet:"modal",controller:"LayoutConfirm"})},actions:{ok:function(){var o=this.get("controller.fn"),t=Ember.$(this.get("element")).find(".modal");t.one("hidden.bs.modal",o),t.modal("hide")}}}),Vaultier.LayoutConfirmController=Ember.Controller.extend({text:null,fn:null,route:null,fn:null}),Vaultier.confirmModal=function(o,t,e){var n=o.container.lookup("view:LayoutConfirm");n.show({title:"Confirmation",text:t,route:o,fn:e})};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxheW91dFN0YW5kYXJkLmpzIiwiU2VjdXJpdHlCb3guanMiLCJTZWFyY2hCb3guanMiLCJEb3REb3REb3QuanMiLCJCcmVhZGNydW1icy5qcyIsIldvcmtzcGFjZUJveC5qcyIsIkNvbmZpcm0uanMiXSwibmFtZXMiOlsiVmF1bHRpZXIiLCJMYXlvdXRMYXlvdXRTdGFuZGFyZFZpZXciLCJFbWJlciIsIlZpZXciLCJleHRlbmQiLCJ0ZW1wbGF0ZU5hbWUiLCJMYXlvdXRMYXlvdXRXaW5kb3dWaWV3IiwiTGF5b3V0Rm9vdGVyVmlldyIsIkxheW91dFNlY3VyaXR5Qm94VmlldyIsInRhZ05hbWUiLCJhY3Rpb25zIiwibG9nb3V0IiwiQXBwbGljYXRpb25Mb2FkZXIiLCJzaG93TG9hZGVyIiwiYXV0aCIsInRoaXMiLCJnZXQiLCJkaWRJbnNlcnRFbGVtZW50IiwiZWwiLCIkIiwiZmluZCIsImNsaWNrIiwiZSIsInByZXZlbnREZWZhdWx0Iiwid2luZG93IiwicHJvbXB0IiwiYXR0ciIsIkxheW91dFNlY3VyaXR5Qm94Q29udHJvbGxlciIsIkNvbnRyb2xsZXIiLCJzaG93VG9rZW4iLCJwcm9wZXJ0eSIsIkxheW91dFNlYXJjaEJveFZpZXdWYXVsdFRwbCIsIkxheW91dFNlYXJjaEJveFZpZXdDYXJkVHBsIiwiTGF5b3V0U2VhcmNoQm94VmlldyIsInZhdWx0VHBsIiwiam9pbiIsImNhcmRUcGwiLCJpbml0IiwiX3N1cGVyIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJIYW5kbGViYXJzIiwiY29tcGlsZSIsIndpbGxEZXN0cm95RWxlbWVudCIsImlucHV0Iiwic2VsZWN0aXplIiwiZGVzdHJveSIsImN0cmwiLCJzb3J0IiwibmF2aWdhdGUiLCJpdGVtIiwidHlwZSIsInRyYW5zaXRpb25Ub1JvdXRlIiwid29ya3NwYWNlIiwic2x1ZyIsInZhdWx0IiwidmFsdWVGaWVsZCIsImxhYmVsRmllbGQiLCJzZWFyY2hGaWVsZCIsInNvcnRGaWVsZCIsImhpZ2hsaWdodCIsIm9wdGlvbnMiLCJjcmVhdGUiLCJvbkNoYW5nZSIsImNsZWFyQ2FjaGUiLCJvblR5cGUiLCJjbGVhck9wdGlvbnMiLCJyZWZyZXNoT3B0aW9ucyIsInNjb3JlIiwic2VhcmNoIiwiZ2V0U2NvcmVGdW5jdGlvbiIsInJlbmRlciIsIm9wdGlvbiIsImh0bWwiLCJsb2FkIiwicXVlcnkiLCJjYWxsYmFjayIsImxlbmd0aCIsImFqYXgiLCJ1cmwiLCJkYXRhIiwiZXJyb3IiLCJzdWNjZXNzIiwicmVzdWx0IiwiY2FyZHMiLCJmb3JFYWNoIiwiY2FyZCIsImlkIiwidWlkIiwicHVzaCIsIk9iamVjdCIsInZhdWx0cyIsIm9uIiwidmFsdWUiLCJibHVyIiwiJGNvbnRyb2wiLCJyZW1vdmVDbGFzcyIsIm5vdGlmeSIsImFkZENsYXNzIiwiTGF5b3V0U2VhcmNoQm94Q29udHJvbGxlciIsIkRvdERvdERvdENvbXBvbmVudCIsIkNvbXBvbmVudCIsImhlaWdodCIsInVwZGF0ZURPTSIsIl9jb250ZW50RGlkQ2hhbmdlIiwib2JzZXJ2ZXMiLCJwYXJzZUludCIsInRleHQiLCJkb3Rkb3Rkb3QiLCJCcmVhZGNydW1icyIsIml0ZW1zIiwiZW52aXJvbm1lbnQiLCJhZGRMaW5rIiwibGluayIsInRpdGxlIiwicGFyYW1zIiwiaWNvbiIsImxhc3QiLCJhcmdzIiwicm91dGVyIiwiZ2VuZXJhdGUiLCJjb25zb2xlIiwibWVzc2FnZSIsIlV0aWxzIiwiSGFuZGxlYmFyc0hlbHBlcnMiLCJjdXJyZW50IiwiZWxsaXBzaXMiLCJhZGRUZXh0IiwiYWRkSG9tZSIsImFkZFNldHRpbmdzIiwiYWRkQ29sbGFib3JhdG9yc0luZGV4Iiwicm91dGUiLCJhZGRDb2xsYWJvcmF0b3JzSW52aXRlIiwiYWRkVmF1bHQiLCJhZGRDYXJkIiwiYWRkV29ya3NwYWNlIiwiTGF5b3V0V29ya3NwYWNlQm94Q29udHJvbGxlciIsImVudiIsIkxheW91dFdvcmtzcGFjZUJveFZpZXciLCJMYXlvdXRDb25maXJtVmlldyIsIm1vZGFsIiwib25lIiwiZGlzY29ubmVjdE91dGxldCIsInBhcmVudCIsIm91dGxldCIsImJpbmQiLCJzaG93IiwibG9va3VwIiwic2V0UHJvcGVydGllcyIsImludG8iLCJjb250cm9sbGVyIiwib2siLCJmbiIsIkxheW91dENvbmZpcm1Db250cm9sbGVyIiwiY29uZmlybU1vZGFsIiwidmlldyIsImNvbnRhaW5lciJdLCJtYXBwaW5ncyI6IkFBQUFBLFNBQVNDLHlCQUEyQkMsTUFBTUMsS0FBS0MsUUFDM0NDLGFBQWMsMEJBR2xCTCxTQUFTTSx1QkFBeUJKLE1BQU1DLEtBQUtDLFFBQ3pDQyxhQUFjLDBCQUdsQkwsU0FBU08saUJBQW1CTCxNQUFNQyxLQUFLQyxRQUNuQ0MsYUFBYztBQ1RsQkwsU0FBU1Esc0JBQXdCTixNQUFNQyxLQUFLQyxRQUN4Q0ssUUFBUyxPQUNUSixhQUFjLHFCQUVkSyxTQUNJQyxPQUFRLFdBQ0pDLGtCQUFrQkMsWUFDbEIsSUFBSUMsR0FBT0MsS0FBS0MsSUFBSSxrQkFDcEJGLEdBQUtILFdBSWJNLGlCQUFrQixXQUNkLEdBQUlDLEdBQUtoQixNQUFNaUIsRUFBRUosS0FBS0MsSUFBSSxZQUFZSSxLQUFLLGNBQzNDRixHQUFHRyxNQUFNLFNBQVVDLEdBQ2ZBLEVBQUVDLGlCQUNGQyxPQUFPQyxPQUFPLFFBQVNQLEVBQUdRLEtBQUssY0FPM0MxQixTQUFTMkIsNEJBQThCekIsTUFBTTBCLFdBQVd4QixRQUNwRHlCLFVBQVcsV0FDUCxNQUFPZCxNQUFLQyxJQUFJLHNDQUNsQmMsU0FBUztBQzFCZjlCLFNBQVMrQiw0QkFBOEIsS0FDdkMvQixTQUFTZ0MsMkJBQTZCLEtBRXRDaEMsU0FBU2lDLG9CQUFzQi9CLE1BQU1DLEtBQUtDLFFBQ3RDSyxRQUFTLE9BQ1RKLGFBQWMsbUJBRWQ2QixVQUNJLCtDQUNBLGdEQUNBLGlGQUNBLGtFQUNBLFVBQ0ZDLEtBQUssSUFFUEMsU0FDSSwrQ0FDQSxnREFDQSxpR0FDQSxrRUFDQSxVQUNGRCxLQUFLLElBRVBFLEtBQU0sV0FDRnRCLEtBQUt1QixPQUFPQyxNQUFN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QU9jLEVBQVFzRSxNQUFNbkgsSUFBSSxhQUFhbUksT0FBTywyQkFDakRwRyxHQUFLcUcsY0FBY3ZGLEdBRW5CQSxFQUFRc0UsTUFBTTVELE9BQU8saUJBQ2pCOEUsS0FBTSxjQUNOTCxPQUFRLFFBQ1JNLFdBQVksbUJBSXBCNUksU0FDSTZJLEdBQUksV0FDQSxHQUFJQyxHQUFLekksS0FBS0MsSUFBSSxpQkFDZEUsRUFBS2hCLE1BQU1pQixFQUFFSixLQUFLQyxJQUFJLFlBQVlJLEtBQUssU0FDM0NGLEdBQUcySCxJQUFJLGtCQUFtQlcsR0FDMUJ0SSxFQUFHMEgsTUFBTSxZQU1yQjVJLFNBQVN5Six3QkFBMEJ2SixNQUFNMEIsV0FBV3hCLFFBQ2hEdUcsS0FBTSxLQUNONkMsR0FBSSxLQUNKckIsTUFBTyxLQUNQcUIsR0FBSSxPQUdSeEosU0FBUzBKLGFBQWUsU0FBVXZCLEVBQU94QixFQUFNNkMsR0FDM0MsR0FBSUcsR0FBT3hCLEVBQU15QixVQUFVVCxPQUFPLHFCQUNsQ1EsR0FBS1QsTUFDRGhDLE1BQU8sZUFDUFAsS0FBTUEsRUFDTndCLE1BQU9BLEVBQ1BxQixHQUFJQSIsImZpbGUiOiJsYXlvdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJWYXVsdGllci5MYXlvdXRMYXlvdXRTdGFuZGFyZFZpZXcgPSBFbWJlci5WaWV3LmV4dGVuZCh7XHJcbiAgICB0ZW1wbGF0ZU5hbWU6ICdMYXlvdXQvTGF5b3V0U3RhbmRhcmQnXHJcbn0pO1xyXG5cclxuVmF1bHRpZXIuTGF5b3V0TGF5b3V0V2luZG93VmlldyA9IEVtYmVyLlZpZXcuZXh0ZW5kKHtcclxuICAgIHRlbXBsYXRlTmFtZTogJ0xheW91dC9MYXlvdXRTdGFuZGFyZCdcclxufSk7XHJcblxyXG5WYXVsdGllci5MYXlvdXRGb290ZXJWaWV3ID0gRW1iZXIuVmlldy5leHRlbmQoe1xyXG4gICAgdGVtcGxhdGVOYW1lOiAnTGF5b3V0L0Zvb3RlcidcclxufSk7XHJcbiIsIlZhdWx0aWVyLkxheW91dFNlY3VyaXR5Qm94VmlldyA9IEVtYmVyLlZpZXcuZXh0ZW5kKHtcclxuICAgIHRhZ05hbWU6ICdzcGFuJyxcclxuICAgIHRlbXBsYXRlTmFtZTogJ0xheW91dC9TZWN1cml0eUJveCcsXHJcblxyXG4gICAgYWN0aW9uczoge1xyXG4gICAgICAgIGxvZ291dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBBcHBsaWNhdGlvbkxvYWRlci5zaG93TG9hZGVyKCk7XHJcbiAgICAgICAgICAgIHZhciBhdXRoID0gdGhpcy5nZXQoJ2NvbnRyb2xsZXIuYXV0aCcpO1xyXG4gICAgICAgICAgICBhdXRoLmxvZ291dCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZGlkSW5zZXJ0RWxlbWVudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBlbCA9IEVtYmVyLiQodGhpcy5nZXQoJ2VsZW1lbnQnKSkuZmluZCgnLmNvcHktdG9rZW4nKTtcclxuICAgICAgICBlbC5jbGljayhmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5wcm9tcHQoXCJ0b2tlblwiLCBlbC5hdHRyKCdocmVmJykpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5WYXVsdGllci5MYXlvdXRTZWN1cml0eUJveENvbnRyb2xsZXIgPSBFbWJlci5Db250cm9sbGVyLmV4dGVuZCh7XHJcbiAgICBzaG93VG9rZW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXQoJ2NvbmZpZy5GVF9GRUFUVVJFUy5kZXZfc2hvd190b2tlbicpXHJcbiAgICB9LnByb3BlcnR5KCdzaG93VG9rZW4nKVxyXG59KTtcclxuIiwiVmF1bHRpZXIuTGF5b3V0U2VhcmNoQm94Vmlld1ZhdWx0VHBsID0gbnVsbDtcblZhdWx0aWVyLkxheW91dFNlYXJjaEJveFZpZXdDYXJkVHBsID0gbnVsbDtcblxuVmF1bHRpZXIuTGF5b3V0U2VhcmNoQm94VmlldyA9IEVtYmVyLlZpZXcuZXh0ZW5kKHtcbiAgICB0YWdOYW1lOiAnc3BhbicsXG4gICAgdGVtcGxhdGVOYW1lOiAnTGF5b3V0L1NlYXJjaEJveCcsXG5cbiAgICB2YXVsdFRwbDogW1xuICAgICAgICAnPGRpdiBjbGFzcz1cInZsdC1zZWFyY2gtcmVzdWx0IHZsdC17e3R5cGV9fVwiPicsXG4gICAgICAgICc8ZGl2IGNsYXNzPVwidmx0LWxpbmUgdmx0LW5hbWVcIj57e25hbWV9fTwvZGl2PicsXG4gICAgICAgICc8ZGl2IGNsYXNzPVwidmx0LWxpbmUgdmx0LXBhdGggaGVscC1ibG9ja1wiPnt7d29ya3NwYWNlLm5hbWV9fSA+ICB7e25hbWV9fTwvZGl2PicsXG4gICAgICAgICc8ZGl2IGNsYXNzPVwidmx0LWxpbmUgdmx0LWRlc2MgaGVscC1ibG9ja1wiPnt7ZGVzY3JpcHRpb259fTwvZGl2PicsXG4gICAgICAgICc8L2Rpdj4nXG4gICAgXS5qb2luKCcnKSxcblxuICAgIGNhcmRUcGw6IFtcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJ2bHQtc2VhcmNoLXJlc3VsdCB2bHQte3t0eXBlfX1cIj4nLFxuICAgICAgICAnPGRpdiBjbGFzcz1cInZsdC1saW5lIHZsdC1uYW1lXCI+e3tuYW1lfX08L2Rpdj4nLFxuICAgICAgICAnPGRpdiBjbGFzcz1cInZsdC1saW5lIHZsdC1wYXRoIGhlbHAtYmxvY2tcIj57e3dvcmtzcGFjZS5uYW1lfX0gPiB7e3ZhdWx0Lm5hbWV9fSA+IHt7bmFtZX19PC9kaXY+JyxcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJ2bHQtbGluZSB2bHQtZGVzYyBoZWxwLWJsb2NrXCI+e3tkZXNjcmlwdGlvbn19PC9kaXY+JyxcbiAgICAgICAgJzwvZGl2PidcbiAgICBdLmpvaW4oJycpLFxuXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICBWYXVsdGllci5MYXlvdXRTZWFyY2hCb3hWaWV3VmF1bHRUcGwgPSB0aGlzLnZhdWx0VHBsID0gVmF1bHRpZXIuTGF5b3V0U2VhcmNoQm94Vmlld1ZhdWx0VHBsIHx8IEhhbmRsZWJhcnMuY29tcGlsZSh0aGlzLnZhdWx0VHBsKTtcbiAgICAgICAgVmF1bHRpZXIuTGF5b3V0U2VhcmNoQm94Vmlld0NhcmRUcGwgPSB0aGlzLmNhcmRUcGwgPSBWYXVsdGllci5MYXlvdXRTZWFyY2hCb3hWaWV3Q2FyZFRwbCB8fCBIYW5kbGViYXJzLmNvbXBpbGUodGhpcy5jYXJkVHBsKTtcbiAgICB9LFxuXG4gICAgd2lsbERlc3Ryb3lFbGVtZW50OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlbCA9ICQodGhpcy5nZXQoJ2VsZW1lbnQnKSk7XG4gICAgICAgIHZhciBpbnB1dCA9IGVsLmZpbmQoJ3NlbGVjdCcpO1xuICAgICAgICB2YXIgc2VsZWN0aXplID0gaW5wdXRbMF0uc2VsZWN0aXplO1xuICAgICAgICBzZWxlY3RpemUuZGVzdHJveSgpO1xuICAgIH0sXG5cbiAgICBkaWRJbnNlcnRFbGVtZW50OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjdHJsID0gdGhpcy5nZXQoJ2NvbnRyb2xsZXInKVxuICAgICAgICB2YXIgZWwgPSAkKHRoaXMuZ2V0KCdlbGVtZW50JykpO1xuICAgICAgICB2YXIgaW5wdXQgPSBlbC5maW5kKCdzZWxlY3QnKTtcbiAgICAgICAgdmFyIHZhdWx0VHBsID0gdGhpcy5nZXQoJ3ZhdWx0VHBsJylcbiAgICAgICAgdmFyIGNhcmRUcGwgPSB0aGlzLmdldCgnY2FyZFRwbCcpXG4gICAgICAgIHZhciBzb3J0ID0gMDtcblxuICAgICAgICB2YXIgbmF2aWdhdGUgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgaWYgKGl0ZW0udHlwZSA9PSAnY2FyZCcpIHtcbiAgICAgICAgICAgICAgICBjdHJsLnRyYW5zaXRpb25Ub1JvdXRlKCdTZWNyZXQuaW5kZXgnLCBpdGVtLndvcmtzcGFjZS5zbHVnLCBpdGVtLnZhdWx0LnNsdWcsIGl0ZW0uc2x1ZylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY3RybC50cmFuc2l0aW9uVG9Sb3V0ZSgnQ2FyZHMuaW5kZXgnLCBpdGVtLndvcmtzcGFjZS5zbHVnLCBpdGVtLnNsdWcpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpbnB1dC5zZWxlY3RpemUoe1xuICAgICAgICAgICAgdmFsdWVGaWVsZDogJ3VpZCcsXG4gICAgICAgICAgICBsYWJlbEZpZWxkOiAnbmFtZScsXG4gICAgICAgICAgICBzZWFyY2hGaWVsZDogJ2tleXdvcmRzJyxcbiAgICAgICAgICAgIHNvcnRGaWVsZDogJ3NvcnQnLFxuICAgICAgICAgICAgaGlnaGxpZ2h0OiBmYWxzZSxcbiAgICAgICAgICAgIG9wdGlvbnM6IFtdLFxuICAgICAgICAgICAgY3JlYXRlOiBmYWxzZSxcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJDYWNoZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIG9uVHlwZSBhbmQgc2NvcmUgcmV3cml0ZW4gdG8gbGVhdmUgc2VhcmNoIG9uIHJlbW90ZVxuICAgICAgICAgICAgb25UeXBlOiBmdW5jdGlvbiAocykge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJPcHRpb25zKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoT3B0aW9ucyh0cnVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzY29yZTogZnVuY3Rpb24gKHNlYXJjaCkge1xuICAgICAgICAgICAgICAgIHZhciBzY29yZSA9IHRoaXMuZ2V0U2NvcmVGdW5jdGlvbihzZWFyY2gpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2NvcmUoaXRlbSkgKyAxO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVuZGVyOiB7XG4gICAgICAgICAgICAgICAgb3B0aW9uOiBmdW5jdGlvbiAoaXRlbSwgZXNjYXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBodG1sID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmdldCgndHlwZScpID09ICdjYXJkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbCA9IGNhcmRUcGwoaXRlbSlcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWwgPSB2YXVsdFRwbChpdGVtKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBodG1sXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxvYWQ6IGZ1bmN0aW9uIChxdWVyeSwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBpZiAoIXF1ZXJ5Lmxlbmd0aCkgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL2FwaS9zZWFyY2gvc2VhcmNoJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ0dFVCcsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBxdWVyeVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuY2FyZHMuZm9yRWFjaChmdW5jdGlvbiAoY2FyZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJkLmlkID0gY2FyZC5zbHVnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmQuc29ydCA9IHNvcnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZC50eXBlID0gJ2NhcmQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmQudWlkID0gJ2MtJyArIGNhcmQuaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goRW1iZXIuT2JqZWN0LmNyZWF0ZShjYXJkKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS52YXVsdHMuZm9yRWFjaChmdW5jdGlvbiAodmF1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmF1bHQuaWQgPSB2YXVsdC5zbHVnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhdWx0LnNvcnQgPSBzb3J0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhdWx0LnR5cGUgPSAndmF1bHQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhdWx0LnVpZCA9ICd2LScgKyB2YXVsdC5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChFbWJlci5PYmplY3QuY3JlYXRlKHZhdWx0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2socmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgc2VsZWN0aXplID0gaW5wdXRbMF0uc2VsZWN0aXplO1xuXG4gICAgICAgIHNlbGVjdGl6ZS5vbignaXRlbV9hZGQnLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBpdGVtID0gc2VsZWN0aXplLm9wdGlvbnNbdmFsdWVdO1xuXG4gICAgICAgICAgICBzZWxlY3RpemUuY2xlYXJPcHRpb25zKCk7XG4gICAgICAgICAgICBzZWxlY3RpemUucmVmcmVzaE9wdGlvbnModHJ1ZSk7XG5cbiAgICAgICAgICAgIHNlbGVjdGl6ZS5ibHVyKCk7XG5cbiAgICAgICAgICAgIG5hdmlnYXRlKGl0ZW0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBzZWxlY3RpemUub24oJ2xvYWQnLCBmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgICAgICB2YXIgJGNvbnRyb2wgPSBzZWxlY3RpemUuJGNvbnRyb2w7XG4gICAgICAgICAgICBpZiAoIXJlc3VsdCB8fCByZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJGNvbnRyb2wucmVtb3ZlQ2xhc3MoJ2hhcy1lcnJvcicpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkLm5vdGlmeSgnTm8gbWF0Y2hlcyBmb3VuZCcsICdlcnJvcicpO1xuICAgICAgICAgICAgICAgICRjb250cm9sLmFkZENsYXNzKCdoYXMtZXJyb3InKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cblxuICAgIH1cbn0pO1xuXG5WYXVsdGllci5MYXlvdXRTZWFyY2hCb3hDb250cm9sbGVyID0gRW1iZXIuQ29udHJvbGxlci5leHRlbmQoe1xufSk7XG4iLCIvKipcbiAqIHt7ZG90LWRvdC1kb3QgdmFsdWU9Ym9keSBoZWlnaHQ9XCI0MFwifX1cbiAqL1xuVmF1bHRpZXIuRG90RG90RG90Q29tcG9uZW50ID0gRW1iZXIuQ29tcG9uZW50LmV4dGVuZCh7XG4gIHRhZ05hbWU6ICdzcGFuJyxcblxuICAvLyBNYXhpbXVtIGhlaWdodCBiZWZvcmUgdGhlIGVsbGlwc2Uga2lja3MgaW4uXG4gIGhlaWdodDogNDAsXG5cbiAgZGlkSW5zZXJ0RWxlbWVudDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLl9zdXBlcigpO1xuICAgICAgdGhpcy51cGRhdGVET00oKTtcbiAgfSxcblxuICAvLyB7T2JzZXJ2ZXJ9IFdhdGNoZXMgZm9yIGNvbnRlbnQgY2hhbmdlc1xuICBfY29udGVudERpZENoYW5nZTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy51cGRhdGVET00oKTtcbiAgfS5vYnNlcnZlcygndmFsdWUnKSxcblxuICAvLyBVcGRhdGVzIHRoZSBET00gd2l0aCB0aGUgY3VycmVudCB2YWx1ZXNcbiAgdXBkYXRlRE9NOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgaGVpZ2h0ID0gcGFyc2VJbnQodGhpcy5nZXQoJ2hlaWdodCcpLCAxMCkgfHwgNDA7XG4gICAgaWYodGhpcy5nZXQoJ3N0YXRlJykgPT09ICdpbkRPTScpIHtcbiAgICAgIHRoaXMuJCgpLnRleHQodGhpcy5nZXQoJ3ZhbHVlJykpO1xuICAgICAgdGhpcy4kKCkuZG90ZG90ZG90KHsgaGVpZ2h0OiBoZWlnaHQgfSk7XG4gICAgfVxuICB9XG59KTsiLCJWYXVsdGllci5CcmVhZGNydW1icyA9IEVtYmVyLk9iamVjdC5leHRlbmQoe1xyXG5cclxuICAgIGl0ZW1zOiBudWxsLFxyXG4gICAgZW52aXJvbm1lbnQ6IG51bGwsXHJcblxyXG4gICAgYWRkTGluazogZnVuY3Rpb24gKGxpbmssIHRpdGxlLCBwYXJhbXMsIGljb24pIHtcclxuICAgICAgICB0aGlzLml0ZW1zID0gdGhpcy5pdGVtcyB8fCBbXTtcclxuICAgICAgICB0aGlzLml0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgZGVsZXRlIGl0ZW0ubGFzdFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChsaW5rKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyYW1zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJncyA9IFtsaW5rLCBwYXJhbXNdO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhcmdzID0gW2xpbmtdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGluayA9IHRoaXMucm91dGVyLmdlbmVyYXRlLmFwcGx5KHRoaXMucm91dGVyLCBhcmdzKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignQnJlYWRjcnVtYnMgZXJyb3IgZHVyaW5nIGdlbmVyYXRlIHJvdXRlICgnICsgbGluayArICcpJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRpdGxlID0gVXRpbHMuSGFuZGxlYmFyc0hlbHBlcnMuY3VycmVudCgpLmVsbGlwc2lzKHRpdGxlLCAyNSk7XHJcblxyXG4gICAgICAgIGlmICghaWNvbikge1xyXG4gICAgICAgICAgICBpY29uID0gJy9zdGF0aWMvdmF1bHRpZXIvaW1hZ2VzL2ljb24td3JlbmNoLWdyZXkucG5nJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaXRlbXMucHVzaCh7XHJcbiAgICAgICAgICAgIGxpbms6IGxpbmssXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgICAgICAgaWNvbjogaWNvbixcclxuICAgICAgICAgICAgbGFzdDogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBhZGRUZXh0OiBmdW5jdGlvbiAodGV4dCwgaWNvbikge1xyXG4gICAgICAgIHRoaXMuYWRkTGluayhudWxsLCB0ZXh0LCBudWxsLCBpY29uKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgYWRkSG9tZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIGRpc2FibGVkIGZvciBiZXR0ZXIgdXNlciBleHBlcmllbmNlXHJcbiAgICAgICAgLy8gdGhpcy5hZGRMaW5rKCdpbmRleCcsICdIb21lJyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIGFkZFNldHRpbmdzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgLy9yZXR1cm4gdGhpcy5hZGRMaW5rKCdTZXR0aW5ncy5pbmRleCcsICdTZXR0aW5ncycpXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH0sXHJcblxyXG4gICAgYWRkQ29sbGFib3JhdG9yc0luZGV4OiBmdW5jdGlvbihyb3V0ZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFkZExpbmsocm91dGUsICdDb2xsYWJvcmF0b3JzJywgbnVsbCwgJy9zdGF0aWMvdmF1bHRpZXIvaW1hZ2VzL2ljb24tdXNlci1ncmV5LnBuZycpXHJcbiAgICB9LFxyXG5cclxuICAgIGFkZENvbGxhYm9yYXRvcnNJbnZpdGUgOiBmdW5jdGlvbihyb3V0ZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFkZExpbmsocm91dGUsICdJbnZpdGUnLCBudWxsLCAnL3N0YXRpYy92YXVsdGllci9pbWFnZXMvaWNvbi1wbHVzLWdyZXkucG5nJylcclxuICAgIH0sXHJcblxyXG4gICAgYWRkVmF1bHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdmF1bHQgPSB0aGlzLmdldCgnZW52aXJvbm1lbnQudmF1bHQnKTtcclxuICAgICAgICBpZiAodmF1bHQpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRMaW5rKCdWYXVsdC5pbmRleCcsIHZhdWx0LmdldCgnbmFtZScpLCB2YXVsdCwnL3N0YXRpYy92YXVsdGllci9pbWFnZXMvaWNvbi12YXVsdC1ncmV5LnBuZycpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBhZGRDYXJkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNhcmQgPSB0aGlzLmdldCgnZW52aXJvbm1lbnQuY2FyZCcpO1xyXG4gICAgICAgIGlmIChjYXJkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkTGluaygnQ2FyZC5pbmRleCcsIGNhcmQuZ2V0KCduYW1lJyksIGNhcmQsJy9zdGF0aWMvdmF1bHRpZXIvaW1hZ2VzL2ljb24tY2FyZC1ncmV5LnBuZycpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgYWRkV29ya3NwYWNlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHdvcmtzcGFjZSA9IHRoaXMuZ2V0KCdlbnZpcm9ubWVudC53b3Jrc3BhY2UnKTtcclxuICAgICAgICBpZiAod29ya3NwYWNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkTGluaygnV29ya3NwYWNlLmluZGV4Jywgd29ya3NwYWNlLmdldCgnbmFtZScpLCB3b3Jrc3BhY2UsICcvc3RhdGljL3ZhdWx0aWVyL2ltYWdlcy9pY29uLXdvcmtzcGFjZS1ncmV5LnBuZycpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG4iLCJWYXVsdGllci5MYXlvdXRXb3Jrc3BhY2VCb3hDb250cm9sbGVyID0gRW1iZXIuQ29udHJvbGxlci5leHRlbmQoe1xyXG5cclxuICAgIGVudjogbnVsbCxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmVudiA9IHRoaXMuZ2V0KCdlbnZpcm9ubWVudCcpO1xyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5WYXVsdGllci5MYXlvdXRXb3Jrc3BhY2VCb3hWaWV3ID0gRW1iZXIuVmlldy5leHRlbmQoe1xyXG4gICAgdGFnTmFtZTogJ3NwYW4nLFxyXG4gICAgdGVtcGxhdGVOYW1lOiAnTGF5b3V0L1dvcmtzcGFjZUJveCdcclxufSk7XHJcbiIsIlZhdWx0aWVyLkxheW91dENvbmZpcm1WaWV3ID0gRW1iZXIuVmlldy5leHRlbmQoe1xyXG4gICAgdGVtcGxhdGVOYW1lOiAnTGF5b3V0L0NvbmZpcm0nLFxyXG5cclxuICAgIGRpZEluc2VydEVsZW1lbnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZWwgPSBFbWJlci4kKHRoaXMuZ2V0KCdlbGVtZW50JykpLmZpbmQoJy5tb2RhbCcpO1xyXG4gICAgICAgIGVsLm1vZGFsKCdzaG93Jyk7XHJcblxyXG4gICAgICAgIGVsLm9uZSgnaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmdldCgnY29udHJvbGxlci5yb3V0ZScpLmRpc2Nvbm5lY3RPdXRsZXQoe1xyXG4gICAgICAgICAgICAgICAgcGFyZW50OiAnYXBwbGljYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgb3V0bGV0OiAnbW9kYWwnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHNob3c6IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAgICAgdmFyIGN0cmwgPSBvcHRpb25zLnJvdXRlLmdldCgnY29udGFpbmVyJykubG9va3VwKCdjb250cm9sbGVyOkxheW91dENvbmZpcm0nKTtcclxuICAgICAgICBjdHJsLnNldFByb3BlcnRpZXMob3B0aW9ucyk7XHJcblxyXG4gICAgICAgIG9wdGlvbnMucm91dGUucmVuZGVyKCdMYXlvdXRDb25maXJtJywge1xyXG4gICAgICAgICAgICBpbnRvOiAnYXBwbGljYXRpb24nLFxyXG4gICAgICAgICAgICBvdXRsZXQ6ICdtb2RhbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdMYXlvdXRDb25maXJtJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBhY3Rpb25zOiB7XHJcbiAgICAgICAgb2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGZuID0gdGhpcy5nZXQoJ2NvbnRyb2xsZXIuZm4nKTtcclxuICAgICAgICAgICAgdmFyIGVsID0gRW1iZXIuJCh0aGlzLmdldCgnZWxlbWVudCcpKS5maW5kKCcubW9kYWwnKTtcclxuICAgICAgICAgICAgZWwub25lKCdoaWRkZW4uYnMubW9kYWwnLCBmbik7XHJcbiAgICAgICAgICAgIGVsLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSk7XHJcblxyXG5WYXVsdGllci5MYXlvdXRDb25maXJtQ29udHJvbGxlciA9IEVtYmVyLkNvbnRyb2xsZXIuZXh0ZW5kKHtcclxuICAgIHRleHQ6IG51bGwsXHJcbiAgICBmbjogbnVsbCxcclxuICAgIHJvdXRlOiBudWxsLFxyXG4gICAgZm46IG51bGxcclxufSlcclxuXHJcblZhdWx0aWVyLmNvbmZpcm1Nb2RhbCA9IGZ1bmN0aW9uIChyb3V0ZSwgdGV4dCwgZm4pIHtcclxuICAgIHZhciB2aWV3ID0gcm91dGUuY29udGFpbmVyLmxvb2t1cCgndmlldzpMYXlvdXRDb25maXJtJyk7XHJcbiAgICB2aWV3LnNob3coe1xyXG4gICAgICAgIHRpdGxlOiAnQ29uZmlybWF0aW9uJyxcclxuICAgICAgICB0ZXh0OiB0ZXh0LFxyXG4gICAgICAgIHJvdXRlOiByb3V0ZSxcclxuICAgICAgICBmbjogZm5cclxuICAgIH0pO1xyXG59XHJcblxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=