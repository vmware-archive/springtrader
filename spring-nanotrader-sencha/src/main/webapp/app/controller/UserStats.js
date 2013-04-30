Ext.define('SpringTrader.controller.UserStats', {
    extend: 'Ext.app.Controller',
    config: {
        views: ['UserStats'],
        refs: {
            userStats: 'userstats'
        },
        control: {
            userStats: {
                initialize: 'onInitializeUserStats'
            }
        }
    },
    launch: function () {
        this.getApplication().on('refresh', this.refreshUserStats, this);
    },
    refreshUserStats: function (what) {
        if (what == 'userstats') {
            this.getUserStats().updateView(SpringTrader.user);
        }
    },
    onInitializeUserStats: function () {
        var me = this;
        SpringTrader.user.loadAccountData(function () {
            me.getApplication().fireEvent('refresh', 'userstats');
        });
    }
});