Ext.define('SpringTrader.controller.Trade', {
    extend: 'Ext.app.Controller',
    config: {
        views: ['Trade', 'BuyShares', 'SellShares', 'Quote', 'QuoteSearch', 'BuyForm'],
        refs: {
            tradeSwitch: 'tradePage #tradeswitch',
            buyShares: 'buyshares',
            sellShares: 'sellshares'
        },
        control: {
            tradeSwitch: { toggle: 'onToggle' }
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
    }
});