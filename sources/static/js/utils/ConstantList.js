Po.NS('Utils');

Utils.ConstantList = function(options) {
    Po.merge(this, options);
}

Utils.ConstantList.prototype.toArray = function() {
    var result = [];
    for (prop in this) {
        if (this.hasOwnProperty(prop)) {
            result.push({
                id: prop,
                text: this[prop].text,
                value: this[prop].value
            })
        }
    }
    return result
}

Utils.ConstantList.prototype.getByValue = function(value) {
    for (prop in this) {
        if (this.hasOwnProperty(prop)) {
            if (this[prop].value == value) {
                return this[prop]
            }
        }
    }
}