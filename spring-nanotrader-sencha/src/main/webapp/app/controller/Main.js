Ext.define('SpringTrader.controller.Main', {
	extend: 'Ext.app.Controller',

    launch: function() {
        if (SpringTrader.user.authenticated()) {

        } else {
            this.showLoggedOutView();
        }
    },

	config: {
		views: ['TabPanel', 'MarketSummary', 'Dashboard', 'Portfolio', 'Trade', 'SignupButton', 'SignupForm', 'LoggedOut'],
		stores: ['MarketSummary'],
        refs: {
            titleBar: 'titlebar',

            mainView: 'mainview',

            mainTabPanel: 'maintabpanel',
            loggedOutView: 'loggedoutview',

            dashboardView: 'dashboardPage',
            portfolioView: 'portfolioPage',
            tradeView: 'tradePage',

            showSignupFormButton: 'loggedoutview #showSignupFormButton'
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
            showSignupFormButton: {
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

        configItems.push(
            {
                xtype: 'component',
                html: viewText,
                style: "backgroundColor:#aaa"
            });

        getView().add(configItems);
    },

    showLoggedOutView: function() {
        var oldView = this.getMainTabPanel();
        if (oldView) { oldView.destroy(); }
        this.getMainView().add([
          { xtype: 'loggedoutview'}
      ])
    },

    onSignupButtonTap: function() {
        console.log('tap');
        var signupSheet = Ext.create('SpringTrader.view.ModalSheet', {
            items: [{xtype: 'signupform'}]
        });
        this.getMainView().add(signupSheet);
        signupSheet.show();
    }
});