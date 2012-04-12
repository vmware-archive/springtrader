/**
 * View Class for the Navbar
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
nano.views.Navbar = Backbone.View.extend({

    /**
     * Bind the events functions to the different HTML elements
     */
    events : {
        'click #logout' : 'logout'
    },

    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object options:
     * - el: selector for the container
     * @return void
     */
    initialize : function(options) {
        nano.containers.navbar = this.$el;
    },

    /**
     * Templating function (inyects data into an HTML Template)
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object data: data to be replaced in the template
     * @return string
     */
    template : _.template(nano.utils.getTemplate(nano.conf.tpls.navbar)),

    /**
     * Renders the Nav Bar View
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @return void
     */
     render : function() {
        if ( !this.$el.html() )
        {
            var data = { 
                username: nano.session.username
            };
            this.$el.html(this.template(data));
            this.$('.dropdown-toggle').dropdown();
        }
        this.$el.show();
    },

    /**
     * Logout event
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @return void
     */
    logout : function() {
        nano.utils.logout();
        nano.utils.goTo( nano.conf.hash.login );
    }
});