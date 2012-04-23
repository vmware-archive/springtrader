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
            var data = this.model.toJSON()
            data.creditcard = '************' + data.creditcard.slice(12,16);
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
        var matchpasswdControl = this.$('#matchpasswd-control');        
        var matchpasswdError = this.$('#matchpasswd-error');
        var updateError = this.$('#update-error');
        
        matchpasswdControl.removeClass('error');
        matchpasswdError.addClass('hide');
        updateError.addClass('hide');
        
        event.preventDefault();
        
        var fullname = this.$('#fullname-input').val();
        var email = this.$('#email-input').val();
        var password = this.$('#password-input').val();
        var matchpasswd = this.$('#matchpasswd-input').val();
        var username = this.$('#username-input').val();
        var creditcard = this.$('#creditcard-input').val();
        var address = this.$('#address-input').val();
        var view = this;
        
        var inputArray = [fullname, email, password, matchpasswd, username, creditcard, address];
        var emptyField = false;
        
        for(var i = 0, j = inputArray.length; i < j; i++) {
            if(inputArray[i] == ''){
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
                // Show the loading page and render the dashboard
                nano.utils.goTo( nano.conf.hash.dashboard );
            },
            error : function() {
                updateError.find('p').html(translate('unknowError'));
                updateError.removeClass('hide');
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
    }
    
});
