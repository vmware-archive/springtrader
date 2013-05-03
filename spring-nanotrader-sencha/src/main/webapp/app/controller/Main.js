Ext.define('SpringTrader.controller.Main', {
    extend: 'Ext.app.Controller',

    launch: function () {
        this.getApplication().on('authenticated', this.showLoggedInView, this);
        this.getApplication().on('authenticated', this.updateLocalStorage, this);
        if (SpringTrader.user.authenticated()) {
            this.showLoggedInView();
        } else {
            this.showLoggedOutView();
        }
    },

    config: {
        views: ['SignupButton', 'SignupForm', 'LoggedOut', 'LoginForm',
            'TabPanel', 'Dashboard', 'Portfolio', 'Trade'],
        refs: {
            titleBar: 'titlebar',

            mainView: 'mainview',

            mainTabPanel: 'maintabpanel',
            loggedOutView: 'loggedoutview',

            showSignupFormButton: 'loggedoutview #showSignupFormButton',

            loginButton: 'mainview #loginButton',
            logoutButton: 'mainview #logoutButton'
        },
        control: {
            showSignupFormButton: {
                tap: 'onSignupButtonTap'
            },
            loginButton: {
                tap: 'onLoginButtonTap'
            },
            logoutButton: {
                tap: 'onLogoutButtonTap'
            }
        }
    },

    onSignupButtonTap: function (what, event) {
        event.stopEvent();
        var signupSheet = Ext.create('SpringTrader.view.ModalSheet', {
            items: [
                {xtype: 'signupform'}
            ]
        });
        this.getMainView().add(signupSheet);
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
        loginSheet.show();
    },

    onLogoutButtonTap: function () {
        var me = this;
        SpringTrader.user.logout(function () {
            me.clearLocalStorage();
            me.showLoggedOutView();
        });
    },

    showLoggedInView: function () {
        this.getLoggedOutView() && this.getLoggedOutView().destroy();
        this.getMainView().add({xtype: 'maintabpanel'});
        this.getLoginButton().hide();
        this.getLogoutButton().show();
    },

    showLoggedOutView: function () {
        this.getMainTabPanel() && this.getMainTabPanel().destroy();
        this.getLogoutButton().hide();
        this.getLoginButton().show();
        this.getMainView().add({ xtype: 'loggedoutview'});
    },

    updateLocalStorage: function () {
        SpringTrader.appStore.
            add('authToken', SpringTrader.user.get('authToken')).
            add('accountid', SpringTrader.user.get('accountid')).
            add('profileid', SpringTrader.user.get('profileid'));
    },

    clearLocalStorage: function () {
        SpringTrader.appStore.remove('authToken');
        SpringTrader.appStore.remove('accountid');
        SpringTrader.appStore.remove('profileid');
    }

});