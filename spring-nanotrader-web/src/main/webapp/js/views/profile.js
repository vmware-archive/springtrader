/**
 * View Class for Account Profile 
 * @author Jean Chassoul <jean.chassoul@lognllc.com>
 */
nano.views.Profile = Backbone.View.extend({
    
    /**
     * Bind the events functions to the different HTML elements
     */
    events : {
        'click #updateBtn' : 'update',
        'click #overview' : 'overview',
        'click #help' : 'help'
    },
    
    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object options:
     * - el: selector for the container
     * @return void
     */
    initialize : function(options) {
        nano.containers.profile = this.$el;
    },

    /**
     * Templating function (inyects data into an HTML Template)
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object data: data to be replaced in the template
     * @return string
     */
    template : _.template(nano.utils.getTemplate(nano.conf.tpls.profile)),
    
    /**
     * Renders the Registration View
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @param mixed errorKey: Name of an error key from nano.strings to be displayed. It can be null (no error show on render)
     * @return void
     */
    render: function(model) {
        if ( !this.$el.html() )
        {
            // Set the Account Profile model
            this.model = model;

            if (!this.creditcard){
                // Set the real creditcard number
                this.creditcard = this.model.toJSON().creditcard;
                // Set the current creditcard slice
                this.ccSlice = this.creditcard.slice(-4);
            }
            
            var data = this.model.toJSON()
            data.creditcard = String('****************' + this.ccSlice).slice(-1 * data.creditcard.length);
            // template
            var profile = this.template(data);
            
            this.$el.html(profile);
        }
        this.$el.show();
    },
    
    /**
     * Update event
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @return void
     */
    update : function (event){
        var updateError = this.$('#update-error');
        updateError.addClass('hide');
        
        // Form field control
        var matchpasswdControl = this.$('#matchpasswd-control');
        var fullnameControl = this.$('#fullname-control');
        var emailControl = this.$('#email-control');
        var passwdControl = this.$('#password-control');
        var usernameControl = this.$('#username-control');
        var creditcardControl = this.$('#creditcard-control');
        var addressControl = this.$('#address-control');

        // Profile form fields errors
        var matchpasswdError = this.$('#matchpasswd-error');
        var fullnameError = this.$('#fullnameError');
        var emailError = this.$('#emailError');
        var passwdError = this.$('#passwdError');
        var usernameError = this.$('#usernameError');
        var creditcardError = this.$('#creditcardError');
        var addressError = this.$('#fullnameError');
        
        // Hide the registration form erros
        matchpasswdError.addClass('hide');
        fullnameError.addClass('hide');
        emailError.addClass('hide');
        passwdError.addClass('hide');
        usernameError.addClass('hide');
        creditcardError.addClass('hide');
        addressError.addClass('hide');
        
        
        event.preventDefault();
        
        var fullname = this.$('#fullname-input').val();
        var email = this.$('#email-input').val();
        var password = this.$('#password-input').val();
        var matchpasswd = this.$('#matchpasswd-input').val();
        var username = this.$('#username-input').val();
        var creditcard = this.$('#creditcard-input').val();
        var address = this.$('#address-input').val();
        var view = this;
        
        var inputArray = [fullname, email, username, creditcard, address];
        var emptyField = false;
        
        for(var i = 0, j = inputArray.length; i < j; i++) {
            if(inputArray[i] == ''){
                updateError.find('h4.alert-heading').html(translate('ohSnap'));
                updateError.find('p').html(translate('emptyFieldError'));
                updateError.removeClass('hide');
                emptyField = true;
                break
            }
        }
        
        // Update model callbacks
        var callbacks = {
            success : function() {
                view.$('#password-input').val('');
                view.$('#matchpasswd-input').val('');
                view.$('#creditcard-input').val('************' + creditcard.slice(-4))
                // Show the loading page and render the dashboard
                nano.utils.goTo( nano.conf.hash.dashboard );
            },
            error : function(model, error) {
                
                for (x in error){
                    
                    if (error[x] == 'fullnameError'){
                        fullnameError.removeClass('hide');
                        fullnameControl.addClass('error');
                    }
                    if (error[x] == 'emailError'){
                        emailError.removeClass('hide');
                        emailControl.addClass('error');
                    }
                    if (error[x] == 'passwdError'){
                        passwdError.removeClass('hide');
                        passwdControl.addClass('error');
                    }
                    if (error[x] == 'useridError'){
                        usernameError.removeClass('hide');
                        usernameControl.addClass('error');
                    }
                    if (error[x] == 'creditcardError'){
                        creditcardError.removeClass('hide');
                        creditcardControl.addClass('error');
                    }
                    if (error[x] == 'addressError'){
                        addressError.removeClass('hide');
                        addressControl.addClass('error');
                    }
                };
                
                if (error in nano.strings){
                    updateError.find('h4.alert-heading').html(translate(error));
                    updateError.find('p').html(translate('errorOcurred'));
                    updateError.removeClass('hide');
                } else {
                    updateError.find('h4.alert-heading').html(translate('ohSnap'));
                    updateError.find('p').html(translate('unknowError'));
                    updateError.removeClass('hide');
                }
                
            }
        };
        
        if (emptyField == false){
            // validate new creditcard input
            reCreditcard = new RegExp(/^\b[\d]{16}\b$/);
            if (creditcard.match(reCreditcard) == null){
                // any changes?
                if (this.ccSlice == creditcard.slice(-4)){
                    creditcard = this.creditcard;
                }
            }
            
            // update profile attrs
            var attrs = {
                fullname: fullname,
                email: email,
                userid: username,
                creditcard: creditcard,
                address: address
            }
            
            if (password != matchpasswd && password != ''){
                matchpasswdError.removeClass('hide');
                matchpasswdControl.addClass('error');
            } else {
                if(password == matchpasswd && password != ''){
                    attrs.passwd = password
                }
                // Save the new account profile
                this.model.save(attrs, callbacks);
            }
        }
    },
    
    overview : function(){
        window.location = nano.conf.hash.overview;
    },
    
    help : function(){
        window.location = nano.conf.hash.help;
    }
    
});
