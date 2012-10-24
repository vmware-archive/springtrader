/**
 * View Class for the Portfolio
 * @author Carlos Soto <carlos.soto>
 */
 nano.views.Portfolio = Backbone.View.extend({

    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto>
     * @param Object options
     * @return void
     */
    initialize: function (options) {
        'use strict';
        nano.containers.portfolio = this.$el;
    },

    /**
     * Renders the Portfolio View
     * @author Carlos Soto <carlos.soto>
     * @param Object account: Instance of nano.models.account
     * @param Object portfolioSummary: Instance of nano.models.PortfolioSummary
     * @return void
     */
     render: function (account, portfolioSummary) {
        'use strict';        
        var totalAssets = portfolioSummary.get('totalMarketValue') + account.get('balance'),
            data = [
            [translate('cashBalance'), (account.get('balance') / totalAssets)],
            [translate('portfolioValue'), (portfolioSummary.get('totalMarketValue') / totalAssets)]
        ],
        plot1,
        i;
        
        // Multiply by 100 so that they all belong numbers greater
        // than zero. This is required for showing better percentages in the mobile version
        for (i in data) {
            data[i][1] *= 100;     
        }
        
        this.$el.html(_.template(nano.utils.getTemplate(nano.conf.tpls.portfolio))());
        this.$el.show();
        
        plot1 = nano.utils.renderPieChart('ad-pie-chart', data);
    }
});