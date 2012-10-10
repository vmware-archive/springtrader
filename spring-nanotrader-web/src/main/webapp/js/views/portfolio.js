/**
 * View Class for the Portfolio
 * @author Carlos Soto <carlos.soto>
 */
 nano.views.Portfolio = Backbone.View.extend({

    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto>
     * @param Object options:
     * - el: selector for the container
     * @return void
     */
    initialize : function(options) {
        nano.containers.portfolio = this.$el;
    },

    /**
     * Renders the Portfolio View
     * @author Carlos Soto <carlos.soto>
     * @param Object account: Instance of nano.models.account
     * @param Object portfolioSummary: Instance of nano.models.PortfolioSummary
     * @return void
     */
     render : function(account, portfolioSummary) {
        if (portfolioSummary)
        {
            this.portfolioSummary = portfolioSummary;
        }
        if (account)
        {
            this.account = account;
        }
        this.$el.html(_.template(nano.utils.getTemplate(nano.conf.tpls.portfolio))());
        this.$el.show();

        var totalAssets = portfolioSummary.get('totalMarketValue') + account.get('balance');
        var data = [
            [translate('cashBalance'), (account.get('balance') / totalAssets)],
            [translate('portfolioValue'), (portfolioSummary.get('totalMarketValue') / totalAssets)]
        ];
        var plot1 = nano.utils.renderPieChart('ad-pie-chart', data);

        //Prepare the view for collapsing sections
        if ( nano.utils.isMobile() )
        {
            nano.utils.setCollapsable(this);
        }
    }
});
