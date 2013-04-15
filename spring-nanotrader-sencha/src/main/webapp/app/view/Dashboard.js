Ext.define('SpringTrader.view.Dashboard',{
	extend: 'Ext.Container',
	xtype: 'dashboardPage',
    requires: ['Ext.layout.VBox', 'Ext.dataview.DataView'],
	config: {
		title : 'Dashboard',
		iconCls : 'home',
        items: [
            {
                xtype: 'component',
                scrollable: true,
                html: 'Dashboard Page here'
            }
        ]
	}

});