Ext.define('SpringTrader.view.Trade', {
    extend: 'Ext.Container',
    xtype: 'tradePage',
    requires: ['Ext.SegmentedButton'],
    config: {
        title: 'Trade',
        iconCls: 'compose',
        layout: {
            type: 'vbox',
            pack: 'start',
            align: 'center'
        },
        items: [
            {
                xtype: 'segmentedbutton',
                itemId: 'tradeswitch',
                margin: '10 0 10 0',
                items: [
                    { text: 'Buy Shares', pressed: true, data: { ref: 'buy' } },
                    { text: 'Sell Shares', pressed: false, data: { ref: 'sell'} }
                ]
            },
            { xtype: 'buyshares'},
            {
                xtype: 'sellshares',
                hidden: true
            }

        ]
    }
});
