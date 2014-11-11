ApplicationKernel.namespace('Vaultier.dal.model');

/**
 * @module vaultier-dal-model
 * @class Vaultier.dal.model.News
 * @extends RL.Model
 */


Vaultier.dal.model.News = RL.Model.extend(
    {
        title: RL.attr('string'),
        text: RL.attr('string'),
        link: RL.attr('string'),
        published_at: RL.attr('date')

    }
);
