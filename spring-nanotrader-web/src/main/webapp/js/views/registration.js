/**
 * View Class for Registration 
 * @author Jean Chassoul <jean.chassoul>
 */
nano.views.Registration = Backbone.View.extend({
    
    /**
     * Bind the events functions to the different HTML elements
     */
    events : {
        'click #registrationBtn' : 'registration',
        'click #showLoginBtn' : 'login',
        'keypress [type=number]' : 'validateNumber',
        'blur #matchpasswd-input' : 'validatePassword'
    },
    
    
    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto>
     * @param Object options:
     * - el: selector for the container
     * @return void
     */
    initialize : function(options) {
        nano.containers.registration = this.$el;
    },

    /**
     * Renders the Registration View
     * @author Jean Chassoul <jean.chassoul>
     * @param mixed errorKey: Name of an error key from nano.strings to be displayed. It can be null (no error show on render)
     * @return void
     */
    render: function(errorKey) {

        if( !this.$el.html() ){
            this.$el.html(_.template(nano.utils.getTemplate(nano.conf.tpls.registration))());

            if (errorKey)
            {
                var registrationError = this.$('#registration-error');
                registrationError.find('p').html(translate(errorKey));
                registrationError.removeClass('hide');
            }

            //Cache all of the inputs
            this.fullnameInput = this.$('#fullname-input');
            this.emailInput = this.$('#email-input');
            this.passwordInput = this.$('#reg-password-input');
            this.matchpasswdInput = this.$('#matchpasswd-input');
            this.usernameInput = this.$('#reg-username-input');
            this.openbalanceInput = this.$('#openbalance-input');
            this.creditcardInput = this.$('#creditcard-input');
            this.addressInput = this.$('#address-input');

            //Cache all of the controls
            this.matchpasswdControl = this.$('#matchpasswd-control');
            this.fullnameControl = this.$('#fullname-control');
            this.emailControl = this.$('#email-control');
            this.passwdControl = this.$('#password-control');
            this.usernameControl = this.$('#username-control');
            this.openbalanceControl = this.$('#openbalance-control');
            this.creditcardControl = this.$('#creditcard-control');
            this.addressControl = this.$('#address-control');

            // General form error
            this.registrationError = this.$('#registration-error');

            // Registration form fields errors
            this.matchpasswdError = this.$('#matchpasswd-error');
            this.fullnameError = this.$('#fullnameError');
            this.emailError = this.$('#emailError');
            this.passwdError = this.$('#passwdError');
            this.usernameError = this.$('#usernameError');
            this.openbalanceError = this.$('#openbalanceError');
            this.creditcardError = this.$('#creditcardError');
            this.addressError = this.$('#addressError');
        }
        this.$el.show();
    },

    /**
     * Validates that the input can only receive digits
     * @author Carlos Soto <carlos.soto>
     * @return boolean
     */
    validateNumber : function(event){
        return nano.utils.validateNumber(event);
    },

    /**
     * Validates that the password and retype password match
     * @author Carlos Soto <carlos.soto>
     * @return boolean
     */
    validatePassword : function(event){
        if ( this.matchpasswdInput.val() != this.passwordInput.val() )
        {
            this.matchpasswdError.removeClass('hide');
            this.matchpasswdControl.addClass('error');
        }
        else
        {
            this.matchpasswdError.addClass('hide');
            this.matchpasswdControl.removeClass('error');
        }
    },

    /**
     * Registration event
     * @author Jean Chassoul <jean.chassoul>
     * @return void
     */
    registration : function(event){

        //Remove the error class from the inputs
        this.matchpasswdControl.removeClass('error');
        this.fullnameControl.removeClass('error');
        this.emailControl.removeClass('error');
        this.passwdControl.removeClass('error');
        this.usernameControl.removeClass('error');
        this.openbalanceControl.removeClass('error');
        this.creditcardControl.removeClass('error');
        this.addressControl.removeClass('error');

        // Hide the registration form erros
        this.matchpasswdError.addClass('hide');
        this.fullnameError.addClass('hide');
        this.emailError.addClass('hide');
        this.passwdError.addClass('hide');
        this.usernameError.addClass('hide');
        this.openbalanceError.addClass('hide');
        this.creditcardError.addClass('hide');
        this.addressError.addClass('hide');
        // General form error
        this.registrationError.addClass('hide');

        event.preventDefault();

        var fullname    = this.fullnameInput.val();
        var email       = this.emailInput.val();
        var password    = this.passwordInput.val();
        var matchpasswd = this.matchpasswdInput.val();
        var username    = this.usernameInput.val();
        var openbalance = this.openbalanceInput.val();
        var creditcard  = this.creditcardInput.val();
        var address     = this.addressInput.val();
        var view        = this;
        
        var inputArray = [fullname, email, password, matchpasswd, username, openbalance, creditcard, address];
        var emptyField = false;
        
        for(var i = 0, j = inputArray.length; i < j; i++) {
            if(inputArray[i] == ''){
                this.registrationError.find('p').html(translate('emptyFieldError'));
                this.registrationError.removeClass('hide');
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
                        view.fullnameInput.val('');
                        view.emailInput.val('');
                        view.passwordInput.val('');
                        view.matchpasswdInput.val('');
                        view.usernameInput.val('');
                        view.openbalanceInput.val('');
                        view.creditcardInput.val('');
                        view.addressInput.val('');

                        // Show the loading page and render the dashboard
                        nano.instances.router.navigate(nano.conf.hash.dashboard, true);
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
                errorsStr = translate('unknowError');
                if( _.isArray(error) ){
                    errorsStr = '';
                    for (var x in error){
                        errorsStr += translate(error[x]) + '<br>';
                        switch(error[x]) {
                            case 'fullnameError':
                                view.fullnameError.removeClass('hide');
                                view.fullnameControl.addClass('error');
                            break;
                            case 'emailError':
                                view.emailError.removeClass('hide');
                                view.emailControl.addClass('error');
                            break;
                            case 'passwdError':
                                view.passwdError.removeClass('hide');
                                view.passwdControl.addClass('error');
                            break;
                            case 'useridError':
                                view.usernameError.removeClass('hide');
                                view.usernameControl.addClass('error');
                            break;
                            case 'openbalanceError':
                                view.openbalanceError.removeClass('hide');
                                view.openbalanceControl.addClass('error');
                            break;
                            case 'creditcardError':
                                view.creditcardError.removeClass('hide');
                                view.creditcardControl.addClass('error');
                            break;
                            case 'addressError':
                                view.addressError.removeClass('hide');
                                view.addressControl.addClass('error');
                            break;
                        }
                    }
                }
                else if (error.responseText)
                {
                    errorsStr = error.responseText;
                }
                view.registrationError.find('h4.alert-heading').html(translate('anError'));
                view.registrationError.find('p').html(errorsStr);
                view.registrationError.removeClass('hide');
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
                view.matchpasswdError.removeClass('hide');
                view.matchpasswdControl.addClass('error');
            }
        }
    },

    login : function (){
        window.location = nano.conf.hash.login;
    }
});