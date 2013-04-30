Ext.define('SpringTrader.controller.AccountSummary', {
    extend: 'Ext.app.Controller',
    config: {
        views: ['AccountSummary'],
        stores: ['AssetDistribution'],
        refs: {
            accountSummary: 'accountsummary'
        },
        control: {
            accountSummary: {
                initialize: 'onInitializeAccountSummary'
            }
        }
    },
    launch: function() {
        this.getApplication().on('refresh', this.refreshAccountSummary, this);
    },
    refreshAccountSummary: function(what) {
        if (what == 'accountsummary' || what == 'userstats') {
            this.getAccountSummary().updateView(SpringTrader.user.accountSummary);
            Ext.getStore('assetdistribution').setData(SpringTrader.user.accountSummary.assetDistributionSeries());
        }
    },
    onInitializeAccountSummary: function() {
       var me = this;
        SpringTrader.user.accountSummary.refreshData(function () {
            me.getApplication().fireEvent('refresh', 'accountsummary');
        });
    }
});