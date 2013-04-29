Ext.define('SpringTrader.controller.Main', {
    extend: 'Ext.app.Controller',

    launch: function () {
        this.getApplication().on('authenticated', this.showLoggedInView, this);

        if (SpringTrader.user.authenticated()) {

        } else {
            this.showLoggedOutView();
        }
    },

    config: {
        views: ['MarketSummary', 'SignupButton', 'SignupForm', 'LoggedOut', 'LoginForm',
            'TabPanel', 'Dashboard', 'Portfolio', 'Trade'],
        stores: ['MarketSummary'],
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

    showLoggedOutView: function () {
        var oldView = this.getMainTabPanel();
        if (oldView) {
            oldView.destroy();
        }
        this.getMainView().add([
            { xtype: 'loggedoutview'}
        ])
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
        SpringTrader.user.logout(function () {
            window.location.reload();
        });
    },

    showLoggedInView: function () {
        this.getLoggedOutView().destroy();
        this.getMainView().add({xtype: 'maintabpanel'});
        this.getLoginButton().hide();
        this.getLogoutButton().show();
        // this.getApplication().fireEvent('refresh');
    }

});