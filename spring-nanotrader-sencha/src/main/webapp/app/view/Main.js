Ext.define('SpringTrader.view.Main', {
    extend: 'Ext.tab.Panel',
    requires: ['Ext.TitleBar'],
    config: {
        tabBarPosition: 'bottom',
        items: [
            {
                xtype: 'titlebar',
                title: 'SpringTrader',
                docked: 'top'
            },
            {
                xtype: 'marketsummary',
                style: "backgroundColor:#ccc",
                docked: 'top'
            },
            {
                xtype: 'dashboardPage'
            },
            {
                xtype: 'portfolioPage'
            },
            {
                xtype: 'tradePage'
            }
        ]
    }
});
