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
            buyForm: 'buyform'
        },
        control: {
            tradeSwitch: { toggle: 'onToggle' },
            quoteSearch: { action: 'onSearch' },
            searchField: { blur: 'onBlur' }

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
        if (field.getValue()) {
            var url = '/spring-nanotrader-services/api/quote/' + field.getValue();
            Ext.Ajax.request({
                url: url,
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
                    Ext.Msg.alert('Not Found', 'No stock symbol "'+ field.getValue() +'"');
                }
            });
        } else {
            return;
        }
    }
});