Ext.define('SpringTrader.controller.Trade', {
    extend: 'Ext.app.Controller',
    requires: ['Ext.MessageBox'],
    config: {
        views: ['Trade', 'BuyShares', 'SellShares', 'Quote', 'QuoteSearch', 'BuyForm'],
        refs: {
            tradeSwitch: 'tradePage #tradeswitch',
            buyShares: 'buyshares',
            sellShares: 'sellshares',
            quoteSearch: 'quotesearch',
            searchField: 'input[name=symbol]',
            quoteTable: 'quote',
            buyForm: 'buyform',
            buyButton: 'buyform #submitButton',
            quantityField: 'input[name=quantity]'
        },
        control: {
            tradeSwitch: { toggle: 'onToggle' },
            quoteSearch: { action: 'onSearch' },
            searchField: { blur: 'onBlur' },
            buyButton: { tap: 'onBuy'},
            quantityField: { keyup: 'onQuantityKeyUp'}

        }
    },

    onToggle: function(segmentedButton, button, isPressed) {
        function showHide(ref, isPressed) {
            var view = views[ref];

            if (view === undefined) {
                return;
            }
            if (isPressed) {
                view.show();
            } else {
                view.hide();
            }
        }

        var views = {
            buy: this.getBuyShares(),
            sell: this.getSellShares()
        };
        showHide(button.getData().ref, isPressed);
    },

    onBlur: function(event) {
        this.onSearch(this.getSearchField(), event);
    },

    onSearch: function(field, event) {
        var me = this;
        event.stopEvent();
        var searchValue = field.getValue();
        if (searchValue) {
            Ext.Ajax.request({
                url: '/spring-nanotrader-services/api/quote/' + searchValue,
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'API_TOKEN': SpringTrader.user.get('authToken')},
                disableCaching: false,
                success: function (response) {
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
        Ext.Ajax.request({
            url: '/spring-nanotrader-services/api/account/'+ order.accountid +'/order/asynch',
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'API_TOKEN': SpringTrader.user.get('authToken')},
            disableCaching: false,
            jsonData: {
                accountid: order.accountid,
                ordertype: "buy",
                quantity: order.quantity,
                quote: {
                    symbol: order.symbol
                }
            },
            disableCaching: false,
            success: function (response) {
                Ext.Msg.alert('Buy Order', order.quantity + ' shares of "'+ order.symbol +'" ordered');
                order.searchForm.reset();
                order.buyForm.reset().hide();
                order.quoteTable.hide();
            },
            failure: function (response) {
                Ext.Msg.alert('Fail!', 'Trade failed for "'+ order.symbol +'"');
            }
        });
    },
    
    newOrder: function() {
        return {
            accountid: SpringTrader.user.accountId(),
            buyForm: this.getBuyForm(),
            searchForm: this.getQuoteSearch(),
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