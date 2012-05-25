/**
 * View Class for the Left Navbar
 * @author Jean Chassoul <jean.chassoul@lognllc.com>
 */
nano.views.Leftnavbar = Backbone.View.extend({

    /**
     * Bind the events functions to the different HTML elements
     */
    events : {
        'click #lnb-profile' : 'profile',
        'click #lnb-overview' : 'overview',
        'click #lnb-admin' : 'admin',
        'click #lnb-help' : 'help'
    },

    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @author Jean Chassoul <jean.chassooul@lognllc.com>
     * @param Object options:
     * - el: selector for the container
     * @return void
     */
    initialize : function(options) {
        nano.containers.leftnavbar = this.$el;
    },

    /**
     * Renders the Left Nav Bar View
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @return void
     */
     render : function(data) {

        if (!data){
            var data = {
                fullname : false,
                email : false
            }
        }
        
        this.$el.html(_.template(nano.utils.getTemplate(nano.conf.tpls.leftnavbar))(data));
        
        this.$el.show();
    },
    
    /**
     * Profile Click Event
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @return void
     */
    profile : function() {
        nano.utils.goTo( nano.conf.hash.profile );
    },

    /**
     * Overview Click Event
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @return void
     */
    overview : function() {
        nano.utils.goTo( nano.conf.hash.overview );
    },
    
    /**
     * Help Click Event
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @return void
     */
    help : function() {
        nano.utils.goTo( nano.conf.hash.help );
    },

    /**
     * Admin Click Event
     * @return void
     */
    admin : function() {
        nano.utils.goTo( nano.conf.hash.admin );
    }
});
