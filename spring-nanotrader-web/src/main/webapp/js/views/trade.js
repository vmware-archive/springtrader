/**
 * View Class for trade
 * @author Jean Chassoul <jean.chassoul@lognllc.com>
 */
nano.views.Trade = Backbone.View.extend({
    
    /**
     * Bind the events functions to the different HTML elements
     */
    events : {
        'click #getQuoteBtn' : 'quote',
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
    render: function(model, error) {
        if (model) {
            this.model = model;
        }
        
        this.$el.html(this.template());
        this.$el.show();
    },
    
    /**
     * Quote event
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @return void
     */
    quote : function (event){
        var quoteError = this.$('#quote-error');
        event.preventDefault();
        
        var quote = this.$('#quote-input').val();
        quote = quote.toUpperCase();
        
        window.location = nano.conf.hash.tradeWithQuote.replace(nano.conf.quoteUrlKey, quote);
    },
    
    error : function(error){
        var quoteError = this.$('#quote-error');
        
        if (error){
            quoteError.removeClass('hide');
        } else {
            quoteError.addClass('hide');
        }
    }
    
});
