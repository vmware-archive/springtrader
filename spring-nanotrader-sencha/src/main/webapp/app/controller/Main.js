Ext.define('SpringTrader.controller.Main', {
	extend: 'Ext.app.Controller',
	init: function() {
	},
	config: {
		views: ['Dashboard', 'Portfolio', 'Trade', 'MarketSummary'],
		models: ['MarketSummary'],
		refs : {
			marketSummary: '#market-summary'
		}
	}
})