/**
 * View Class for Registration 
 * @author Jean Chassoul <jean.chassoul@lognllc.com>
 */
nano.views.Registration = Backbone.View.extend({
    
    /**
     * Bind the events functions to the different HTML elements
     */
    events : {
        'click #registrationBtn' : 'registration'
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
            
            var matchpasswdControl = this.$('#matchpasswd-control');
            var matchpasswdError = this.$('#matchpasswd-error');
            
            // TODO: clean
            matchpasswdError.addClass('hide');
            matchpasswdControl.removeClass('error');
            
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
     * Registration event
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @return void
     */
    registration : function(event){
        var inputs = document.getElementsByTagName('input');
        var emptyFields = false;
        
        var matchpasswdControl = this.$('#matchpasswd-control');        
        var matchpasswdError = this.$('#matchpasswd-error');
        var registrationError = this.$('#registration-error');
        
        matchpasswdControl.removeClass('error');
        matchpasswdError.addClass('hide');
        registrationError.addClass('hide');
        
        event.preventDefault();
    
        var fullname = this.$('#fullname-input').val();
        var email = this.$('#email-input').val();
        var password = this.$('#password-input').val();
        var matchpasswd = this.$('#matchpasswd-input').val();
        var userid = this.$('#userid-input').val();
        var openingbalance = this.$('#openingbalance-input').val();
        var creditcard = this.$('#creditcard-input').val();
        var address = this.$('#address-input').val();
        var view = this;
        
        for(var i = 0, j = inputs.length; i < j; i++) {
            if(inputs[i].value == ''){
                registrationError.find('p').html(translate('emptyFieldError'));
                registrationError.removeClass('hide');
                emptyFields = true;
                break
            }
        }
        
        // Set the Account Profile model
        this.model = new nano.models.AccountProfile();
        
        // Registration callbacks
        var callbacks = {
            success : function() {
                nano.utils.login(userid, password, {
                    success : function(jqXHR, textStatus){
                        // Clear the credentials from the inputs
                        view.$('#fullname-input').val('');
                        view.$('#email-input').val('');
                        view.$('#password-input').val('');
                        view.$('#matchpasswd-input').val('');
                        view.$('#userid-input').val('');
                        view.$('#openingbalance-input').val('');
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
            error : function() {
                registrationError.find('p').html(translate('unknowError'));
                registrationError.removeClass('hide');
            }
        };
        
        if (emptyFields == false && password == matchpasswd){
            // Save the new account profile
            this.model.save(
                {
                    fullname: fullname,
                    email: email,
                    passwd: password,
                    userid: userid,
                    accounts : [{openbalance : openingbalance}],
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
});
