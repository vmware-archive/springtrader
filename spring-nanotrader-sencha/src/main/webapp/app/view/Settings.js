Ext.define('SpringTrader.view.Settings', {
    extend: 'Ext.Panel',
    xtype: 'settings',
    config: {
        title: 'Settings',
        items: [
            {
                xtype: 'button',
                ui: 'action',
                text: 'Logout',
                itemId: 'logoutButton',
                margin: '20 20 20 20'
            }
        ]
    }
});