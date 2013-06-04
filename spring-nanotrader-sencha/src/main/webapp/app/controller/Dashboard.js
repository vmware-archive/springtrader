Ext.define('SpringTrader.controller.Dashboard', {
	extend: 'Ext.app.Controller',
	
	config: {
		views: ['Dashboard'],
		refs: {
			dashboardPage: 'dashboardPage'
		},
		control: {
			dashboardPage: {
                activate: 'onDashboardActive'
            }	
		}
	},
	
	onDashboardActive: function () {
        var me = this;
        SpringTrader.user.accountSummary.refreshData(function () {
            me.getApplication().fireEvent('refresh', 'accountsummary');
        });
        SpringTrader.user.loadAccountData(function () {
            me.getApplication().fireEvent('refresh', 'userstats');
        });
        SpringTrader.user.holdingSummary.refreshData(function () {
            me.getApplication().fireEvent('refresh', 'holdingsummary');
        });
    },
});