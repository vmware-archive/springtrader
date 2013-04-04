/*
 * File: app/model/MarketSummary.js
 *
 */

Ext.define('SpringTrader.model.MarketSummary', {
	extend: 'Ext.data.Model',

	config: {
		fields: ['tradeStockIndexAverage', 'tradeStockIndexVolume', 'change'],
		proxy: {
			type: 'ajax',
			url: 'spring-nanotrader-services/api/marketSummary'
		}
	}
});
