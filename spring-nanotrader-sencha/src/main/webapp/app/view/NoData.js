Ext.define('SpringTrader.view.NoData', {
    extend: 'Ext.Component',
    xtype: 'nodata',
    config: {
        hidden: true,
        cls: 'alert',
        html: 'No holdings.'
    }
});