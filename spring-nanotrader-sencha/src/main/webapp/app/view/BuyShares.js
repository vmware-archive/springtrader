Ext.define('SpringTrader.view.BuyShares', {
    extend: 'Ext.Container',
    xtype: 'buyshares',
    config: {

        width: '100%',
        height: '100%',
        layout: {type: 'vbox', pack: 'start', align: 'center'},
        items: [
            { xtype: 'quotesearch' },
            {
                xtype: 'quote',
                data: {symbol: 'AAPL', price: 751.98}
            },
            { xtype: 'buyform' }

        ]

    }
});