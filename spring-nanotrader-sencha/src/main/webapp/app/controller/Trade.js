Ext.define('SpringTrader.controller.Trade', {
    extend: 'Ext.app.Controller',
    requires: ['Ext.MessageBox'],
    mixins: ['SpringTrader.mixin.SegmentedButtonSupport'],
    config: {
        views: ['Trade', 'BuyShares', 'PortfolioHoldings', 'Quote', 'QuoteSearch', 'BuyForm'],
        refs: {
            tradeSwitch: 'tradePage #tradeswitch',
            buyShares: 'buyshares',
            portfolioHoldings: 'tradePage portfolioholdings',
            quoteSearch: 'quotesearch',
            quoteSearchForm: 'quotesearch formpanel',
            searchField: 'input[name=symbol]',
            quoteTable: 'quote',
            buyForm: 'buyform',
            buyButton: 'buyform #submitButton',
            quantityField: 'input[name=quantity]',
            symbolList: 'symbollist'
        },
        control: {
            tradeSwitch: { toggle: 'onToggle' },
            quoteSearch: { action: 'onSearch' },
            searchField: { keyup: 'onSearchKeyUp', clearicontap: 'onSearchClear' },
            buyButton: { tap: 'onBuy'},
            quantityField: { keyup: 'onQuantityKeyUp'},
            symbolList: { itemtap: 'onSymbolSelect'}
        }
    },

    onToggle: function(segmentedButton, button, isPressed) {
        var views = {
            buy: this.getBuyShares(),
            sell: this.getPortfolioHoldings()
        }, stores = {
            buy: null,
            sell: 'holdinglist'
        };

        this.showHide(button.getData().ref, isPressed, views);
        this.refreshStore(button.getData().ref, isPressed, stores);
    },

    onSearchClear: function() {
        var quotes = Ext.StoreMgr.lookup('quotes');
        quotes.clearFilter(true);

        this.getSymbolList().hide();
        this.getQuoteSearch().setHeight(this.getQuoteSearch().originalHeight);

        this.getQuoteTable().hide();
        this.getBuyForm().hide();
    },

    onSearchKeyUp: function() {
        var quotes = Ext.StoreMgr.lookup('quotes');
        quotes.clearFilter(true);

        if (this.getSearchField().getValue().length > 0) {
            quotes.filter('symbol', this.getSearchField().getValue());
            this.getSymbolList().show();
            this.getQuoteSearch().originalHeight = this.getQuoteSearch().getHeight();
            this.getQuoteSearch().setHeight('100%');
        }
    },

    onSymbolSelect: function(view, index, target, record, event) {
        event.stopEvent();
        var symbol = record.get('symbol');
        this.getSearchField().blur().setValue(symbol);
        this.onSearch(this.getSearchField(), null);
        this.getSymbolList().deselectAll();
    },

    onSearch: function(field, event) {
        var me = this;
        event && event.stopEvent();
        var searchValue = field.getValue();
        if (searchValue) {
            Ext.Ajax.request({
                url: '/spring-nanotrader-services/api/quote/' + searchValue,
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'API_TOKEN': SpringTrader.user.get('authToken')},
                disableCaching: false,
                success: function (response) {
                    me.getSymbolList().hide();
                    me.getQuoteSearch().setHeight(me.getQuoteSearch().originalHeight);

                    var jsonData = Ext.JSON.decode(response.responseText);
                    me.getQuoteTable().setData(jsonData);
                    me.getQuoteTable().show();
                    me.getBuyForm().show();
                },
                failure: function (response) {
                    me.getQuoteTable().hide();
                    me.getBuyForm().hide();
                    Ext.Msg.alert('Not Found', 'No stock symbol "'+ searchValue +'"');
                }
            });
        } else {
            return;
        }
    },

    onBuy: function(button, event){
        event.stopEvent();
        var order = this.newOrder();
        SpringTrader.model.Holding.buy(order, function (response) {
            Ext.Msg.alert('Buy Order', order.quantity + ' shares of "'+ order.symbol +'" ordered');
            order.searchForm.reset();
            order.buyForm.reset().hide();
            order.quoteTable.hide();
        }, function (response) {
            Ext.Msg.alert('Fail!', 'Trade failed for "'+ order.symbol +'"');
        });
    },
    
    newOrder: function() {
        return {
            accountid: SpringTrader.user.accountId(),
            buyForm: this.getBuyForm(),
            searchForm: this.getQuoteSearchForm(),
            quoteTable: this.getQuoteTable(),
            symbol: this.getSearchField().getValue(),
            quantity: parseInt(this.getQuantityField().getValue())
        }
    },

    onQuantityKeyUp: function() {
        if (this.getQuantityField().getValue().length > 0) {
            this.getBuyButton().enable();
        } else {
            this.getBuyButton().disable();
        }
    }
});