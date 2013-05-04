Ext.define('SpringTrader.view.Main', {
    extend: 'Ext.NavigationView',
    xtype: 'mainview',
    requires: ['Ext.TitleBar'],
    config: {
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                layout: {pack: 'center'},
                items: [
                    {
                        xtype: 'component',
                        html: '<div class="logo"></div>'
                    },
                    {
                        xtype: 'button',
                        text: 'Login',
                        align: 'right',
                        itemId: 'loginButton'
                    },
                    {
                        xtype: 'button',
                        align: 'right',
                        itemId: 'settingsButton',
                        iconCls: 'settings6',
                        iconMask: true,
                        hidden: true
                    }
                ]
            }
        ]
    }
});