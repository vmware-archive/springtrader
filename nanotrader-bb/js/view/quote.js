// The full view of the quote area, including both the prompt
// for a quote and the list of resulting quotes.
FullQuoteView = Backbone.View.extend({
    tagName : "div",

    events : {
        "submit #quoteForm" : "handleQuoteForm",
        "click .quote_buy" : "handleOrderForm"
    },
    changed : function(evt) {
        var changed = evt.currentTarget;
        var value = $("#" + changed.id).val();
        var obj = "{\"symbol\":\"" + value + "\"}";
        var objInst = JSON.parse(obj);
        this.model.set(objInst);
    },

    initialize : function(myid) {
        this.quoteprompttemplate = _.template(tpl.get('quote-prompt'));
        this.quotelisttemplate = _.template(tpl.get('quote-list'));

        if (!this.quoteCollection) {
            this.quoteCollection = new QuoteCollection();
        }
    },

    handleQuoteForm : function(data) {
        // User has input a stock symbol. Store the stock symbol into the model,
        // which will force a re-render displaying the value of the stock.
        var inputsymbols = $("#input-stocksymbol").val();
        this.quoteCollection.findBySymbols(inputsymbols);
        this.render(); // Should not be necessary
    },
    
    handleOrderForm : function(event) {
      var click_id = event.target.id;
      // Extract the ID of the stock ordered from the event target id,
      // then get the corresponding quantity
      var quote_id = click_id.replace("quote_buy_","");
      var qty = $("#order_qty_"+quote_id).val();
      if (qty > 0) {
          // User has requested a stock purchase
          alert("FIX_ME: stock purchase not implemented yet");
      }
      
    },

    render : function() {
        $(this.el).html(this.quoteprompttemplate);
        // render the list of stock quotes only if we have at least one
        if (this.quoteCollection.length > 0) {
            // Add the table header
            $(this.el).append(this.quotelisttemplate);
            // For each quote, create and display a quoteView
            var self = this;
            _.each(this.quoteCollection.models, function(quote) {
                console.log("quote url is: "+quote.url());
                // FIX_ME: insertion is not nesting properly inside the table
                var quoteView = new QuoteView(quote.attributes);
                $(quoteView.el).html(quoteView.template(quote.toJSON()));
                // $('#quote-table tr:last', this.el).after(quoteView.el);
                $('#quote-table', this.el).append(quoteView.el);
                // $(this.el).append(quoteView.el)
            }, this);
        }
        return this;
    }
});

// View of a SINGLE quote
QuoteView = Backbone.View.extend({

    tagName : "div", // WRONG? forces creation of a div that merges table
    // cells?

    initialize : function(quoteattrs) {
        this.template = _.template(tpl.get('quote-row'));
        this.model = new Quote(quoteattrs);
        // Every change to the model should trigger a re-render
        // this.model.bind('change', this.render, this);
        // this.model.fetch();
    },
});

QuoteListView = Backbone.View.extend({
    tagName : 'div',
    initialize : function() {
        this.template = _.template(tpl.get('quote-list'));
    },
});
