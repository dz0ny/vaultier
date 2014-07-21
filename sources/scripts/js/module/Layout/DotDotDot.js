/**
 * {{dot-dot-dot value=body height="40"}}
 */
Vaultier.DotDotDotComponent = Ember.Component.extend({
  tagName: 'span',

  // Maximum height before the ellipse kicks in.
  height: 40,

  didInsertElement: function() {
      this._super();
      this.updateDOM();
  },

  // {Observer} Watches for content changes
  _contentDidChange: function() {
    this.updateDOM();
  }.observes('value'),

  // Updates the DOM with the current values
  updateDOM: function() {
    var height = parseInt(this.get('height'), 10) || 40;
    if(this.get('state') === 'inDOM') {
      this.$().text(this.get('value'));
      this.$().dotdotdot({ height: height });
    }
  }
});