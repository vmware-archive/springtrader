/**
 * View Class for the List Of Quotes
 * @author Jean Chassoul <jean.chassoul>
 * @author Kashyap Parikh
 */
nano.views.Quotes = Backbone.View.extend({
    /**
     * Bind the events functions to the different HTML elements
     */
    events: {
        'click #buyBtn': 'buy',
        'keypress [type=number]': 'checkEnter',
        'click #getQuoteBtn': 'getQuote'
    },

    /**
     * Class constructor
     * @author Jean Chassoul <jean.chassoul>
     * @param Object options:
     * - el: selector for the container
     * @return void
     */
    initialize: function (options) {
        nano.containers.quotes = this.$el;
    },

    /**
     * Renders the List Of Quotes View
     * @author Jean Chassoul <jean.chassoul>
     * @param nano.models.Quotes model: Quote model
     * @return void
     */
    render: function (model) {
        'use strict';
        var data = {
            quoteLength: null,
            quoteItems: null
        },
        quotes;
        
        if (typeof(Storage) !== "undefined") {
            if (localStorage.getItem('quotes') === null) {
                // Put the array into storage
                localStorage.setItem('quotes', JSON.stringify([]));
            }        
            quotes = localStorage.getItem('quotes');            
            data = {
                quoteLength: JSON.parse(quotes).length,
                quoteItems: quotes
            }
        }

        this.$el.html(_.template(nano.utils.getTemplate(nano.conf.tpls.quotes))(data));
        this.$el.show();
        this.qrtbody = this.$('#list-of-quotes > tbody');
        this.quoteInput = this.$('#quote-input');
        this.quoteError = this.$('#quote-error');
        this.quoteResult = this.$('#quote-result');        
        this.symbol = model? model.get('symbol') : '';
        
        if (model) {
            this.renderQuote(model);
        }
    },
    
    /**
     * Renders the Quote in the View
     * @author Jean Chassoul <jean.chassoul>
     * @param int page: page of the List of Orders to display
     * @return void
     */
    renderQuote: function (model) {
        'use strict';               
        this.qrtbody.html(_.template(nano.utils.getTemplate(nano.conf.tpls.quoteRow))(model.toJSON()));
        this.quoteResult.removeClass('hide');
    },

    checkEnter: function (event) {
        'use strict';
        if (event.which === 13) {
          $('#buyBtn').trigger('click');
          return true;
        } else {
          return nano.utils.validateNumber(event);
        }
    },

    /**
     * Buy event
     * @return void
     */
    buy: function (event) {
        'use strict';
        var quantity = this.$('#quantity-input').val(),
            order = new nano.models.Order({ accountid : nano.session.accountid });
        order.save({
            quantity: parseInt(quantity),
            ordertype: 'buy',
            quote: {symbol: this.symbol}
        },
        {
            success: _.bind(function (model) {
                var popup = $(_.template(nano.utils.getTemplate(nano.conf.tpls.quoteModal))(model.toJSON()));
                popup.modal();
                nano.instances.router.trade(this.page);
            }, this), 
            error: _.bind(function (model, error) {
                var x,
                    errorStr = translate('unknowError');
                if (_.isArray(error)) {
                    errorStr = '';
                    for (x in error) {
                        errorStr += translate(error[x]) + '<br>';
                        switch (error[x]) {
                            case 'quantityError':
                                this.buyError(true);
                                break;
                            default:
                                alert('An unknown error has ocurred.');
                                break;
                        }
                    }
                }
            }, this)
        });
    },

    /**
     * Quotes error
     * @author Jean Chassoul <jean.chassoul>
     * @param error: Boolean
     * @return void
     */
    buyError : function (error) {
        'use strict';
        if (error){
            this.$('#buy-error').removeClass('hide');
        } else {
            this.$('#buy-error').addClass('hide');
        }
    },
    
    /**
     * Trade error
     * @param error: Boolean
     * @return void
     */
    quoteErrorMsg : function (error) {
        'use strict';
        if (error) {
            this.quoteError.removeClass('hide');
        } else {
            this.quoteError.addClass('hide');
        }
    },
    
    /**
     * Fetches the quote input by the user
     * @author Carlos Soto
     * @return void
     */
    getQuote : function (evt) {
        'use strict';
        evt.preventDefault();
        var symbol = this.quoteInput.val().toUpperCase(),
            quotes,
            model;

        if(symbol !== '') {
            
            // fetch the Quote (if there's any) and render it
            model = new nano.models.Quote({ quoteid : symbol });
            model.fetch({
                success: _.bind(function () {
                    if (localStorage.quotes) {
                        // Retrieve the object from storage and parse it
                        quotes = JSON.parse(localStorage.getItem('quotes'));
                        
                        // Check the localStorage array
                        if (_.indexOf(quotes, symbol) === -1) {
                            quotes[quotes.length] = symbol;
                            localStorage.setItem('quotes', JSON.stringify(quotes));
                        }
                    }
                    
                    // Change the url with the Trade Quote, store the symbol, hide the quote error
                    // message and render the quote in the results table
                    nano.instances.router.navigate(nano.conf.hash.tradeWithQuote.replace(nano.conf.quoteUrlKey, symbol), false);
                    this.symbol = symbol;
                    this.quoteErrorMsg(false);
                    this.renderQuote(model);        
                }, this),
                error: _.bind(function () {
                    this.quoteErrorMsg(true);
                }, this)
            });
        }
    }
});