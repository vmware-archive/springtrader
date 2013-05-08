Ext.define('SpringTrader.view.HoldingsList', {
    extend: 'Ext.List',
    xtype: 'holdingslist',
    config: {
        height: '100%',
        width: '100%',
        padding: 0,
        scrollable: false,
        onItemDisclosure: true,
        disableSelection: true,
        itemCls: 'holding-list',
        styleHtmlContent: true,
        itemTpl: "<table><tr><td width='15%'>{symbol}</td><td width='25%' class='right'>{price}</td><td width='35%' class='right'>{value}</td><td width='25%' class='right'>{netgain}</td></tr></table>",
        data: [
            {symbol: 'WYNN', price: '$32.44', value: '$192.64', netgain: '-$45.66'},
            {symbol: 'GILD', price: '$19.09', value: '$1909.09', netgain: '$291.00'},
            {symbol: 'SHLD', price: '$14.06', value: '$56.24', netgain: '$6.92'}
        ]
    }
});