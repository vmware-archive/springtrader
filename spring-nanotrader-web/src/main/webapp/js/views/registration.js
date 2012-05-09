/**
 * View Class for Registration 
 * @author Jean Chassoul <jean.chassoul@lognllc.com>
 */
nano.views.Registration = Backbone.View.extend({
    
    /**
     * Bind the events functions to the different HTML elements
     */
    events : {
        'click #registrationBtn' : 'registration',
        'click #showLoginBtn' : 'login',
        'keypress [type=number]' : 'validateNumber'
    },
    
    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object options:
     * - el: selector for the container
     * @return void
     */
    initialize : function(options) {
        nano.containers.registration = this.$el;
    },

    /**
     * Templating function (inyects data into an HTML Template)
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object data: data to be replaced in the template
     * @return string
     */
    template : _.template(nano.utils.getTemplate(nano.conf.tpls.registration)),
    
    /**
     * Renders the Registration View
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @param mixed errorKey: Name of an error key from nano.strings to be displayed. It can be null (no error show on render)
     * @return void
     */
    render: function(errorKey) {
        if ( !this.$el.html() )
        {
            var registration = this.template();
            this.$el.html(registration);
            
            if (errorKey)
            {
                var registrationError = this.$('#registration-error');
                registrationError.find('p').html(translate(errorKey));
                registrationError.removeClass('hide');
            }
        }
        this.$el.show();
    },

    /**
     * Validates that the input can only receive digits
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @return boolean
     */
    validateNumber : function(event){
        return nano.utils.validateNumber(event);
    },

    /**
     * Registration event
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @return void
     */
    registration : function(event){
        // Form field control
        var matchpasswdControl = this.$('#matchpasswd-control');
        var fullnameControl = this.$('#fullname-control');
        var emailControl = this.$('#email-control');
        var passwdControl = this.$('#password-control');
        var usernameControl = this.$('#username-control');
        var openbalanceControl = this.$('#openbalance-control');
        var creditcardControl = this.$('#creditcard-control');
        var addressControl = this.$('#address-control');
        // General form error
        var registrationError = this.$('#registration-error');
        // Registration form fields errors
        var matchpasswdError = this.$('#matchpasswd-error');
        var fullnameError = this.$('#fullnameError');
        var emailError = this.$('#emailError');
        var passwdError = this.$('#passwdError');
        var usernameError = this.$('#usernameError');
        var openbalanceError = this.$('#openbalanceError');
        var creditcardError = this.$('#creditcardError');
        var addressError = this.$('#addressError');
        //matchpasswdControl.removeClass('error');
        
        // Hide the registration form erros
        matchpasswdError.addClass('hide');
        fullnameError.addClass('hide');
        emailError.addClass('hide');
        passwdError.addClass('hide');
        usernameError.addClass('hide');
        openbalanceError.addClass('hide');
        creditcardError.addClass('hide');
        addressError.addClass('hide');
        // General form error
        registrationError.addClass('hide');

        event.preventDefault();
    
        var fullname = this.$('#fullname-input').val();
        var email = this.$('#email-input').val();
        var password = this.$('#password-input').val();
        var matchpasswd = this.$('#matchpasswd-input').val();
        var username = this.$('#username-input').val();
        var openbalance = this.$('#openbalance-input').val();
        var creditcard = this.$('#creditcard-input').val();
        var address = this.$('#address-input').val();
        var view = this;
        
        var inputArray = [fullname, email, password, matchpasswd, username, openbalance, creditcard, address];
        var emptyField = false;
        
        for(var i = 0, j = inputArray.length; i < j; i++) {
            if(inputArray[i] == ''){
                registrationError.find('p').html(translate('emptyFieldError'));
                registrationError.removeClass('hide');
                emptyField = true;
                break
            }
        }
        
        // Set the Account Profile model
        this.model = new nano.models.AccountProfile();
        
        // Registration callbacks
        var callbacks = {
            success : function() {
                nano.utils.login(username, password, {
                    success : function(jqXHR, textStatus){
                        // Clear the credentials from the inputs
                        view.$('#fullname-input').val('');
                        view.$('#email-input').val('');
                        view.$('#password-input').val('');
                        view.$('#matchpasswd-input').val('');
                        view.$('#username-input').val('');
                        view.$('#openbalance-input').val('');
                        view.$('#creditcard-input').val('');
                        view.$('#address-input').val('');
                        // Show the loading page and render the dashboard
                        nano.utils.goTo( nano.conf.hash.dashboard );
                    },
                    error : function(jqXHR, textStatus, errorThrown) {
                        switch(jqXHR.status) {
                            case 401:
                                alert(translate('invalidUser'));
                                break;
                            default:
                                alert(translate('unknowError'));
                                break;
                        }
                    }
                });
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
                    if (error[x] == 'openbalanceError'){
                        openbalanceError.removeClass('hide');
                        openbalanceControl.addClass('error');
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
                    registrationError.find('h4.alert-heading').html(translate(error));
                    registrationError.find('p').html(translate('errorOcurred'));
                    registrationError.removeClass('hide');
                } else {
                    registrationError.find('h4.alert-heading').html(translate('ohSnap'));
                    registrationError.find('p').html(translate('unknowError'));
                    registrationError.removeClass('hide');
                }
                
            }
        };
        
        if (emptyField == false){
            if(password == matchpasswd){
                // Save the new account profile                
                this.model.save(
                    {
                        fullname: fullname,
                        email: email,
                        passwd: password,
                        userid: username,
                        accounts : [{openbalance : openbalance}],
                        creditcard: creditcard,
                        address: address
                    },
                    callbacks
                );
            }
            else {
                matchpasswdError.removeClass('hide');
                matchpasswdControl.addClass('error');
            }
        }
    },

    login : function (){
        window.location = nano.conf.hash.login;
    }
});
