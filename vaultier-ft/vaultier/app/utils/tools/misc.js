/* global window */

var idseed = 'cs-utils-tools-misc-id-seed';
if (!window[idseed]) {
  window[idseed] = 0;
}

var Tools = {

  /**
   * Generates unique ID throught this session
   * @param prefix prefix to use
   * @returns {String} generated id
   */
  generateId :function (prefix = "cs-id-") {
    var id = prefix + (++window[idseed]);
    return id;
  },


  /**
   * Checks if the argument variable is empty
   * undefined, null, false, number 0, empty string,
   * string "0", objects without properties and empty arrays
   * are considered empty
   * @method empty
   *
   */
  empty: function (mixed_var) {
    var undef, key, i, len;
    var emptyValues = [undef, null, false, 0, "", "0"];

    for (i = 0, len = emptyValues.length; i < len; i++) {
      if (mixed_var === emptyValues[i]) {
        return true;
      }
    }

    if (typeof mixed_var === "object") {
      for (key in mixed_var) {
        if (mixed_var.hasOwnProperty(key)) {
          return false;
        }
      }
      return true;
    }

    return false;
  }

};

export default Tools;
export var empty = Tools.empty;
export var generateId = Tools.generateId;

