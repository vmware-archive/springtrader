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

    initialize : function(accountid) {
        this.quoteprompttemplate = _.template(tpl.get('quote-prompt'));
        this.quotelisttemplate = _.template(tpl.get('quote-list'));
        this.accountid = accountid;

        if (!this.quoteCollection) {
            this.quoteCollection = new QuoteCollection();
        }
    },

    handleQuoteForm : function(data) {
        // User has input a stock symbol. Store the stock symbol into the model,
        // which will force a re-render displaying the value of the stock.
        var inputsymbols = $("#input-stocksymbol").val().toUpperCase();
        this.quoteCollection.findBySymbols(inputsymbols);
        this.render(); // Should not be necessary
    },
    
    handleOrderForm : function(event) {
      var click_id = event.target.id;
      // Extract the ID of the stock ordered from the event target id,
      // then get the corresponding quantity
      var quoteid = click_id.replace("quote_buy_","");
      var qty = parseInt($("#order_qty_"+quoteid).val());
      var symbol = $("#symbol_"+quoteid).val().toUpperCase();
      if (qty > 0) {
          // User has requested a stock purchase
          console.log("About to buy " + qty + " shares of " + symbol + " id: " + quoteid);
          var quote = new Quote({symbol : symbol});
          var order = new Order(
                  {quantity : qty,
                   ordertype : 'buy',
                   quote : quote});
          order.url = 'spring-nanotrader-services/api/account/' + this.accountid + '/order';
          
          order.save(undefined, {
              success : function(model, resp) {
                  console.log("successfully requested stock purchase");
                  $('#buy_result').append('<div id="showsuccess"<b> Successfully requested stock purchase</b></div>');
                  $('#showsuccess').fadeOut(5000, function() {
                      $('#showsuccess').remove();
                  });
              },
              error : function(model, resp) {
                  console.log("unable to process order");
                  $('#buy_result').append('<div id="showerror"<b> Failed! </b>' + resp.responseText + '</div>');
                  $('#showerror').fadeOut(10000, function() {
                      $('#showerror').remove();
                  });
              }
          });
    
          
      }
      
    },

    render : function() {
        $(this.el).html(this.quoteprompttemplate({"accountid" : this.accountid}));
        // render the list of stock quotes only if we have at least one
        if (this.quoteCollection.length > 0) {
            // Add the table header
            $(this.el).append(this.quotelisttemplate({"accountid" : this.accountid}));
            // For each quote, create and display a quoteView
            var self = this;
            _.each(this.quoteCollection.models, function(quote) {
                var quoteView = new QuoteView(quote.attributes);
                $(quoteView.el).html(quoteView.template(quote.toJSON()));
                $('#quote-table', this.el).append(quoteView.el);
            }, this);
        }
        return this;
    }
});

// View of a SINGLE quote
QuoteView = Backbone.View.extend({

    tagName : "tr",

    initialize : function(quoteattrs) {
        this.template = _.template(tpl.get('quote-row'));
        this.model = new Quote(quoteattrs);
        // Every change to the model should trigger a re-render
        // this.model.bind('change', this.render, this);
        // this.model.fetch();
    },
});

QuoteListView = Backbone.View.extend({
    tagName : 'table',
    attributes : {'class' : 'table table-bordered'},
    initialize : function() {
        this.template = _.template(tpl.get('quote-list'));
    },
});
