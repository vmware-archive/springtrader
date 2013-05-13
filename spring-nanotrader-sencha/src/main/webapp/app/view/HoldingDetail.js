Ext.define('SpringTrader.view.HoldingDetail', {
    extend: 'Ext.Container',
    xtype: 'holdingdetail',
    config: {
        title: 'Detail',
        layout: {type: 'vbox', pack: 'start', align: 'center'},
        items: [
            { xtype: 'holdingdetailtable' },
            { xtype: 'button', ui: 'decline', text: '&nbsp;Sell&nbsp;', itemId: 'submitButton', margin: '0 10 0 10' }
        ]
    }
})