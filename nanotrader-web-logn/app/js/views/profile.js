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
    //render: function(errorKey) {
    render: function() {
        if ( !this.$el.html() )
        {
            var profile = this.template();
            this.$el.html(profile);
            //alert(JSON.stringify(nano.session));
            //sacar el profile del usuario para completar los campos del profile
            
            // Set the Account Profile model
            this.model = new nano.models.AccountProfile();
            
            
            
            //this.$('#container-page').addClass('profile-page');
            
            //if (errorKey)
            //{
            //    var registrationError = this.$('#registration-error');
            //    registrationError.find('p').html(translate(errorKey));
            //    registrationError.removeClass('hide');
            //}
        }
        this.$el.show();
    },
    
    update : function (){
        alert('click');
    }
    
});
