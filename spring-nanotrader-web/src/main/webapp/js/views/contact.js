/**
 * View Class for Contact
 * @author Jean Chassoul <jean.chassoul@lognllc.com>
 */
nano.views.Contact = Backbone.View.extend({
    
    /**
     * Bind the events functions to the different HTML elements
     */
    events : {
        'click #sendBtn' : 'send',
        'click #showLoginBtn' : 'login'
    },
    
    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object options:
     * - el: selector for the container
     * @return void
     */
    initialize : function(options) {
        nano.containers.contact = this.$el;
    },

    /**
     * Renders the Contact View
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @param mixed errorKey: Name of an error key from nano.strings to be displayed. It can be null (no error show on render)
     * @return void
     */
    render: function() {

        if ( !this.$el.html() )
        {
            var contact = _.template(nano.utils.getTemplate(nano.conf.tpls.contact))();
            this.$el.html(contact);
        }
        this.$el.show();
    },
    
    /**
     * Send event
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @return void
     */
    send : function (event){
        var contactError = this.$('#contact-error');
        contactError.addClass('hide');
        
        event.preventDefault();
        
        var name = this.$('#name-input').val();
        var email = this.$('#email-input').val();
        var phone = this.$('#phone-input').val();
        var message = this.$('#message-input').val();
        var view = this;
        
        var inputArray = [name, email, phone, message];
        var emptyField = false;
        
        for(var i = 0, j = inputArray.length; i < j; i++) {
            if(inputArray[i] == ''){
                contactError.find('p').html(translate('emptyFieldError'));
                contactError.removeClass('hide');
                emptyField = true;
                break
            }
        }
        
        // Update model callbacks
        var callbacks = {
            success : function() {
                view.$('#name-input').val('');
                view.$('#email-input').val('');
                view.$('#phone-input').val('');
                view.$('#message-input').val('');
                // Show the loading page and render the dashboard
                nano.utils.goTo( nano.conf.hash.dashboard );
            },
            error : function() {
                updateError.find('p').html(translate('unknowError'));
                updateError.removeClass('hide');
            }
        };
        
        alert('Missing API Call!');
        
        //if (emptyField == false){
        //    // Save the new contact message
        //    this.model.save(
        //        {
        //            name: name,
        //            email: email,
        //            phone: phone,
        //            message: message
        //        },
        //        callbacks
        //    );
        //}
    },
    
    login : function (){
        window.location = nano.conf.hash.login;
    }
    
});
