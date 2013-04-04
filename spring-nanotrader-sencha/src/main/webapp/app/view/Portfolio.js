Ext.define('SpringTrader.view.Portfolio', {
	extend: 'Ext.Panel',
	xtype: 'portfolioPage',
	config: {
		title : 'Portfolio',
		iconCls : 'user',

		items : [ {
			docked : 'top',
			xtype : 'marketsummary'
		} ]
		
	}
});