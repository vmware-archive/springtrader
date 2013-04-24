Ext.define('SpringTrader.controller.User', {
   extend: 'Ext.app.Controller',
    config: {
        models: ['User'],
        refs: {
            signupSubmitBtn: 'signupPage #signupSubmitBtn',
            signupPage: 'signupPage',
            navView: 'navigationview'
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
        user.getProxy().addListener('exception', this.onException );

        this.getSignupPage().updateRecord(user);

        if (this.validateUser(user, form)) {
            user.save(this.onSaveCallback, this);
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

    },

    onSaveCallback: function(model, operation) {
        if (operation.wasSuccessful()) {
            this.getNavView().pop();
            this.authenticate(model);
        }
    },

    authenticate: function(model) {
//        SpringTrader.user = model;
    },

    onException: function(me, response) {
        var errorString = Ext.JSON.decode(response.responseText).detail;
        Ext.Msg.alert("Whoops", errorString);
    }
});