Ext.define('SpringTrader.view.Main', {
    extend: 'Ext.tab.Panel',
    requires: ['Ext.TitleBar'],
    config: {
        tabBarPosition: 'bottom',
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                layout: {pack: 'center'},
                items: [
                    {
                        xtype: 'component',
                        html: '<div class="logo"></div>'
                    },
                    {
                        xtype: 'button',
                        text: 'Login',
                        align: 'right'
                    }
                ]
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
