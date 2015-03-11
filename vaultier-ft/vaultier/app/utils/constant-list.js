/* global Po */

var ConstantList = function(options) {
    Po.merge(this, options);
};

ConstantList.prototype.toArray = function() {
    var result = [];
    for (var prop in this) {
        if (this.hasOwnProperty(prop)) {
            result.push({
                id: prop,
                text: this[prop].text,
                value: this[prop].value
            });
        }
    }
    return result;
};

ConstantList.prototype.getByValue = function(value) {
    for (var prop in this) {
        if (this.hasOwnProperty(prop)) {
            if (this[prop].value === value) {
                return this[prop];
            }
        }
    }
};

ConstantList.prototype.getKeyByValue = function(value) {
    for (var prop in this) {
        if (this.hasOwnProperty(prop)) {
            if (this[prop].value === value) {
                return prop;
            }
        }
    }
};

export default ConstantList;
