Po.NS('Utils');
/**
 * Wraps jquery ajax to Ember.RSVP compatibile promise
 * @param options $.ajax options
 * @returns {Ember.RSVP.Promise}
 * @constructor
 */
Utils.RSVPAjax = function (options) {
    return new Ember.RSVP.Promise(function (resolve, reject) {
        Ember.$.ajax(options)
            .done(function (response) {
                resolve(response)
            })
            .fail(function (error) {
                reject(error)
            })
    });
}