/**
 * View Class for the List Of Quotes
 * @author Jean Chassoul <jean.chassoul@lognllc.com>
 */
nano.views.Quotes = Backbone.View.extend({

    /**
     * Bind the events functions to the different HTML elements
     */
    events : {
        'click #modalBtn' : 'buy',
    },

    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object options:
     * - el: selector for the container
     * @return void
     */
    initialize : function(options) {
        nano.containers.qoutes = this.$el;
    },

    /**
     * Templating function (inyects data into an HTML Template)
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object data: data to be replaced in the template
     * @return string
     */
    template : _.template(nano.utils.getTemplate(nano.conf.tpls.quotes)),

    /**
     * Renders the List Of Orders View
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @param nano.models.Orders model: Collection of orderss
     * @param int page: page of the List of Orders to display
     * @return void
     */
    render: function(model) {
        if (model){
            this.model = model;
        }
        var quotes = this.model.toJSON();
        var data = '';
        var symbol = null;
        
        for(var i = 0, j = quotes.length; i < j; i++) {
            data += this.template(quotes[i]);
            if(!symbol){
                symbol = quotes[i].symbol;
            }
        }

        this.symbol = symbol;
        
        this.$el.html(data);
        this.$el.show();
    },
    
    /**
     * Send event
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @return void
     */
    buy : function (event){
        var modal = this.$('#myModal');
        var quantity = this.$('#quantity-input').val();
        
        event.preventDefault();
        
        var model = new nano.models.Order({ accountid : nano.session.accountid });
        
        var callbacks = {
            success : function(data){alert('saved');},
            error   : nano.utils.onApiErreor
        };
        
        model.save({
            quantity : quantity,
            ordertype : 'buy',
            quote : {symbol: this.symbol}
            },
            callbacks
        );        
        
        modal.modal({
            keyboard: false
        });
    }
});
