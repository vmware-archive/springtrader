/**
 * View Class for the Portfolio
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
 nano.views.Portfolio = Backbone.View.extend({

    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object options:
     * - el: selector for the container
     * @return void
     */
    initialize : function(options) {
        nano.containers.portfolio = this.$el;
    },

    /**
     * Templating function (inyects data into an HTML Template)
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object data: data to be replaced in the template
     * @return string
     */
    template : _.template(nano.utils.getTemplate(nano.conf.tpls.portfolio)),

    /**
     * Renders the Portfolio View
     * @author Carlos Soto <carlos.soto@lognllc.com>
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
        this.$el.html(this.template());
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