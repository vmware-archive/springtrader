Ext.define('SpringTrader.controller.User', {
   extend: 'Ext.app.Controller',
    config: {
        models: ['User'],
        refs: {
            signupSubmitButton: 'signupform #signupSubmitButton',
            signupPage: 'signupform',
            mainView: 'mainview',
            modalSheet: 'modalsheet',
            loggedOutView: 'loggedoutview',
            loginButton: '#loginButton',
            cancelButton: 'signupform #signupCancelButton'
        },
        control: {
            signupSubmitButton: {
                tap: 'onSignupSubmit'
            },
            cancelButton: {
                tap: 'onSignupCancel'
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

    onSignupCancel: function() {
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
            var mainView = this.getMainView();
            var loggedOutView = this.getLoggedOutView();
            var modalSheet = this.getModalSheet();
            var loginButton = this.getLoginButton();
            SpringTrader.model.User.authenticate(model, function(response) {
                modalSheet.hide({ type: 'slide', direction: 'down' });
                loggedOutView.destroy();
                mainView.add({xtype: 'maintabpanel'});
                loginButton.hide();
                setTimeout(function() {
                    modalSheet.destroy()
                }, 2000);
            });
        }
    },

    onException: function(me, response) {
        var errorString = Ext.JSON.decode(response.responseText).detail;
        Ext.Msg.alert("Whoops", errorString);
    }
});