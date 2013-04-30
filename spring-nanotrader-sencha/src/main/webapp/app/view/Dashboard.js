Ext.define('SpringTrader.view.Dashboard', {
    extend: 'Ext.Container',
    xtype: 'dashboardPage',
    requires: [
        'SpringTrader.view.AccountSummary',
        'SpringTrader.view.UserStats'
    ],
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
            { xtype: 'marketsummary' },
            { xtype: 'accountsummary' },
            { xtype: 'userstats' }
        ]
    }
});