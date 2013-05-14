Ext.define('SpringTrader.view.BuyShares', {
    extend: 'Ext.Container',
    xtype: 'buyshares',
    config: {
        width: '100%',
        height: '14em',
        layout: {type: 'vbox', pack: 'start', align: 'center'},
        items: [
            { xtype: 'quotesearch' },
            { xtype: 'quote', hidden: true },
            { xtype: 'buyform', hidden: true }
        ]

    }
});