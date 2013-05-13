Ext.define('SpringTrader.view.HoldingDetailTable', {
    extend: 'Ext.Component',
    xtype: 'holdingdetailtable',
    config: {
        width: '100%',
        padding: 20,
        scrollable: false,
        tpl: Ext.create('Ext.XTemplate',
            '<table class="table table-condensed table-striped">' +
                '<tbody>' +
                '<tr><th>Purchase Date</th><td class="right">{purchasedate}</td></tr>' +
                '<tr><th>Symbol</th><td class="right">{symbol}</td></tr>' +
                '<tr><th>Quantity</th><td class="right">{quantity}</td></tr>' +
                '<tr><th>Purchase Price</th><td class="right">{purchaseprice:this.currency}</td></tr>' +
                '<tr><th>Current Price</th><td class="right">{currentprice:this.currency}</td></tr>' +
                '<tr><th>Purchase Basis</th><td class="right">{purchasebasis:this.currency}</td></tr>' +
                '<tr><th>Market Value</th><td class="right">{marketvalue:this.currency}</td></tr>' +
                '<tr><th>Total Gain/Loss</th><td class="right {[ values.netgain >= 0 ? "green-color" : "red-color" ]}">{netgain:this.currency} {[ values.netgain >= 0 ? "↑" : "↓" ]}</td></tr>' +
                '</tbody>' +
                '</table>',
            {
                currency: function(v) { return '$' + v.toFixed(2).replace(/(\d)(?=(\d{3})+\b)/g,'$1,'); }
            }
        )
    }
})