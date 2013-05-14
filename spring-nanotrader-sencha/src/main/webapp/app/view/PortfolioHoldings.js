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
                html: "<table class='table'><tr><th width='15%'>Symbol</th><th width='20%' class='right'>Price</th><th width='35%' class='right'>Value</th><th width='30%' class='right'>&plusmn;</th></tr></table>"
            },
            {
                xtype: 'holdingslist',
                store: 'holdinglist'
            }
        ]
    }

    // TODO?: Calculate fixed height of the view when we receive a resize event
});