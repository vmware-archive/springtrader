Ext.define('SpringTrader.controller.DailyTopGains', {
    extend: 'Ext.app.Controller',
    config: {
        views: ['DailyTopGains'],
        stores: ['HoldingSummary'],
        refs: {
            view: 'dailytopgains'
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
        if (what == 'holdingsummary') {
            Ext.getStore('holdingsummary').setData(SpringTrader.user.holdingSummary.holdingRollups());
        }
    },
    onInitialize: function() {
       var me = this;
        SpringTrader.user.holdingSummary.refreshData(function () {
            me.getApplication().fireEvent('refresh', 'holdingsummary');
        });
    }
});