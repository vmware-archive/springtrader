Ext.define('SpringTrader.controller.UserStats', {
    extend: 'Ext.app.Controller',
    config: {
        views: ['UserStats'],
        refs: {
            view: 'userstats'
        },
        control: {
            view: {
                initialize: 'onInitialize'
            }
        }
    },
    launch: function () {
        this.getApplication().on('refresh', this._refresh, this);
    },
    _refresh: function (what) {
        if (what == 'userstats' && this.getView()) {
            this.getView().updateView(SpringTrader.user);
        }
    },
    onInitialize: function () {
        var me = this;
        SpringTrader.user.loadAccountData(function () {
            me.getApplication().fireEvent('refresh', 'userstats');
        });
    }
});