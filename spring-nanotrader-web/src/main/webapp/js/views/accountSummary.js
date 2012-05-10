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