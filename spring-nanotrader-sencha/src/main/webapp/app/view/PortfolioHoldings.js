Ext.define('SpringTrader.view.PortfolioHoldings', {
    extend: 'Ext.Container',
    xtype: 'portfolioholdings',
    requires: ['SpringTrader.view.HoldingsList'],
    config: {
        width: '100%',
        padding: 0,
        height: '400px',
        styleHtmlContent: true,
//        scrollable: DO NOT INCLUDE THIS ATTRIBUTE, EVER.
        items: [
            {
                xtype: 'component',
                cls: 'holding-list holding-list-header',
                styleHtmlContent: true,
                html: "<table class='table'><tr><td width='15%'>symbol</td><td width='25%' class='right'>price</td><td width='35%' class='right'>value</td><td width='25%' class='right'>&plusmn;</td></tr></table>"
            },
            {
                xtype: 'holdingslist',
                store: 'holdinglist'
            }
        ]
    }

    // TODO?: Calculate fixed height of the view when we receive a resize event
});