Ext.define('SpringTrader.store.AssetDistribution', {
    extend: 'Ext.data.Store',
    config: {
        autoLoad: true,
        storeId: 'assetdistribution',
        fields: [ 'name', 'value'],
        data: []
    }
});