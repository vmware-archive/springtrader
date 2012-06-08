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
        'keypress' : 'checkEnter'
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
     * Renders the Trade View
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @param Object orders: Instance of nano.models.Orders
     * @return void
     */
    render: function(model, error) {
        if (model) {
            this.model = model;
        }
        
        if(typeof(Storage)!=="undefined"){
            if(localStorage.getItem('quotes') == null){
                // Put the array into storage
                localStorage.setItem('quotes', JSON.stringify([]));
            }
        
            var quotes = localStorage.getItem('quotes');
            
            var data = {
                quoteLength: JSON.parse(quotes).length,
                quoteItems: quotes
            }
        
        } else {
            var data = {
                quoteLength: null,
                quoteItems: null
            }
        }
        // Parse the storage quotes and render the trade view
        this.$el.html(_.template(nano.utils.getTemplate(nano.conf.tpls.trade))(data));
        this.$el.show();
        if (nano.utils.isMobile()){
        nano.instances.quotes = new nano.views.Quotes({el : '#nc-quotes'});
        }
        // Cache the quote input
        this.quoteInput = this.$('#quote-input');
        // Cache the error control
        this.quoteError = this.$('#quote-error');
    },

    /**
     * check enter key on IE7+
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     */
    checkEnter : function(event) {
        if (event.which == 13) {
            $('#getQuoteBtn').trigger('click');
            return false;
        }
    },
    
    /**
     * Quote event
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @return void
     */
    quote : function (event){
        var quoteError = this.quoteError;
        event.preventDefault();

        var quote = this.quoteInput.val();
        quote = quote.toUpperCase();

        if(quote != '') {
            if (localStorage.quotes){
                // Retrieve the object from storage
                var quotes = localStorage.getItem('quotes');
                // Parse the object
                quotes = JSON.parse(quotes);
                // Check the localStorage array
                if( _.indexOf(quotes, quote) == -1 ){
                    quotes[quotes.length] = quote;
                    localStorage.setItem('quotes', JSON.stringify(quotes));
                }
            }
            //Get a random number from 0 to 99 so that the router will get executed
            var random = Math.floor(Math.random()*100);
            window.location = nano.conf.hash.tradeWithQuote.replace(nano.conf.quoteUrlKey, quote).replace(nano.conf.randomUrlKey, random);
        }
    },

    /**
     * Trade error
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @param error: Boolean
     * @return void
     */
    error : function(error){
        var quoteError = this.quoteError;
        
        if (error){
            quoteError.removeClass('hide');
        } else {
            quoteError.addClass('hide');
        }
    }
    
});
