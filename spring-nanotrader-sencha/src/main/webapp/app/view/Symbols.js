Ext.define('SpringTrader.view.Symbols', {
    extend: 'Ext.List',
    xtype: 'symbollist',
    config: {
        styleHtmlContent: true,
        scrollable: true,
        width: '100%',
        itemTpl: '{symbol}'
    }
});