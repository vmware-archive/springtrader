Ext.define('SpringTrader.view.MarketSummary', {
	extend: 'Ext.dataview.DataView',
	xtype: 'marketsummary',
	config: {
        title: 'Market Summary',
        itemTpl: '<div id="test"> XXX {name} XXX </div>',
        emptyText: 'Market Summary EMPTY',
        //loadingText: 'Loading...',
        store: 'marketsummary'
    }
});
