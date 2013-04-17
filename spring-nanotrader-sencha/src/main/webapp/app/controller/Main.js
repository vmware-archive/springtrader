Ext.define('SpringTrader.controller.Main', {
	extend: 'Ext.app.Controller',

    init: function() {
        this.user = {
            authenticated: function() { return false; }
        };
    },

    launch: function() {
        this.getNavView().getNavigationBar().hide();
    },

	config: {
		views: ['TabPanel', 'MarketSummary', 'Dashboard', 'Portfolio', 'Trade', 'SignupButton', 'SignupForm'],
		stores: ['MarketSummary'],
        refs: {
            navView: 'navigationview',
            titleBar: 'titlebar',

            dashboardView: 'dashboardPage',
            portfolioView: 'portfolioPage',
            tradeView: 'tradePage',

            signupButton: 'signupbutton > button'
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
            },
            signupButton: {
                tap: 'onSignupButtonTap'
            },
            navView: {
                pop: 'onPopView'
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
    },

    onSignupButtonTap: function() {
        this.getTitleBar().hide();
        this.getNavView().getNavigationBar().show();
        this.getNavView().push(Ext.create('SpringTrader.view.SignupForm'));
    },

    onPopView: function(me, poppedView) {
        this.getNavView().getNavigationBar().hide();
        this.getTitleBar().show();
        poppedView.destroy();
    }
});