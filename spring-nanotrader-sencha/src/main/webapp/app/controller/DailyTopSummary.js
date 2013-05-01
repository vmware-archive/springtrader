Ext.define('SpringTrader.controller.DailyTopSummary', {
    extend: 'Ext.app.Controller',
    config: {
        views: ['DailyTopSummary'],
        stores: ['HoldingSummary'],
        refs: {
            dailyTopSummary: 'dailytopsummary'
        },
        control: {
            dailyTopSummary: {
                initialize: 'onInitializeDailyTopSummary'
            }
        }
    },
    launch: function() {
        this.getApplication().on('refresh', this.refreshDailyTopSummary, this);
    },
    refreshDailyTopSummary: function(what) {
        if (what == 'holdingsummary') {
            Ext.getStore('holdingsummary').setData(SpringTrader.user.holdingSummary.holdingRollups());
        }
    },
    onInitializeDailyTopSummary: function() {
       var me = this;
        SpringTrader.user.holdingSummary.refreshData(function () {
            me.getApplication().fireEvent('refresh', 'holdingsummary');
        });
    }
});