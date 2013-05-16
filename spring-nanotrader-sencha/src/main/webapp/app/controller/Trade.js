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
            quantityField: { keyup: 'onQuantityKeyUp', clearicontap: 'onQuantityClear' },
            symbolList: { itemtap: 'onSymbolSelect'}
        }
    },

    launch: function () {
        this.originalHeight = '3.5em';
    },

    onToggle: function (segmentedButton, button, isPressed) {
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

    onSearchClear: function () {
        var quotes = Ext.StoreMgr.lookup('quotes');
        quotes.clearFilter(true);

        this.hideSymbolList();
        this.hidePurchaseOrder();
    },

    onSearchKeyUp: function () {
        var quotes = Ext.StoreMgr.lookup('quotes');
        quotes.clearFilter(true);

        if (this.getSearchField().getValue().length > 0) {
            quotes.filter('symbol', this.getSearchField().getValue());
            this.showSymbolList();
        }
    },

    onSymbolSelect: function (view, index, target, record, event) {
        event.stopEvent();
        var symbol = record.get('symbol');
        this.getSearchField().blur().setValue(symbol);
        this.onSearch(this.getSearchField(), null);
    },

    onSearch: function (field, event) {
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
                    me.hideSymbolList();

                    var jsonData = Ext.JSON.decode(response.responseText);
                    me.showPurchaseOrder(jsonData);
                },
                failure: function (response) {
                    me.hidePurchaseOrder();
                    Ext.Msg.alert('Not Found', 'No stock symbol "' + searchValue + '"');
                }
            });
        } else {
            return;
        }
    },

    onBuy: function (button, event) {
        event.stopEvent();
        var order = this.newOrder();
        if (this.validateOrder(order)) {
            var me = this;
            SpringTrader.model.Holding.buy(order, function (response) {
                Ext.Msg.alert('Buy Order', order.quantity + ' shares of "' + order.symbol + '" ordered');
                me.resetBuy();
            }, function (response) {
                Ext.Msg.alert('Fail!', 'Trade failed for "' + order.symbol + '"');
            });
        }
    },

    validateOrder: function (order) {
        if (order.quantity == 0) {
            Ext.Msg.alert('Dude!', 'You gotta buy sumntin!');
            return false;
        }
        return true;
    },

    newOrder: function () {
        return {
            accountid: SpringTrader.user.accountId(),
            symbol: this.getSearchField().getValue(),
            quantity: parseInt(this.getQuantityField().getValue())
        }
    },

    onQuantityKeyUp: function () {
        if (this.getQuantityField().getValue().length > 0) {
            this.getBuyButton().enable();
        } else {
            this.getBuyButton().disable();
        }
    },

    onQuantityClear: function () {
        this.getBuyButton().disable();
    },

    hideSymbolList: function () {
        this.getSymbolList().hide().deselectAll();
        this.getQuoteSearch().setHeight(this.originalHeight);
    },

    showSymbolList: function () {
        this.getSymbolList().show();
        this.getQuoteSearch().setHeight('100%');
    },

    hidePurchaseOrder: function () {
        this.getBuyForm().hide().reset();
        this.onQuantityClear();
        this.getQuoteTable().hide();
    },


    showPurchaseOrder: function (jsonData) {
        this.getQuoteTable().setData(jsonData);
        this.getQuoteTable().show();
        this.getBuyForm().show();
    },

    resetBuy: function () {
        this.getQuoteSearchForm().reset();
        this.onSearchClear();
        this.hidePurchaseOrder();
    }
});