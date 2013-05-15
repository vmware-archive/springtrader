Ext.define('SpringTrader.view.HoldingDetail', {
    extend: 'Ext.Container',
    xtype: 'holdingdetail',
    config: {
        title: 'Detail',
        scrollable: true,
        layout: {type: 'vbox', pack: 'start', align: 'center'},
        items: [
            { xtype: 'holdingdetailtable' },
            { xtype: 'button', ui: 'decline', text: '&nbsp;Sell&nbsp;', itemId: 'submitButton', margin: '0 10 0 10' },
            {
                xtype: 'component',
                styleHtmlContent: true,
                cls: 'sell-confirmation well',
                margin: '0 20 0 20',
                html: 'Your order has been submitted for processing.',
                itemId: 'confirmation',
                hidden: true
            }
        ]
    }
});