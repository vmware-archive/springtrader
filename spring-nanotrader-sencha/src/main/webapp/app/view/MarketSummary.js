Ext.define('SpringTrader.view.MarketSummary', {
	extend: 'Ext.dataview.DataView',
	xtype: 'marketsummary',
	config: {
        scrollable: false,
        height: '33%',
        margin: '5 5 5 5',
        itemTpl: [
    '<table class="table table-condensed" id="marketSummary">',
    '<tr><td class="right">Index:</td><td id="ms-index">{[ values.tradeStockIndexAverage.toFixed(2) ]}</td></tr>',
    '<tr><td class="right">Volume:</td><td id="ms-volume">{[ values.tradeStockIndexVolume.toFixed(2) ]}</td></tr>',
    '<tr><td class="right">Change:</td><td id="ms-change">{[ values.change.toFixed(2) ]}</td></tr>',
    '</table>'
        ],
        emptyText: 'No market data',
        loadingText: 'Loading...',
        store: 'marketsummary'
    }
});
