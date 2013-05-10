Ext.define('SpringTrader.view.Quote', {
    extend: 'Ext.Container',
    xtype: 'quote',
    requires: ['Ext.XTemplate'],
    config: {
        scrollable: false,
        styleHtmlContent: true,
        height: '3.5em',
        width: '50%',
        padding: 0,
        cls: 'quote',
        tpl: Ext.create('Ext.XTemplate',
                '<table class="">' +
                '<tbody>' +
                '<tr><th><u>Symbol</u></th><th><u>Price</u></th></tr>' +
                '<tr><td>{symbol}</td><td>{price:this.currency}</td></tr>' +
                '</tbody>' +
                '</table>',
            {
                currency: function(v) { return '$' + v.toFixed(2).replace(/(\d)(?=(\d{3})+\b)/g,'$1,'); }
            }
        )
    }
});