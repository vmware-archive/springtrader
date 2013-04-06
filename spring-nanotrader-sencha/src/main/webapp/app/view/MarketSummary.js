Ext.define('SpringTrader.view.MarketSummary', {
	extend: 'Ext.form.Panel',
	xtype: 'marketsummary',
	initialize: function() {
		this.callParent(arguments);
		var marketSummary = Ext.create('SpringTrader.model.MarketSummary', {
			tradeStockIndexAverage: '1234', tradeStockIndexVolume: '1,234,567', change: '-12.23'
		});
		this.setRecord(marketSummary);
	},
	config: {
		id: 'market-summary',
		title : 'Market',
		iconCls: 'home',
		items: [{
			xtype: 'fieldset',
			title: 'Market Summary',
			items: [{
				xtype: 'textfield',
				name: 'tradeStockIndexAverage',
				label: 'Index',
				disabled: true
			},
			{
				xtype: 'textfield',
				name: 'tradeStockIndexVolume',
				label: 'Volume',
				disabled: true
			},
			{
				xtype: 'textfield',
				name: 'change',
				label: 'Change',
				disabled: true
			}
			]
		}]

	}
});
