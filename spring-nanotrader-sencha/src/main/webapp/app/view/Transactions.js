Ext.define('SpringTrader.view.Transactions', {
    extend: 'Ext.List',
    xtype: 'transactionsPage',
    requires: ['Ext.plugin.ListPaging'],
    config: {
        iconCls: 'list',
        title: 'Transactions',
        height: '100%',
        width: '100%',
        scrollable: true,
        onItemDisclosure: true,
        disableSelection: true,
        itemCls: 'disclosable-list',
        styleHtmlContent: true,
        deferEmptyText: true,
        emptyText: '<div class="alert">No orders</div>',
        itemTpl: '<table><tr><td width="15%">{symbol}</td><td width="25%" class="right">{quantity}</td><td width="30%" class="center">{[ Ext.String.capitalize(values.type) ]}</td><td width="30%" class="{[ values.status == "completed" ? "green-color" : "red-color" ]}">{[ Ext.String.capitalize(values.status) ]}</td></tr></table>',
        plugins: [{
            xclass: 'Ext.plugin.ListPaging',
            autoPaging: true
        }]
    },
    prepareData: function (data, index, order) {
        return { symbol: order.symbol(), quantity: order.quantity(), type: order.type(), status: order.status() }
    }
});