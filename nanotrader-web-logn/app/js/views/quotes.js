/**
 * View Class for the List Of Quotes
 * @author Jean Chassoul <jean.chassoul@lognllc.com>
 */
nano.views.Quotes = Backbone.View.extend({

    /**
     * Bind the events functions to the different HTML elements
     */
    events : {
        'click #buyBtn' : 'buy',
    },

    /**
     * Class constructor
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @param Object options:
     * - el: selector for the container
     * @return void
     */
    initialize : function(options) {
        nano.containers.quotes = this.$el;
    },

    /**
     * Templating function (inyects data into an HTML Template)
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @param Object data: data to be replaced in the template
     * @return string
     */
    template : _.template(nano.utils.getTemplate(nano.conf.tpls.quotes)),

    /**
     * Templating function for the rows in the List of Orders
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @param Object data: data to be replaced in the template
     * @return string
     */
    rowTemplate : _.template(nano.utils.getTemplate(nano.conf.tpls.quoteRow)),
    
    /**
     * Templating function for the buy confirmation modal
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @param Object data: data to be replaced in the template
     * @return string
     */
    modalTemplate : _.template(nano.utils.getTemplate(nano.conf.tpls.quoteModal)),

    /**
     * Renders the List Of Quotes View
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @param nano.models.Quotes model: Collection of quotes
     * @return void
     */
    render: function(model, symbol) {
        if (model){
            this.model = model;
        }
        
        if (symbol){
            this.symbol = symbol;
        }
        
        // Render the List of Orders container
        if ( !this.$el.html() ){
            this.$el.html(this.template());
            this.tbody = this.$('#list-of-quotes > tbody');
        } else {
            var quoteResult = this.$('#quote-result');
            quoteResult.addClass('hide');
        }
        
        this.$el.show();

        // Render the list
        if(this.model){
            this.renderRows();
        }
    },
    
    /**
     * Renders the List of orders into the View
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @param int page: page of the List of Orders to display
     * @return void
     */
    renderRows: function() {
        var quoteResult = this.$('#quote-result');
        this.tbody.html('');
        for(var i = 0, j = this.model.length; i < j; i++) {
            this.tbody.append(this.rowTemplate(_.extend(this.model.at(i).toJSON(), {i:i})));
        }
        this.model = null;
        quoteResult.removeClass('hide');
    },
    
    /**
     * Buy event
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @return void
     */
    buy : function (event){
        tpl = this.modalTemplate;
        var quantity = this.$('#quantity-input').val();
        var model = new nano.models.Order({ accountid : nano.session.accountid });
        var view = this;
        
        var onSuccess = function(){
            // orders collection
            orders = new nano.models.Orders({ accountid : nano.session.accountid });
            
            var onFetchSuccess = function() {
                orders.comparator = function(model){
                    return model.get('orderid');
                }
                orders.sort();
                var last = _.last(orders.toJSON());
                last.orderQuantity = quantity;

                var popup = $( tpl(last) );
                popup.modal();
                view.$el.html('');
                nano.instances.router.trade(view.page);
            };
                
            orders.fetch({
                success : onFetchSuccess,
                error: nano.utils.onApiErreor
            });
        };
        
        model.save({
            quantity : quantity,
            ordertype : 'buy',
            quote : {symbol: this.symbol}
            },
            {
                success: onSuccess, 
                error: nano.utils.onApiErreor
            }
        );
    }
});
