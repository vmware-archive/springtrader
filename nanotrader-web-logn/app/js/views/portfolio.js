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
        var plot1 = jQuery.jqplot ('ad-pie-chart', [data], {
            grid: {
                    //drawGridLines: true,        // wether to draw lines across the grid or not.
                    //gridLineColor: '#cccccc',    // *Color of the grid lines.
                    background: '#ffffff',      // CSS color spec for background color of grid.
                    borderColor: '#ffffff',     // CSS color spec for border around grid.
                    shadow: false               // draw a shadow for grid.
            },
            seriesDefaults: {
                // Make this a pie chart.
                renderer: jQuery.jqplot.PieRenderer,
                rendererOptions: {
                    // Put data labels on the pie slices.
                    // By default, labels show the percentage of the slice.
                    showDataLabels: true
                }
            },
            legend: { show:true, location: 'e' }
        });

    }
});