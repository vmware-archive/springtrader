/**
 * View Class for Account Profile 
 * @author Jean Chassoul <jean.chassoul@lognllc.com>
 * @author Kashyap Parikh
 */
nano.views.Profile = Backbone.View.extend({
    
    /**
     * Bind the events functions to the different HTML elements
     */
    events : {
        'click #updateBtn' : 'update',
        'click #overview' : 'overview',
        'click #help' : 'help',
        'click #admin' : 'admin'
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
     * Renders the Profile View
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @param nano.models.AccountProfile model: User Account Profile model
     * @return void
     */
    render: function(model) {
        // Set the Account Profile model
        if (model) {
            this.model = model;
        }

        // Set the real creditcard number
        this.creditcard = this.model.toJSON().creditcard;
            
        // Set the current creditcard slice
        this.ccSlice = this.creditcard.slice(-4);

        // Account profile data to be render on the profile template
        var data = this.model.toJSON();
            
        // Show only the last 4 digits of the creditcard number.
        data.creditcard = String('****************' + this.ccSlice).slice(-1 * data.creditcard.length);

        // Get the profile template and parse the account profile data
        var profile = _.template(nano.utils.getTemplate(nano.conf.tpls.profile))(data);
            
        this.$el.html(profile);

        // General update form error
        this.updateError = this.$('#update-error');

        // Cache all the inputs
        this.fullnameInput = this.$('#fullname-input');
        this.emailInput = this.$('#email-input');
        this.passwordInput = this.$('#password-input');
        this.matchpasswdInput = this.$('#matchpasswd-input');
        this.usernameInput = this.$('#username-input');
        this.creditcardInput = this.$('#creditcard-input');
        this.addressInput = this.$('#address-input');

        // Cache all the controls
        this.matchpasswdControl = this.$('#matchpasswd-control');
        this.fullnameControl = this.$('#fullname-control');
        this.emailControl = this.$('#email-control');
        this.passwdControl = this.$('#password-control');
        this.usernameControl = this.$('#username-control');
        this.creditcardControl = this.$('#creditcard-control');
        this.addressControl = this.$('#address-control');

        // Cache all the form fields errors
        this.matchpasswdError = this.$('#matchpasswd-error');
        this.fullnameError = this.$('#fullnameError');
        this.emailError = this.$('#emailError');
        this.passwdError = this.$('#passwdError');
        this.usernameError = this.$('#usernameError');
        this.creditcardError = this.$('#creditcardError');
        this.addressError = this.$('#addressError');
        
        //if ( !this.$el.html() ){
            // test
        //}
        this.$el.show();
    },
    
    /**
     * Update event
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @return void
     */
    update : function (event){
        // Hide the general form error
        this.updateError.addClass('hide');
        
        // Hide the profile form erros
        this.matchpasswdError.addClass('hide');
        this.fullnameError.addClass('hide');
        this.emailError.addClass('hide');
        this.passwdError.addClass('hide');
        this.usernameError.addClass('hide');
        this.creditcardError.addClass('hide');
        this.addressError.addClass('hide');
        
        event.preventDefault();

        var fullname    = this.fullnameInput.val();
        var email       = this.emailInput.val();
        var password    = this.passwordInput.val();
        var matchpasswd = this.matchpasswdInput.val();
        var username    = this.usernameInput.val();
        var creditcard  = this.creditcardInput.val();
        var address     = this.addressInput.val();
        var view        = this;
        
        var inputArray = [fullname, email, username, creditcard, address];
        var emptyField = false;
        
        for(var i = 0, j = inputArray.length; i < j; i++) {
            if(inputArray[i] == ''){
                this.updateError.find('h4.alert-heading').html(translate('anError'));
                this.updateError.find('p').html(translate('emptyFieldError'));
                this.updateError.removeClass('hide');
                emptyField = true;
                break
            }
        }
        
        // Update model callbacks
        var callbacks = {
            success : function() {
                // Clear the credentials from the inputs
                view.fullnameInput.val('');
                view.emailInput.val('');
                view.passwordInput.val('');
                view.matchpasswdInput.val('');
                view.usernameInput.val('');
                view.creditcardInput.val('');
                view.addressInput.val('');
                
                // Show the loading page and render the dashboard
                nano.utils.goTo( nano.conf.hash.profile );
            },
            error : function(model, error) {
                errorsStr = translate('unknowError');
                if(_.isArray(error)){
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
                
                for (x in error){
                    
                    if (error[x] == 'fullnameError'){
                        view.fullnameError.removeClass('hide');
                        view.fullnameControl.addClass('error');
                    }
                    if (error[x] == 'emailError'){
                        view.emailError.removeClass('hide');
                        view.emailControl.addClass('error');
                    }
                    if (error[x] == 'passwdError'){
                        view.passwdError.removeClass('hide');
                        view.passwdControl.addClass('error');
                    }
                    if (error[x] == 'useridError'){
                        view.usernameError.removeClass('hide');
                        view.usernameControl.addClass('error');
                    }
                    if (error[x] == 'creditcardError'){
                        view.creditcardError.removeClass('hide');
                        view.creditcardControl.addClass('error');
                    }
                    if (error[x] == 'addressError'){
                        view.addressError.removeClass('hide');
                        view.addressControl.addClass('error');
                    }
                };

                view.updateError.find('h4.alert-heading').html(translate('anError'));
                view.updateError.find('p').html(errorsStr);
                view.updateError.removeClass('hide');
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
            
            // Update the account profile attrs
            var attrs = {
                fullname: fullname,
                email: email,
                userid: username,
                creditcard: creditcard,
                address: address
            }
            
            if (password != matchpasswd && password != ''){
                view.matchpasswdError.removeClass('hide');
                view.matchpasswdControl.addClass('error');
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
    },
    
    admin : function(){
        window.location = nano.conf.hash.admin;
    }
});
