Ext.define('SpringTrader.view.Main', {
    extend: 'Ext.navigation.View',
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
                        align: 'right'
                    }
                ]
            },
            {
                xtype: 'maintabpanel',
                listeners: {
                    show: function() {
                        if (SpringTrader.user.authenticated()) {
                            this.getTabBar().show();
                        } else {
                            this.getTabBar().hide();
                        }
                    }
                }
            }
        ]
    }
});