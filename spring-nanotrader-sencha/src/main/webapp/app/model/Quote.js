Ext.define('SpringTrader.model.Quote', {
    extend: 'Ext.data.Model',
    config: {
        idProperty: 'quoteid',
        fields: ['symbol']
    }
});