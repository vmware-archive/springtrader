Ext.define('SpringTrader.controller.AccountSummary', {
    extend: 'Ext.app.Controller',
    config: {
        views: ['AccountSummary'],
        stores: ['AssetDistribution'],
        models: ['AccountSummary'],
        refs: {
            view: 'accountsummary'
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
    }
});