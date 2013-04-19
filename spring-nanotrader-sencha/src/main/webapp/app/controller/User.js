Ext.define('SpringTrader.controller.User', {
   extend: 'Ext.app.Controller',
    config: {
        models: ['User'],
        refs: {
            signupSubmitBtn: 'signupPage #signupSubmitBtn',
            signupPage: 'signupPage'
        },
        control: {
            signupSubmitBtn: {
                tap: 'onSignupSubmit'
            }
        }

    },
    onSignupSubmit: function() {
        var form = this.getSignupPage();

        var user = Ext.create('SpringTrader.model.User');

        this.getSignupPage().updateRecord(user);

        if (this.validateUser(user, form)) {
            user.save();
        }
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

    }
});