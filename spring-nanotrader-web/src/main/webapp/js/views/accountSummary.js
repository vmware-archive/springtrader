/**
 * View Class for the Account Summary
 * @author Carlos Soto <carlos.soto>
 */
nano.views.AccountSummary = Backbone.View.extend({
    
	/**
     * Class constructor
     * @author Carlos Soto <carlos.soto>
     * @param Object options:
     * - model: nano.models.AccountSummary instance
     * @return void
     */
    initialize : function (options) {
		'use strict';
        nano.containers.accountSummary = this.$el;
    },

    /**
     * Renders the Account Summary View
     * @author Carlos Soto <carlos.soto>
     * @param Object account: Instance of nano.models.account
     * @param Object portfolioSummary: Instance of nano.models.PortfolioSummary
     * @return void
     */
     render : function (account, portfolioSummary) {
		'use strict';		
		var data = _.extend(portfolioSummary.toJSON(), account.toJSON());
        this.$el.html(_.template(nano.utils.getTemplate(nano.conf.tpls.accountSummary))(data));
        this.$el.show();
    }
});