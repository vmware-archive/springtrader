Ext.define('SpringTrader.controller.Main', {
    extend: 'Ext.app.Controller',

    launch: function () {
        this.getApplication().on('authenticated', this.updateLocalStorage, this);
        this.getApplication().on('authenticated', this.loadQuotes, this);
        this.getMainView().getNavigationBar().hide();
        this.switchViews();
    },

    config: {
        views: ['SignupButton', 'SignupForm', 'LoggedOut', 'LoginForm',
            'TabPanel', 'Dashboard', 'Portfolio', 'Trade', 'Settings', 'Transactions'],
        refs: {
            titleBar: 'titlebar',

            mainView: 'mainview',

            mainTabPanel: 'maintabpanel',
            loggedOutView: 'loggedoutview',

            showSignupFormButton: 'loggedoutview #showSignupFormButton',

            loginButton: 'mainview #loginButton',
            settingsButton: 'mainview #settingsButton',

            dashboardPage: 'dashboardPage',
            portfolioPage: 'portfolioPage',
            transactionsPage: 'transactionsPage'
        },
        control: {
            showSignupFormButton: {
                tap: 'onSignupButtonTap'
            },
            loginButton: {
                tap: 'onLoginButtonTap'
            },
            settingsButton: {
                tap: 'onSettingsButtonTap'
            },
            mainView: {
                pop: 'onPopView'
            },
            dashboardPage: {
                activate: 'onDashboardActive'
            },
            portfolioPage: {
                activate: 'onPortfolioActive'
            },
            transactionsPage: {
                activate: 'onTransactionsActive'
            }
        }
    },

    switchViews: function () {
        if (SpringTrader.user.authenticated()) {
            this.showLoggedInView();
        } else {
            this.showLoggedOutView();
        }

        Ext.Viewport.unmask();
    },

    onSignupButtonTap: function (what, event) {
        event.stopEvent();
        var signupSheet = Ext.create('SpringTrader.view.ModalSheet', {
            items: [
                {xtype: 'signupform'}
            ]
        });
        this.getMainView().add(signupSheet);
        this.getLoginButton().hide();
        signupSheet.show();
    },

    onLoginButtonTap: function (what, event) {
        event.stopEvent();
        var loginSheet = Ext.create('SpringTrader.view.ModalSheet', {
            items: [
                {xtype: 'loginform'}
            ]
        });
        this.getMainView().add(loginSheet);
        this.getLoginButton().hide();
        loginSheet.show();
    },

    onSettingsButtonTap: function () {
        this.getTitleBar().hide();
        this.getMainView().getNavigationBar().show();
        var settingsView = Ext.create('SpringTrader.view.Settings');
        settingsView.pushedFromMain = true;
        this.getMainView().push(settingsView);
    },

    onPopView: function (me, poppedView) {
        if (poppedView.pushedFromMain) {
            this.getMainView().getNavigationBar().hide();
            this.getTitleBar().show();
        }
        poppedView.destroy();
        this.switchViews();
        Ext.Viewport.unmask();
    },


    showLoggedInView: function () {
        if (SpringTrader.currentView != 'authenticated') {
            SpringTrader.currentView = 'authenticated';
            this.getLoggedOutView() && this.getLoggedOutView().destroy();
            this.getMainView().add({xtype: 'maintabpanel'});
            this.getLoginButton().hide();
            this.getSettingsButton().show();
        }
    },

    showLoggedOutView: function () {
        if (SpringTrader.currentView != 'unauthenticated') {
            this.getMainTabPanel() && this.getMainTabPanel().destroy();
            this.getSettingsButton().hide();
            this.getLoginButton().show();
            this.getMainView().add({ xtype: 'loggedoutview'});
            SpringTrader.currentView = 'unauthenticated';
        }
    },

    updateLocalStorage: function () {
        SpringTrader.appStore.
            add('authToken', SpringTrader.user.get('authToken')).
            add('accountid', SpringTrader.user.get('accountid')).
            add('profileid', SpringTrader.user.get('profileid'));
    },

    loadQuotes: function () {
        Ext.StoreMgr.lookup('quotes').load();
    },

    onDashboardActive: function () {
        var me = this;
        SpringTrader.user.accountSummary.refreshData(function () {
            me.getApplication().fireEvent('refresh', 'accountsummary');
        });
        SpringTrader.user.loadAccountData(function () {
            me.getApplication().fireEvent('refresh', 'userstats');
        });
        SpringTrader.user.holdingSummary.refreshData(function () {
            me.getApplication().fireEvent('refresh', 'holdingsummary');
        });
    },

    onPortfolioActive: function () {
        var me = this;
        SpringTrader.user.accountSummary.refreshData(function () {
            me.getApplication().fireEvent('refresh', 'accountsummary');
        });
    },

    onTransactionsActive: function () {
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Loading...'
        });

        var store = Ext.StoreManager.lookup('orders');
        store.currentPage = 0;
        store.load(function () {
            Ext.Viewport.unmask();
        });
    }
});