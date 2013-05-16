Ext.define('SpringTrader.controller.Settings', {
    extend: 'Ext.app.Controller',
    config: {
        view: ['Settings'],
        refs: {
            mainView: 'mainview',
            titleBar: 'titlebar',
            logoutButton: 'settings #logoutButton',
            settingsList: 'settings list'
        },
        control: {
            logoutButton: {
                tap: 'onLogoutButtonTap'
            },
            settingsList: {
                disclose: 'onDisclose'
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
    },

    onDisclose: function(list, record, target, index, event) {
        var me = this;

        function pushView(controller, view) {
            controller.getTitleBar().hide();
            controller.getMainView().getNavigationBar().show();
            controller.getMainView().push(view);
        };

        if (record.get('action') == 'viewProfile') {
            Ext.Viewport.setMasked({
                xtype: 'loadmask',
                message: 'Loading...'
            });

            SpringTrader.user.loadProfileData(function() {
                var view = Ext.create('SpringTrader.view.UserForm');
                Ext.ComponentQuery.query('input[name=userid]')[0].setDisabled(true);
                Ext.ComponentQuery.query('input[name=openbalance]')[0].setDisabled(true);
                view.setRecord(SpringTrader.user);
                pushView(me, view);
                Ext.Viewport.unmask();
            });
        } else if (record.get('action') == 'viewUserStats') {
            Ext.Viewport.setMasked({
                xtype: 'loadmask',
                message: 'Loading...'
            });

            SpringTrader.user.loadAccountData(function() {
                var view = Ext.create('SpringTrader.view.UserStats');
                view.updateView(SpringTrader.user);
                pushView(me, view);
                Ext.Viewport.unmask();
            });
        }
    }
});
