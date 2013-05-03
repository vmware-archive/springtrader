Ext.define('SpringTrader.view.Dashboard', {
    extend: 'Ext.Container',
    xtype: 'dashboardPage',
    requires: [
        'SpringTrader.view.AccountSummary',
        'SpringTrader.view.UserStats',
        'SpringTrader.view.AssetDistribution',
        'SpringTrader.view.DailyTopSummary'
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
            { xtype: 'container',
                cls: 'well show-well',
                items: [
                    {
                        xtype: 'component',
                        html: '<div class="title"><h3>Daily Top Summary</h3></div>'
                    },
                    { xtype: 'dailytopsummary' }
                ]
            },
            { xtype: 'container',
                cls: 'well show-well',
                items: [
                    {
                        xtype: 'component',
                        html: '<div class="title"><h3>Asset Distribution</h3></div>'
                    },
                    { xtype: 'assetdistribution' }
                ]
            }
        ]
    }
});