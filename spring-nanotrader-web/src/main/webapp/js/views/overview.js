/**
 * Overview View
 * @author Jean Chassoul <jean.chassoul@lognllc.com>
 */
nano.views.Overview = Backbone.View.extend({
    
    /**
     * Bind the events functions to the different HTML elements
     */
    events : {
        'click #profile' : 'profile',
        'click #help' : 'help'
    },
    
    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object options:
     * - el: selector for the container
     * @return void
     */
    initialize : function(options) {
        nano.containers.overview = this.$el;
    },

    /**
     * Templating function (inyects data into an HTML Template)
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object data: data to be replaced in the template
     * @return string
     */
    template : _.template(nano.utils.getTemplate(nano.conf.tpls.overview)),
    
    /**
     * Renders the Overview View
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @return void
     */
    render: function() {
        if ( !this.$el.html() )
        {
            this.$el.html(this.template());
        }
        this.$el.show();
    },
    
    profile : function(){
        window.location = nano.conf.hash.profile;
    },
    
    help : function(){
        window.location = nano.conf.hash.help;
    }
});
