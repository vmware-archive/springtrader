Ext.define('SpringTrader.view.Main', {
	extend: 'Ext.tab.Panel',
	config: {
		tabBarPosition: 'bottom',

		items: [{
			xtype: 'dashboardPage'
		}, {
			xtype: 'portfolioPage'
		}, {
			xtype: 'tradePage'
		}]
	}
});
