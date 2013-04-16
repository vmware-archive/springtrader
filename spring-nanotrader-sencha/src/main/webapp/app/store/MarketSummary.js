Ext.define('SpringTrader.store.MarketSummary', {
    extend: 'Ext.data.Store',
    requires: ['Ext.data.proxy.Rest'],
    config: {
        autoLoad: true,
        storeId: 'marketsummary',
        fields: ['tradeStockIndexAverage', 'tradeStockIndexVolume', 'change', 'topLosers', 'topGainers'],
        proxy: {
            type: 'ajax',
            url: '/spring-nanotrader-services/api/marketSummary',
            noCache: false
        }
    }
});