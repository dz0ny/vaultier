/**
 * @module model
 * @class Vaultier.News
 * @extends RL.Model
 */
Vaultier.News = RL.Model.extend(
    {
        title: RL.attr('string'),
        text: RL.attr('string'),
        link: RL.attr('string'),
        published_at: RL.attr('date')

    }
);

ApplicationKernel.namespace('Vaultier.dal.model.news');

Vaultier.dal.model.news.Adapter = Vaultier.dal.adapter.RESTAdapter.extend({
    pluralize: function (resourceName) {
        return resourceName;
    }
})
