Po.NS('Utils');

Utils.E = {

    recordId: function (record, exception) {
        exception = Po.F.optional(exception, false)

        if (record instanceof DS.Model) {
            return record.get('id');
        }
        var num = parseInt(record);
        if (isNaN(num)) {
            if (exception) {
                throw "Not an id"
            } else {
                return null
            }
        }
        return num
    }

}