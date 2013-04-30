Ext.define('SpringTrader.controller.AccountSummary', {
    extend: 'Ext.app.Controller',
    config: {
        views: ['AccountSummary'],
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
        }
    },
    onInitializeAccountSummary: function() {
       var me = this;
        SpringTrader.user.accountSummary.refreshData(function () {
            me.getApplication().fireEvent('refresh', 'accountsummary');
        });
    }
});