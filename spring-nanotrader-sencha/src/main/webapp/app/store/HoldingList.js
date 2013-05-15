Ext.define('SpringTrader.store.HoldingList', {
    extend: 'Ext.data.Store',
    config: {
        model: 'SpringTrader.model.Holding',
        storeId: 'holdinglist',
        pageSize: 5,
        proxy: {
            type: 'ajax',
            url: '/spring-nanotrader-services/api/account/X/holdings',
            headers: {'Content-Type': 'application/json' },
            pageParam: 'page',
            limitParam: 'pageSize',
            noCache: false,
            startParam: false,
            reader: {
                rootProperty: 'results',
                totalProperty: 'totalRecords'
            }
        }
    },
    initialize: function() {
        this.callParent(arguments);
        this.currentPage = 0;
    },
    load: function() {
        this.getProxy().setUrl('/spring-nanotrader-services/api/account/'+ SpringTrader.user.accountId() +'/holdings');
        this.getProxy().getHeaders().API_TOKEN = SpringTrader.user.authToken();
        this.callParent(arguments);
    }
});