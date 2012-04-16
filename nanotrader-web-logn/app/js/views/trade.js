/**
 * View Class for trade
 * @author Jean Chassoul <jean.chassoul@lognllc.com>
 */
nano.views.Trade = Backbone.View.extend({
    
    /**
     * Bind the events functions to the different HTML elements
     */
    events : {
        'click #sendBtn' : 'send',
    },
    
    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object options:
     * - el: selector for the container
     * @return void
     */
    initialize : function(options) {
        nano.containers.trade = this.$el;
    },

    /**
     * Templating function (inyects data into an HTML Template)
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object data: data to be replaced in the template
     * @return string
     */
    template : _.template(nano.utils.getTemplate(nano.conf.tpls.trade)),
    
    /**
     * Renders the Trade View
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @param Object orders: Instance of nano.models.Orders
     * @return void
     */
    render: function(orders) {
        if (orders) {
            this.orders = orders;
        }
        
        alert(JSON.stringify(this.orders.toJSON()));
        
        this.$el.html(this.template());
        this.$el.show();
        
    },
    
    /**
     * Send event
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @return void
     */
    send : function (event){
        alert('send');
    }
    
});
