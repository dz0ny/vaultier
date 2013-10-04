Po.NS('Vaultier.Layout');

Vaultier.LayoutWorkspaceBoxController = Ember.ObjectController.extend({
    urcite: 'urcite'
})

Vaultier.LayoutWorkspaceBoxView = Ember.View.extend({
    tagName: 'span',
    templateName: 'Layout/WorkspaceBox'
});
