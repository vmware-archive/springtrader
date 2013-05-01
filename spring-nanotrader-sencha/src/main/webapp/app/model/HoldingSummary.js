Ext.define('SpringTrader.model.HoldingSummary', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'holdingsTotalGains', type: 'float'},
            'holdingRollups'
        ]
    },

    holdingRollups: function() { return this.get('holdingRollups'); },
    refreshData: function(success) {
        var me = this;
        Ext.Ajax.request({
            url: '/spring-nanotrader-services/api/account/' + this.user.get('accountid') + '/holdingSummary',
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'API_TOKEN': this.user.get('authToken')},
            disableCaching: false,
            success: function (response) {
                var jsonData = Ext.JSON.decode(response.responseText);
                me.set({
                    'holdingsTotalGains': jsonData.holdingsTotalGains,
                    'holdingRollups': jsonData.holdingRollups
                });
                if (success) {
                    success(response);
                }
            }
        });
    }

});