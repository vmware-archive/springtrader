Ext.define('SpringTrader.controller.Main', {
	extend: 'Ext.app.Controller',
    init: function() {
        this.user = {
            authenticated: function() { return false; }
        };
    },
	config: {
		views: ['MarketSummary', 'Dashboard', 'Portfolio', 'Trade', 'SignupButton'],
		stores: ['MarketSummary'],
        refs: {
            dashboardView: 'dashboardPage',
            portfolioView: 'portfolioPage',
            tradeView: 'tradePage'
        },
        control: {
            dashboardView: {
                show: 'onDashboardShow'
            },
            portfolioView: {
                show: 'onPortfolioShow'
            },
            tradeView: {
                show: 'onTradeShow'
            }
        }
	},
    onDashboardShow: function() { this.onShow(this.getDashboardView, 'dashboard'); },
    onPortfolioShow: function() { this.onShow(this.getPortfolioView, 'portfolio'); },
    onTradeShow: function() { this.onShow(this.getTradeView, 'trade'); },

    onShow: function(getView, viewText) {
        getView().removeAll();

        var configItems = [
            {
                xtype: 'marketsummary',
                style: "backgroundColor:#ccc"
            }
        ];

        if (this.user.authenticated()) {
            configItems.push(
                {
                    xtype: 'component',
                    html: viewText,
                    style: "backgroundColor:#aaa"
                });
        } else {
            configItems.push({
                xtype: 'signupbutton'
            });
        }
        getView().add(configItems);
    }
});