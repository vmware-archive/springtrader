Ext.define('SpringTrader.view.Trade', {
	extend: 'Ext.Panel',
	xtype: 'tradePage',
	config: {
		title: 'Trade',
		iconCls: 'compose',
		items: [{
			docked: 'top',
			xtype: 'marketsummary'
		}]

	}
});
