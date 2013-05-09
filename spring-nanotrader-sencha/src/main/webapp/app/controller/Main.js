Ext.define('SpringTrader.controller.Main', {
    extend: 'Ext.app.Controller',

    launch: function () {
        this.getApplication().on('authenticated', this.updateLocalStorage, this);
        this.getMainView().getNavigationBar().hide();
        this.switchViews();
    },

    config: {
        views: ['SignupButton', 'SignupForm', 'LoggedOut', 'LoginForm',
            'TabPanel', 'Dashboard', 'Portfolio', 'Trade', 'Settings'],
        refs: {
            titleBar: 'titlebar',

            mainView: 'mainview',

            mainTabPanel: 'maintabpanel',
            loggedOutView: 'loggedoutview',

            showSignupFormButton: 'loggedoutview #showSignupFormButton',

            loginButton: 'mainview #loginButton',
            settingsButton: 'mainview #settingsButton'
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
        this.getMainView().push(settingsView);
    },

    onPopView: function (me, poppedView) {
        this.getMainView().getNavigationBar().hide();
        this.getTitleBar().show();
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
    }
});