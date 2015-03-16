var Tools = {

  endWith: function (str, suffix) {
    if (!str || !suffix) {
      return false;
    }
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  }
};

export var endWith = Tools.endWith;



