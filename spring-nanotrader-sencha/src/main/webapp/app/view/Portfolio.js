Ext.define('SpringTrader.view.Portfolio', {
	extend: 'Ext.Container',
	xtype: 'portfolioPage',
	config: {
        layout: {
            type: 'vbox',
            align: 'stretch',
            pack: 'start'
        },
        scrollable: true,
        title : 'Portfolio',
        iconCls : 'user',
        items: [
            {
                xtype: 'marketsummary',
                style: "backgroundColor:#ccc"
            },
            {
                xtype: 'component',
                html: 'Portfolio Page here',
                style: "backgroundColor:#aaa"
            }
        ]
	}
});