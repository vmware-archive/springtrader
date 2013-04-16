Ext.define('SpringTrader.view.Trade', {
	extend: 'Ext.Container',
	xtype: 'tradePage',
	config: {
        layout: {
            type: 'vbox',
            align: 'stretch',
            pack: 'start'
        },
        scrollable: true,
        title : 'Trade',
        iconCls : 'compose',
        items: [
            {
                xtype: 'marketsummary',
                style: "backgroundColor:#ccc"
            },
            {
                xtype: 'component',
                html: 'Trade Page here',
                style: "backgroundColor:#aaa"
            }
        ]
	}
});
