Po.NS('EmberExt.AnimatedIf');

EmberExt.AnimatedIf.AnimatedIfView = Ember.View.extend({
    // Passed-in / public
    condition: null,

    in: 'fadeIn',
    out: 'fadeOut',
    visible: false,
    inDuration: 500,
    outDuration: 500,

    classNames: 'ember-ext-animated-if-view',

    isInverse: false,

    transitions: function () {
        return EmberExt.AnimatedIf.Transitions.create();
    }.property(),

    updateVisibility: function () {
        var transitions = this.get('transitions')
        var condition = !!this.get('condition');
        var visible = this.get('visible');

        if (condition ^ this.isInverse) {
            if (!visible) {
                transitions.runFx(this.$(), this.get('in'), this.get('inDuration'));
                this.set('visible', true);
            }
        } else {
            if (visible) {
                transitions.runFx(this.$(), this.get('out'), this.get('outDuration'));
                this.set('visible', false);
            }
        }
    }.on('didInsertElement').observes('condition')
});

EmberExt.AnimatedIf.AnimatedUnlessView = EmberExt.AnimatedIf.AnimatedIfView.extend({
    isInverse: true
});

EmberExt.AnimatedIf.Transitions = Ember.Object.extend({

    runFx: function (element, name, duration) {
        if (typeof this[name] !== 'function') {
            throw new Error('Effect %fx% not found'.replace('%fx%', name));
        }
        if (!duration) {
            duration = 500;
        }

        return new Ember.RSVP.Promise(function (resolve) {
            this[name](element, duration, resolve);
        }.bind(this))
    },

    none: Ember.K,

    fadeIn: function (element, duration, callback) {
        element.hide();
        element.fadeIn(duration, callback);
    },

    fadeOut: function (element, duration, callback) {
        element.fadeOut(duration, callback);
    },

    slideDown: function (element, duration, callback) {
        element.hide();
        element.slideDown(duration, callback);
    },

    slideUp: function (element, duration, callback) {
        element.slideUp(duration, callback);
    }

});