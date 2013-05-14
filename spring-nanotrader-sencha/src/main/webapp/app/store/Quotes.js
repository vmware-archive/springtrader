Ext.define('SpringTrader.store.Quotes', {
    extend: 'Ext.data.Store',
    requires: ['SpringTrader.model.Quote'],
    config: {
        model: 'SpringTrader.model.Quote',
        storeId: 'quotes',
        fields: ['symbol'],
        proxy: {
            type: 'ajax',
            url: '/spring-nanotrader-services/api/quotes',
            headers: {'Content-Type': 'application/json'},
            pageParam: false,
            limitParam: false,
            noCache: false,
            startParam: false,
            reader: {
                rootProperty: 'results'
            }
        },
        sorters: [ {property: 'symbol', direction: 'ASC'} ]
    },
    load: function() {
        this.getProxy().getHeaders().API_TOKEN = SpringTrader.user.authToken();
        this.callParent(arguments);
    }
})