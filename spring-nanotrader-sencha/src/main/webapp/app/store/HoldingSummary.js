Ext.define('SpringTrader.store.HoldingSummary', {
    extend: 'Ext.data.Store',
    config: {
        autoLoad: true,
        storeId: 'holdingsummary',
        fields: [ 'symbol', 'percent', 'gain'],
        data: []
    }
});