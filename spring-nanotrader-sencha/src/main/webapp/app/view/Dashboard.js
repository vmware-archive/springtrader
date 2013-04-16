Ext.define('SpringTrader.view.Dashboard',{
	extend: 'Ext.Container',
	xtype: 'dashboardPage',
    requires: ['Ext.layout.VBox', 'Ext.dataview.DataView'],
	config: {
        layout: {
            type: 'vbox',
            align: 'stretch',
            pack: 'start'
        },
        scrollable: true,
		title : 'Dashboard',
		iconCls : 'home',
        items: [
            {
                xtype: 'marketsummary',
                style: "backgroundColor:#ccc"
            },
            {
                xtype: 'component',
                html: 'Dashboard Page here',
                style: "backgroundColor:#aaa"
            }
        ]
	}

});