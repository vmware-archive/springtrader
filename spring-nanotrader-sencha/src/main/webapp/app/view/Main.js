// Main View for the SpringTrader Reference Application

Ext.define('SpringTrader.view.Main', {
	extend : 'Ext.tab.Panel',
	xtype : 'main',
	requires : [ 'Ext.TitleBar' ],
	config : {
		tabBarPosition : 'bottom',

		items : [ {
			title : 'Dashboard',
			iconCls : 'home',

			styleHtmlContent : true,
			scrollable : true,

			items : [ {
				docked : 'top',
				xtype : 'marketsummary'
			} ]

		}, {
			title : 'Portfolio',
			iconCls : 'user',

			items : [ {
				docked : 'top',
				xtype : 'marketsummary'
			} ]
		}, {
			title : 'Trade',
			iconCls : 'compose',
			items : [ {
				docked : 'top',
				xtype : 'marketsummary'
			} ]
		} ]
	}
});