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

