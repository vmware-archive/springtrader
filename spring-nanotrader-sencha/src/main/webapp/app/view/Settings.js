Ext.define('SpringTrader.view.Settings', {
    extend: 'Ext.Panel',
    xtype: 'settings',
    config: {
        title: 'Settings',
        items: [
            {
                xtype: 'list',
                margin: '20 0 0 0',
                height: '8em',
                itemTpl: '{text}',
                onItemDisclosure: true,
                disableSelection: true,
                data: [
                    { text: 'Profile' },
                    { text: 'Help' },
                    { text: 'User Statistics' }
                ]
            },
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