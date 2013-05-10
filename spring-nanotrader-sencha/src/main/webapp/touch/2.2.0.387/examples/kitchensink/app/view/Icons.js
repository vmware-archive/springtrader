/**
 * Demonstrates some of the many icons that are bundled with Sencha Touch 2
 */
Ext.define('Kitchensink.view.Icons', {
    extend: 'Ext.tab.Panel',

    config: {
        activeTab: 0,
        layout: {
            animation: {
                type: 'slide',
                duration: 250
            }
        },
        tabBar: {
            layout: {
                pack : 'center',
                align: 'center'
            },
            docked: 'bottom',
            scrollable: null
        },
        defaults: {
            scrollable: true
        },
        items: [
            {
                iconCls: 'info',
                title  : 'Info',
                cls    : 'card',
                html   : 'Both toolbars and tabbars have built-in, ready to use icons.<br><br><em>Sencha Touch comes with over 300 icons that can optionally be included in your app via Sass and Compass.</em>'
            },
            {
                iconCls: 'download',
                title  : 'Download',
                cls    : 'card dark',
                html   : '<span class="action">User tapped Download</span>'
            },
            {
                iconCls: 'favorites',
                title  : 'Favorites',
                cls    : 'card',
                html   : '<span class="action">User tapped Favorites</span>',
                hidden: (Ext.filterPlatform('ie10') && Ext.os.is.Phone) ? true : false
            },
            {
                iconCls: 'bookmarks',
                title  : 'Bookmarks',
                cls    : 'card dark',
                html   : '<span class="action">User tapped Bookmarks</span>',
                hidden: (Ext.filterPlatform('ie10') && Ext.os.is.Phone) ? true : false
            },
            {
                iconCls: 'more',
                title  : 'More',
                cls    : 'card',
                html   : '<span class="action">User tapped More</span>'
            },
            {
                xtype : 'toolbar',
                ui: 'neutral',
                docked: 'top',
                scrollable: null,
                defaults: {
                    ui: 'plain'
                },
                items: [
                    { iconCls: 'action' },
                    { iconCls: 'add' },
                    { iconCls: 'compose' },
                    { iconCls: 'delete' },
                    { iconCls: 'refresh' },
                    { iconCls: 'reply' }
                ],
                layout: {
                    pack : (Ext.filterPlatform('ie10') && !Ext.os.is.Phone) ? 'start' : 'center',
                    align: 'center'
                }
            }
        ]
    }
});
