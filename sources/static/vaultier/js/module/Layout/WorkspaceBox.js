Vaultier.LayoutWorkspaceBoxController = Ember.Controller.extend({

    env: null,

    init: function () {
        this._super();
        this.env = Service.Environment.current();
    }

})

Vaultier.LayoutWorkspaceBoxView = Ember.View.extend({
    tagName: 'span',
    templateName: 'Layout/WorkspaceBox'
});
