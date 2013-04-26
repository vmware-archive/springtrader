Ext.define('SpringTrader.view.Dashboard', {
    extend: 'Ext.Container',
    xtype: 'dashboardPage',
    config: {
        layout: {
            type: 'vbox',
            align: 'stretch',
            pack: 'start'
        },
        scrollable: true,
        title: 'Dashboard',
        iconCls: 'home',
        items: [
            {
                xtype: 'marketsummary',
                style: "backgroundColor:#ccc"
            },
            {
                xtype: 'component',
                html: 'Dashboard here',
                style: "backgroundColor:#aaa"
            }
        ]
    }
});