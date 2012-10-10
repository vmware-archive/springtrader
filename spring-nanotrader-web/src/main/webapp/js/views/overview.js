/**
 * Overview View
 * @author Jean Chassoul <jean.chassoul>
 * @author Kashyap Parikh
 */
nano.views.Overview = Backbone.View.extend({
    
    /**
     * Bind the events functions to the different HTML elements
     */
    events : {
        'click #profile' : 'profile',
        'click #help' : 'help',
        'click #admin' : 'admin'
    },
    
    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto>
     * @param Object options:
     * - el: selector for the container
     * @return void
     */
    initialize : function(options) {
        nano.containers.overview = this.$el;
    },

    /**
     * Renders the Overview View
     * @author Jean Chassoul <jean.chassoul>
     * @return void
     */
    render: function() {
        if ( !this.$el.html() )
        {
            this.$el.html(_.template(nano.utils.getTemplate(nano.conf.tpls.overview))());
        }
        this.$el.show();
    },
    
    profile : function(){
        window.location = nano.conf.hash.profile;
    },
    
    help : function(){
        window.location = nano.conf.hash.help;
    },

    admin : function(){
        window.location = nano.conf.hash.admin;
    }

});
