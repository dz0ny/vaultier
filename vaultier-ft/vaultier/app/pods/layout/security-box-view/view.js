import Ember from 'ember';

export default Ember.View.extend({
    tagName: 'span',
    templateName: 'Layout/SecurityBox',

    actions: {
        logout: function () {
            //ApplicationKernel.UI.showLoader();
            var auth = this.get('controller.auth');
            auth.logout();
        }
    },

    didInsertElement: function () {
        var el = Ember.$(this.get('element')).find('.copy-token');
        el.click(function (e) {
            e.preventDefault();
            window.prompt("token", el.attr('href'));
        });

    }

});

