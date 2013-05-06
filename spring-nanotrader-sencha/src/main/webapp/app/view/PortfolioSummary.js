Ext.define('SpringTrader.view.PortfolioSummary', {
    extend: 'Ext.Container',
    xtype: 'portfoliosummary',
    config: {
        width: '100%',
        items: [
            {xtype: 'portfoliosummarytable'},
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