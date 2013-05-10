Ext.define('SpringTrader.controller.Settings', {
    extend: 'Ext.app.Controller',
    config: {
        view: ['Settings'],
        refs: {
            mainView: 'mainview',
            logoutButton: 'settings #logoutButton'
        },
        control: {
            logoutButton: {
                tap: 'onLogoutButtonTap'
            }
        }
    },

    onLogoutButtonTap: function () {
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Loading...'
        });
        var me = this;
        SpringTrader.user.logout(function () {
            me.clearLocalStorage();
        });
        me.getMainView().pop();
    },

    clearLocalStorage: function () {
        SpringTrader.appStore.remove('authToken');
        SpringTrader.appStore.remove('accountid');
        SpringTrader.appStore.remove('profileid');
    }
});
