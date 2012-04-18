/**
 * View Class for the List Of Orders
 * @author Jean Chassoul <jean.chassoul@lognllc.com>
 */
nano.views.Orders = Backbone.View.extend({

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
        nano.containers.orders = this.$el;
    },

    /**
     * Templating function (inyects data into an HTML Template)
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object data: data to be replaced in the template
     * @return string
     */
    template : _.template(nano.utils.getTemplate(nano.conf.tpls.orders)),

    /**
     * Renders the List Of Orders View
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @param nano.models.Orders model: Collection of orderss
     * @param int page: page of the List of Orders to display
     * @return void
     */
    render: function(model, page) {
        if (isNaN(page)){
            page = 0;
        }
        this.page = page;

        if (model){
            this.model = model;
        }
        
        var start_from = this.page * nano.conf.itemsPerPage;
        var end_on = start_from + nano.conf.itemsPerPage;        
        
        var orders = this.model.toJSON().slice(start_from, end_on);
        var data = '';

        for(var i = 0, j = orders.length; i < j; i++) {
            data += this.template(orders[i]);
        }
        
        this.$el.html(data);
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
