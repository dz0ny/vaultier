var Tools = {

  /**
   * Merges object o with defaults
   * properties of o has priority
   * @module utils-tools-function
   * @for UtilsToolsFunction
   * @method merge
   * @param o
   * @param defaults
   * @return {*}
   */
  merge: function (o, defaults) {
    if (o && defaults && typeof defaults === 'object') {
      if (!o) {
        o = {};
      }

      for (var p in defaults) {
        if (defaults.hasOwnProperty(p)) {
          if (typeof o[p] === 'undefined') {
            o[p] = defaults[p];
          }
        }
      }
    }
    return o;
  }

};

export default Tools;
export var merge = Tools.merge;
