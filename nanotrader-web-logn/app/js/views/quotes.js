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
     * Renders the List Of Quotes View
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @param nano.models.Quotes model: Collection of quotes
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
     * Buy event
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @return void
     */
    buy : function (event){
        var modal = this.$('#myModal');
        var quantity = this.$('#quantity-input').val();
        var orderid = this.$('#orderid');
        var creationdate = this.$('#creationdate');
        var completedate = this.$('#completedate');
        var transfee = this.$('#transfee');
        var symbol = this.$('#symbol');
        var quantityform = this.$('#quantity');
        
        event.preventDefault();
        
        var model = new nano.models.Order({ accountid : nano.session.accountid });
        
        var callbacks = {
            success : function(){
                // orders collection
                orders = new nano.models.Orders({ accountid : nano.session.accountid });
                
                var onFetchSuccess = function() {
                    orders.comparator = function(model){
                        return model.get('orderid');
                    }
                    orders.sort();
                    var last = _.last(orders.toJSON());

                    orderid.html(last.orderid);
                    creationdate.html(last.opendate);
                    completedate.html(last.completiondate);
                    transfee.html(last.orderfee);
                    symbol.html(last.quote.symbol);
                    quantityform.html(quantity);
                    
                    modal.modal({
                        keyboard: false
                    });
                };
                
                orders.fetch({
                    success : onFetchSuccess,
                    error: nano.utils.onApiErreor
                });
            },
            error : nano.utils.onApiErreor
        };
        
        model.save({
            quantity : quantity,
            ordertype : 'buy',
            quote : {symbol: this.symbol}
            },
            callbacks
        );
    }
});
