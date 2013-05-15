Ext.define('SpringTrader.controller.MarketSummary', {
    extend: 'Ext.app.Controller',
    config: {
        view: ['MarketSummary'],
        stores: ['MarketSummary']
    },
    launch: function() {
        this.startPollingMarketSummary();
    },
    startPollingMarketSummary: function() {
        this.marketSummaryPoller = setInterval(function() { Ext.getStore('marketsummary').load()}, 15000);
    },
    stopPollingMarketSummary: function() {
        window.clearInterval(this.marketSummaryPoller);
        this.marketSummaryPoller = undefined;
    }
});
