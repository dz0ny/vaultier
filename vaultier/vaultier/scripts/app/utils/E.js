ApplicationKernel.namespace('Utils');

Utils.E = {

    recordId: function (record, exception) {
        exception = Po.F.optional(exception, false)

        if (record instanceof RL.Model) {
            var id = parseInt(record.get('id'));
            if (isNaN(id)) {
                id = record.get('id');
            }
            return id;
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