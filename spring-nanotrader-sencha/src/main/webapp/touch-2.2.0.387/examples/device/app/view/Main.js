Ext.define('Device.view.Main', {
    extend: 'Ext.Container',
    xtype: 'main',

    config: {
        fullscreen: true,

        layout: {
            type: 'card'
        },

        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: 'Device API'
            },

            {
                xtype: 'tabbar',
                docked: 'bottom',
                scrollable: 'horizontal',
                items: [
                    {
                        title: 'Purchases',
                        iconCls: 'cart',
                        className: 'Device.view.Purchases'
                    },
                    {
                        title: 'Notifications',
                        iconCls: 'mail',
                        className: 'Device.view.Information'
                    },
                    {
                        title: 'Push',
                        iconCls: 'mail',
                        className: 'Device.view.Push'
                    },
                    {
                        title: 'Contacts',
                        iconCls: 'team',
                        className: 'Device.view.Contacts'
                    },
                    {
                        title: 'Camera',
                        iconCls: 'camera',
                        className: 'Device.view.Camera'
                    },
                    {
                        title: 'Orientation',
                        iconCls: 'speedometer',
                        className: 'Device.view.Orientation'
                    },
                    {
                        title: 'Connection',
                        iconCls: 'wireless',
                        className: 'Device.view.Connection'
                    },
                    {
                        title: 'Geolocation',
                        iconCls: 'maps',
                        className: 'Device.view.Geolocation'
                    }
                ]
            },

            { xclass: 'Device.view.Information' },
            { xclass: 'Device.view.Purchases' },
            { xclass: 'Device.view.Notification' },
            { xclass: 'Device.view.Push' },
            { xclass: 'Device.view.Contacts' },
            { xclass: 'Device.view.Camera' },
            { xclass: 'Device.view.Orientation' },
            { xclass: 'Device.view.Connection' },
            { xclass: 'Device.view.Geolocation' }
        ]
    }
});
