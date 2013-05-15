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
                xtype: 'holdingslist',
                store: 'holdinglist'
            }
        ]
    }

    // TODO?: Calculate fixed height of the view when we receive a resize event
});