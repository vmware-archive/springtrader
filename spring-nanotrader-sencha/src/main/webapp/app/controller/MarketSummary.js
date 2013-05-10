Ext.define('SpringTrader.controller.MarketSummary', {
    extend: 'Ext.app.Controller',
    config: {
        view: ['MarketSummary'],
        stores: ['MarketSummary']
    },
    launch: function() {
        // Start interval timers
        setInterval(function() { Ext.getStore('marketsummary').load()}, 15000);
    }
});
