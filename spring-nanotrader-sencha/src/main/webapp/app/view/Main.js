Ext.define('SpringTrader.view.Main', {
	extend: 'Ext.tab.Panel',
	config: {
		tabBarPosition: 'bottom',

		items: [{
			xtype: 'marketsummary'
		}, {
			xtype: 'portfolioPage'
		}, {
			xtype: 'tradePage'
		}]
	}
});
