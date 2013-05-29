Ext.define('SpringTrader.controller.DailyTopGains', {
    extend: 'Ext.app.Controller',
    config: {
        views: ['DailyTopGains', 'NoData'],
        stores: ['HoldingSummary'],
        model: ['HoldingSummary'],
        refs: {
            view: 'dailytopgains',
            noData: 'nodata'
        }
    },
    launch: function() {
        this.getApplication().on('refresh', this._refresh, this);
    },
    _refresh: function(what) {
        if (what == 'holdingsummary') {
            Ext.getStore('holdingsummary').setData(SpringTrader.user.holdingSummary.holdingRollups());
            if (SpringTrader.user.accountSummary.get('numberOfHoldings') == 0 ) {
                this.getView().hide();
                this.getNoData().show();
            }
        }
    }
});