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
        'click #helpBtn' : 'help'
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
     * Renders the Account Summary View
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @return void
     */
    render: function() {
            var footer = _.template(nano.utils.getTemplate(nano.conf.tpls.footer))();
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
        window.location = nano.conf.hash.help;
    }
});
