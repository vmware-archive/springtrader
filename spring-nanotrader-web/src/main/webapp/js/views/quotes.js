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
        'keypress [type=number]' : 'checkEnter'
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
            this.$el.html(_.template(nano.utils.getTemplate(nano.conf.tpls.quotes))());
            this.tbody = this.$('#list-of-quotes > tbody');
        } else {
            var quoteResult = this.$('#quote-result');
            quoteResult.addClass('hide');
        }
        
        this.$el.show();

        // Render the quote result
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
        
        var data = {
            symbol: this.model.get('symbol'),
            price: this.model.get('price')
        };
        
        this.tbody.append(_.template(nano.utils.getTemplate(nano.conf.tpls.quoteRow))(data));
        this.model = null;
        quoteResult.removeClass('hide');
    },

    checkEnter : function(event) {
      if (event.which == 13) {
        $('#buyBtn').trigger('click');
        return true;
      }
      else {
        return nano.utils.validateNumber(event);
      }
    },

    /**
     * Validates that the input can only receive digits
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @return boolean
     */
    validateNumber : function(event){
        return nano.utils.validateNumber(event);
    },

    /**
     * Buy event
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @return void
     */
    buy : function (event) {
        var quantity = this.$('#quantity-input').val();
        var view = this;
        
        var onSuccess = function(model){
            nano.instances.router.trade(view.page);
            var popup = $( _.template(nano.utils.getTemplate(nano.conf.tpls.quoteModal))(model.toJSON()) );
            popup.modal();
            view.$el.empty();
            nano.instances.router.trade(view.page);
        };

        var order = new nano.models.Order({ accountid : nano.session.accountid });
        order.save({
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
