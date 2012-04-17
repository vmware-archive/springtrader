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
    render: function(model) {
        if (model) {
            this.model = model;
        }

        // getting the amount of orders
        var orderCount = this.model.length;
        // calculate the number of pages we are going to have
        var pagesCount = Math.ceil(orderCount/nano.conf.itemsPerPage);
        
        
        // navigation options on the paginator:
        var navigation_html = '<ul>';

        //navigation_html += '<li><a id="previous">&laquo;</a></li>';
        var current_link = 0;
        while(pagesCount > current_link){
            navigation_html += '<li class="page_link">';
            navigation_html += '<a href="#trade/p' + current_link + '" id="page">'+ (current_link + 1) +'</a>';
            current_link++;
            navigation_html += '</li>';
        }
        //navigation_html += '<li><a id="next">&raquo;</a></li>';
        navigation_html += '</ul>';
        
        this.$el.html(this.template());
        this.$el.show();
        
        this.$('#pagination').html(navigation_html);
        return this
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
