Ext.define('SpringTrader.view.SellShares', {
    extend: 'Ext.Container',
    xtype: 'sellshares',
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
                html: "<table class='table'><tr><th width='15%'>Symbol</th><th width='25%' class='right'>Price</th><th width='35%' class='right'>Value</th><th width='25%' class='right'>&plusmn;</th></tr></table>"
            },
            {
                xtype: 'holdingslist',
                store: 'holdinglist'
            }
        ]
    }
});
