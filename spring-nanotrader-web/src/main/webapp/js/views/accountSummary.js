/**
 * View Class for the Account Summary
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
nano.views.AccountSummary = Backbone.View.extend({

    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object options:
     * - el: selector for the container
     * - model: nano.models.AccountSummary instance
     * @return void
     */
    initialize : function(options) {
        nano.containers.accountSummary = this.$el;
    },

    /**
     * Renders the Account Summary View
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object account: Instance of nano.models.account
     * @param Object portfolioSummary: Instance of nano.models.PortfolioSummary
     * @return void
     */
    render_mobile : function(account,portfolioSummary,model)
    {
    	if (portfolioSummary)
        {
            this.portfolioSummary = portfolioSummary;
        }
        if (account)
        {
            this.account = account;
        }
        if (model)
        {
            this.model = model;
        }

        var data1 = _.extend(portfolioSummary.toJSON(), account.toJSON());
        var accountSummary = _.template(nano.utils.getTemplate(nano.conf.tpls.accountSummary))(data1);
        this.$el.html(accountSummary);
        this.$el.show();
        
        var totalAssets = portfolioSummary.get('totalMarketValue') + account.get('balance');
        var data = [
            [translate('cashBalance'), (account.get('balance') / totalAssets)],
            [translate('portfolioValue'), (portfolioSummary.get('totalMarketValue') / totalAssets)]
        ];
        var plot1 = nano.utils.renderPieChart('ad-pie-chart1', data);
        var data = [];
        var holdingRollups = model.get('holdingRollups');
        for (var i in holdingRollups)
        {
        	if (holdingRollups[i].percent != 0)
            data.push([holdingRollups[i].symbol, holdingRollups[i].percent]);
        }
        var plot2 = nano.utils.renderPieChart('dtg-pie-chart', data);
    },

     render : function(account, portfolioSummary) {

        // Set the models
        if (portfolioSummary)
        {
            this.portfolioSummary = portfolioSummary;
        }
        if (account)
        {
            this.account = account;
        }
        var data = _.extend(portfolioSummary.toJSON(), account.toJSON());

        var accountSummary = _.template(nano.utils.getTemplate(nano.conf.tpls.accountSummary))(data);
        this.$el.html(accountSummary);
        this.$el.show();

        //Prepare the view for collapsing sections
        if ( nano.utils.isMobile() )
        {
            nano.utils.setCollapsable(this);
        }
    }
});