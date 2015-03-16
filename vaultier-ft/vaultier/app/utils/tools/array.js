import Ember from 'ember';

var Tools = {

  unique: function (array) {
    var seen = {};
    return array.filter(function(element, index, array) {
        return !(element in seen) && (seen[element] = 1);
    });
  },

  uniquePush: function (array, data) {
    if (array.indexOf(data) === -1) {
      array.push(data);
    }
  },

  //@todo: speedup this: http://stackoverflow.com/questions/1885557/simplest-code-for-array-intersection-in-javascript
  intersection: function(array1, array2) {
    return array1.filter(function(n) {
      return array2.indexOf(n) !== -1;
    });
  },

  //@todo: speedup this: http://stackoverflow.com/questions/1885557/simplest-code-for-array-intersection-in-javascript
  haveIntersection: function(array1, array2) {
    return array1.some(function(n) {
      return array2.indexOf(n) !== -1;
    });
  },

  isArray: function(variable) {
    return Ember.Enumerable.detect(variable) || Array.isArray(variable);
  },

  arrayize: function(mixed) {
    if (typeof mixed === undefined) {
      return [];
    }

    return this.isArray(mixed) ? mixed : new Array(mixed);
  }


};

export default Tools;
export var unique = Tools.unique.bind(Tools);
export var uniquePush = Tools.uniquePush.bind(Tools);
export var intersection = Tools.intersection.bind(Tools);
export var haveIntersection = Tools.haveIntersection.bind(Tools);
export var isArray = Tools.isArray.bind(Tools);
export var arrayize = Tools.arrayize.bind(Tools);


