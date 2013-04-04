Ext.define('SpringTrader.controller.Main', {
	extend: 'Ext.app.Controller',
	init: function() {
		console.log('Inited');
	},
	config: {
		views: ['Dashboard', 'Portfolio', 'Trade', 'MarketSummary'],
		models: ['MarketSummary']
	}
})