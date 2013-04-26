Ext.define('SpringTrader.controller.User', {
   extend: 'Ext.app.Controller',
    config: {
        models: ['User'],
        refs: {
            signupSubmitButton: 'signupform #signupSubmitButton',
            signupPage: 'signupform',
            loginPage: 'loginform',
            mainView: 'mainview',
            modalSheet: 'modalsheet',
            loggedOutView: 'loggedoutview',
            loginButton: '#loginButton',
            logoutButton: 'mainview #logoutButton',
            signupCancelButton: 'signupform #cancelButton',
            loginCancelButton: 'loginform #cancelButton',
            loginSubmitButton: 'loginform #submitButton'
        },
        control: {
            signupSubmitButton: {
                tap: 'onSignupSubmit'
            },
            signupCancelButton: {
                tap: 'onCancel'
            },
            loginCancelButton: {
                tap: 'onCancel'
            },
            loginSubmitButton: {
                tap: 'onLoginSubmit'
            },
            logoutButton: {
                tap: 'onLogout'
            }
        }

    },
    onSignupSubmit: function() {
        var form = this.getSignupPage();
        var user = Ext.create('SpringTrader.model.User');
        user.getProxy().addListener('exception', this.onException );

        this.getSignupPage().updateRecord(user);

        if (this.validateUser(user, form)) {
            user.save(this.onSaveCallback, this);
        }
    },

    authenticate: function(user) {
        var mainView = this.getMainView();
        var loggedOutView = this.getLoggedOutView();
        var modalSheet = this.getModalSheet();
        var loginButton = this.getLoginButton();
        var logoutButton = this.getLogoutButton();

        SpringTrader.user = user;

        SpringTrader.model.User.authenticate(SpringTrader.user, function(response) {
            modalSheet.hide({ type: 'slide', direction: 'down' });
            loggedOutView.destroy();
            mainView.add({xtype: 'maintabpanel'});
            loginButton.hide();
            logoutButton.show();
            setTimeout(function() {
                modalSheet.destroy()
            }, 2000);
        });
    },

    onLoginSubmit: function() {
        var user = Ext.create('SpringTrader.model.User');
        this.getLoginPage().updateRecord(user);
        this.authenticate(user);
    },

    onLogout: function() {
        SpringTrader.user.logout(function() {
            window.location.reload();
        });
    },

    onCancel: function() {
        var modalSheet = this.getModalSheet();
        modalSheet.hide();
        setTimeout(function() {
            modalSheet.destroy()
        }, 2000);
    },

    validateUser: function(user, form) {
        var errorString = "";
        var errors = user.validate();

        if (form.getValues().passwd != form.getValues().passwdconfirm) {
            errors.add({field: 'passwd', error: 'confirmation must match'})
        }

        if (!errors.isValid()) {
            errors.each(function(error) {
                errorString += error.getField() + " " +error.getMessage() + "<br/>";
            });
            Ext.Msg.alert("Sorry", errorString);
            return false;
        }

        return true;

    },

    onSaveCallback: function(model, operation) {
        if (operation.wasSuccessful()) {
            this.authenticate(model);
        }
    },

    onException: function(me, response) {
        var errorString = Ext.JSON.decode(response.responseText).detail;
        Ext.Msg.alert("Whoops", errorString);
    }
});