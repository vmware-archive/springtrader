Ext.define('SpringTrader.controller.AccountSummary', {
    extend: 'Ext.app.Controller',
    config: {
        views: ['AccountSummary'],
        stores: ['AssetDistribution'],
        refs: {
            view: 'accountsummary'
        },
        control: {
            view: {
                initialize: 'onInitialize'
            }
        }
    },
    launch: function() {
        this.getApplication().on('refresh', this._refresh, this);
    },
    _refresh: function(what) {
        if (what == 'accountsummary' || what == 'userstats') {
            this.getView().updateView(SpringTrader.user.accountSummary);
            Ext.getStore('assetdistribution').setData(SpringTrader.user.accountSummary.assetDistributionSeries());
        }
    },
    onInitialize: function() {
       var me = this;
        SpringTrader.user.accountSummary.refreshData(function () {
            me.getApplication().fireEvent('refresh', 'accountsummary');
        });
        SpringTrader.user.loadAccountData(function () {
            me.getApplication().fireEvent('refresh', 'userstats');
        });
    }
});