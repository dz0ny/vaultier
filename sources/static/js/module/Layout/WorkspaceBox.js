Po.NS('Vaultier.Layout');

Vaultier.LayoutWorkspaceBoxController = Ember.ObjectController.extend({
    data: Vaultier.Services.Context.ContextService.current()
})

Vaultier.LayoutWorkspaceBoxView = Ember.View.extend({
    tagName: 'span',
    templateName: 'Layout/WorkspaceBox'
});
