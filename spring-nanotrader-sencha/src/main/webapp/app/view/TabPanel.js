Ext.define('SpringTrader.view.TabPanel', {
    extend: 'Ext.tab.Panel',
    xtype: 'maintabpanel',
    config: {
        header: false,
        tabBarPosition: 'bottom',
        height: '100%',
        items: [
            {
                xtype: 'dashboardPage'
            },
            {
                xtype: 'portfolioPage'
            },
            {
                xtype: 'tradePage'
            },
            {
                xtype: 'transactionsPage'
            }
        ]
    }
});
