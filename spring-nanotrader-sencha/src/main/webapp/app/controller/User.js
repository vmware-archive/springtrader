Ext.define('SpringTrader.controller.User', {
   extend: 'Ext.app.Controller',
    requires: ['SpringTrader.view.ModalSheet'],
    config: {
        models: ['User'],
        refs: {
            signupSubmitButton: 'signupform #signupSubmitButton',
            profileSubmitButton: 'userform #submitButton',

            userForm: 'userform',
            signupPage: 'signupform',
            loginPage: 'loginform',

            modalSheet: 'modalsheet',

            signupCancelButton: 'signupform #cancelButton',

            loginCancelButton: 'loginform #cancelButton',
            loginSubmitButton: 'loginform #submitButton',
            loginButton: 'mainview #loginButton'
        },
        control: {
            signupSubmitButton: {
                tap: 'onSignupSubmit'
            },
            profileSubmitButton: {
                tap: 'onProfileSubmit'
            },

            signupCancelButton: {
                tap: 'onCancel'
            },
            loginCancelButton: {
                tap: 'onCancel'
            },
            loginSubmitButton: {
                tap: 'onLoginSubmit'
            }
        }

    },
    onSignupSubmit: function() {
        var form = this.getSignupPage();
        var user = Ext.create('SpringTrader.model.User');

        user.getProxy().addListener('exception', this.onException );

        form.updateRecord(user);

        if (this.validateUser(user, form)) {
            user.save(this.onSaveCallback, this);
        }
    },

    onProfileSubmit: function() {
        var form = this.getUserForm();
        var user = SpringTrader.user;

        user.getProxy().addListener('exception', this.onException );
        form.updateRecord(user);

        if (this.validateUser(user, form)) {
            user.save(function() {
                Ext.Msg.alert('Success', 'Profile updated.')
            });
        }
    },

    authenticate: function(user) {
        function successCallback(response) {
            Ext.Viewport.setMasked({
                xtype: 'loadmask',
                message: 'Loading...'
            });
            modalSheet.hide({ type: 'slide', direction: 'down' });
            setTimeout(function() {
                modalSheet.destroy()
            }, 2000);

            me.getApplication().fireEvent('authenticated');
        };

        function failureCallback(response) {
            Ext.Msg.alert("Failure", "The user name or password is incorrect.");
        };

        var modalSheet = this.getModalSheet();
        var me = this;

        SpringTrader.user = user;

        SpringTrader.model.User.authenticate(SpringTrader.user, successCallback, failureCallback);
    },

    onLoginSubmit: function() {
        var user = Ext.create('SpringTrader.model.User');
        this.getLoginPage().updateRecord(user);
        this.authenticate(user);
    },

    onCancel: function() {
        var modalSheet = this.getModalSheet();
        modalSheet.hide();
        this.getLoginButton().show();
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