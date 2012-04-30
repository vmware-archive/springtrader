/**
 * Help View
 * @author Jean Chassoul <jean.chassoul@lognllc.com>
 */
nano.views.Help = Backbone.View.extend({
    
    /**
     * Bind the events functions to the different HTML elements
     */
    events : {
        'click #profile' : 'profile',
        'click #overview' : 'overview',
        'click #admin' : 'admin'        
    },
    
    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object options:
     * - el: selector for the container
     * @return void
     */
    initialize : function(options) {
        nano.containers.help = this.$el;
    },

    /**
     * Templating function (inyects data into an HTML Template)
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object data: data to be replaced in the template
     * @return string
     */
    template : _.template(nano.utils.getTemplate(nano.conf.tpls.help)),
    
    /**
     * Renders the Help View
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
    
    overview : function(){
        window.location = nano.conf.hash.overview;
    },

    admin : function(){
        window.location = nano.conf.hash.admin;
    }
});
