/**
 * View Class for the Portfolio Summary
 * @author Carlos Soto <carlos.soto>
 */
nano.views.PortfolioSummary = Backbone.View.extend({

    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto>
     * @param Object options
     * @return void
     */
    initialize: function (options) {
        'use strict';
        nano.containers.portfolioSummary = this.$el;
    },

    /**
     * Renders the Portfolio Summary View
     * @author Carlos Soto <carlos.soto>
     * @param Object model: Instance of nano.models.PortfolioSummary
     * @return void
     */
    render: function (model) {
        'use strict';
        var portfolioSummary = _.template(nano.utils.getTemplate(nano.conf.tpls.portfolioSummary))(model.toJSON());
        this.$el.html(portfolioSummary);
        this.$el.show();
    }
});