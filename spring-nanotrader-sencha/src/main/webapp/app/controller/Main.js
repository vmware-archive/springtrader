Ext.define('SpringTrader.controller.Main', {
	extend: 'Ext.app.Controller',

    launch: function() {
        if (SpringTrader.user.authenticated()) {

        } else {
            this.showLoggedOutView();
        }
    },

	config: {
		views: ['TabPanel', 'MarketSummary', 'SignupButton', 'SignupForm', 'LoggedOut', 'LoginForm',
            'Dashboard', 'Portfolio', 'Trade' ],
		stores: ['MarketSummary'],
        refs: {
            titleBar: 'titlebar',

            mainView: 'mainview',

            mainTabPanel: 'maintabpanel',
            loggedOutView: 'loggedoutview',

            dashboardView: 'dashboardPage',
            portfolioView: 'portfolioPage',
            tradeView: 'tradePage',

            showSignupFormButton: 'loggedoutview #showSignupFormButton',

            loginButton: 'mainview #loginButton'
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
            loginButton: {
                tap: 'onLoginButtonTap'
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
        var signupSheet = Ext.create('SpringTrader.view.ModalSheet', {
            items: [{xtype: 'signupform'}]
        });
        this.getMainView().add(signupSheet);
        signupSheet.show();
    },

    onLoginButtonTap: function() {
        var loginSheet = Ext.create('SpringTrader.view.ModalSheet', {
            items: [{xtype: 'loginform'}]
        });
        this.getMainView().add(loginSheet);
        loginSheet.show();
    }
});