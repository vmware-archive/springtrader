Ext.define('SpringTrader.view.TransactionDetail', {
    extend: 'Ext.Component',
    xtype: 'transactiondetail',
    config: {
        width: '100%',
        padding: 20,
        title: 'Transaction',
        scrollable: false,
        cls: 'well detail-table',
        tpl: Ext.create('Ext.XTemplate',
            '<table class="table table-striped">' +
                '<tbody>' +
                '<tr><th>Creation Date</th><td class="right">{creationdate}</td></tr>' +
                '<tr><th>Symbol</th><td class="right">{symbol}</td></tr>' +
                '<tr><th>Quantity</th><td class="right">{quantity}</td></tr>' +
                '<tr><th>Completion Date</th><td class="right">{completiondate}</td></tr>' +
                '<tr><th>Transaction</th><td class="right">{type}</td></tr>' +
                '<tr><th>Order ID</th><td class="right">{orderid}</td></tr>' +
                '<tr><th>Order Status</th><td class="right {[ values.status == "completed" ? "green-color" : "red-color" ]}">{[ Ext.String.capitalize(values.status) ]}</td></tr>' +
                '<tr><th>Transaction Fee</th><td class="right">{transactionfee:this.currency}</td></tr>' +
                '</tbody>' +
                '</table>',
            {
                currency: function(v) { return '$' + v.toFixed(2).replace(/(\d)(?=(\d{3})+\b)/g,'$1,'); }
            }
        )
    }
});