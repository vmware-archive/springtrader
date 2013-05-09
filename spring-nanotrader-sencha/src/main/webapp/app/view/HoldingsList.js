Ext.define('SpringTrader.view.HoldingsList', {
    extend: 'Ext.List',
    xtype: 'holdingslist',
    requires: ['Ext.plugin.ListPaging'],
    config: {
        height: '100%',
        width: '100%',
        padding: 0,
        scrollable: true,
        onItemDisclosure: true,
        disableSelection: true,
        itemCls: 'holding-list',
        styleHtmlContent: true,
        deferEmptyText: true,
        emptyText: '<div class="alert">No holdings</div>',
        itemTpl: '<table><tr><td width="15%">{symbol}</td><td width="25%" class="right">{price}</td><td width="35%" class="right">{value}</td><td width="25%" class="right {[ values.isgain ? "green-color" : "red-color" ]}">{netgain}</td></tr></table>',
        plugins: [{
            xclass: 'Ext.plugin.ListPaging',
            autoPaging: true
        }]
    },
    prepareData: function (data, index, holding) {
        function currency(v) { return v.toFixed(2).replace(/(\d)(?=(\d{3})+\b)/g, '$1,'); }

        return { symbol: holding.symbol(), price: currency(holding.price()), value: currency(holding.value()), netgain: currency(holding.netgain()), isgain: holding.netgain() >= 0 }
    }
});