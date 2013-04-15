Ext.define('SpringTrader.controller.Main', {
	extend: 'Ext.app.Controller',
	config: {
		views: ['MarketSummary', 'Dashboard', 'Portfolio', 'Trade'],
		stores: ['SpringTrader.store.MarketSummary']
	}
});