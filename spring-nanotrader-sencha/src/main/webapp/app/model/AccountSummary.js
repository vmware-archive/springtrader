Ext.define('SpringTrader.model.AccountSummary', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'numberOfHoldings', type: 'int' },
            { name: 'totalBasis', type: 'float' },
            { name: 'totalMarketValue', type: 'float' },
            { name: 'gain', type: 'float' }
        ]
    },

    // TODO: ? move openbalance into AccountSummary and delegate in User
    // TODO: ? move balance into AccountSummary and delegate in User

    currentBalance: function() { return this.totalHoldings() + this.balance(); },
    openBalance: function() { return this.user.get('openbalance'); },
    balance: function() { return this.user.get('balance'); },
    cashBalance: function() { return this.balance(); },
    totalHoldings: function() { return this.get('totalMarketValue') },
    netGain: function() { return this.get('gain') },

    refreshData: function(success) {
        var me = this;
        Ext.Ajax.request({
            url: '/spring-nanotrader-services/api/account/' + this.user.get('accountid') + '/portfolioSummary',
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'API_TOKEN': this.user.get('authToken')},
            disableCaching: false,
            success: function (response) {
                var jsonData = Ext.JSON.decode(response.responseText);
                me.set({
                    'numberOfHoldings': jsonData.numberOfHoldings,
                    'totalBasis': jsonData.totalBasis,
                    'totalMarketValue': jsonData.totalMarketValue,
                    'gain': jsonData.gain
                });
                if (success) {
                    success(response);
                }
            }
        });
    },

    assetDistributionSeries: function() {
            return [
                { name: "Portfolio", value: this.totalHoldings()},
                { name: "Cash Balance", value: this.balance()}
            ];
    }
});