/**
 * View class for the Footer
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
nano.views.Footer = Backbone.View.extend({
    
    /**
     * Bind the events functions to the different HTML elements
     */
    events : {
        'click #contactUsBtn' : 'contact',
        'click #helpBtn' : 'help',
        'click #logoutBtn' : 'logout'
    },
    
    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object options:
     * - el: selector for the container
     * @return void
     */
    initialize : function(options) {
        nano.containers.footer = this.$el;
    },

    /**
     * Templating function (inyects data into an HTML Template)
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object data: data to be replaced in the template
     * @return string
     */
    template : _.template(nano.utils.getTemplate(nano.conf.tpls.footer)),

    /**
     * Renders the Account Summary View
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @return void
     */
    render: function() {
            var footer = this.template();
            this.$el.html(footer);
    },

    /**
     * Contact link click event
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @return void
     */
    contact: function() {
        window.location = nano.conf.hash.contact;
    },

    /**
     * Help link click event
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @return void
     */
    help: function() {
        alert('goto -> help');
    },

    /**
     * Logout Click Event
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @return void
     */
    logout : function() {
        nano.utils.logout();
        nano.utils.goTo( nano.conf.hash.login );
    }
});
