Ext.define('Kitchensink.view.tablet.Main', {
    extend: 'Ext.Container',
    xtype: 'mainview',

    requires: [
        'Ext.dataview.NestedList',
        'Kitchensink.view.tablet.NavigationBar',
        'Kitchensink.view.tablet.NestedList'
    ],

    config: {
        fullscreen: true,

        layout: {
            type: 'card',
            animation: {
                type: 'slide',
                direction: 'left',
                duration: 250
            }
        },

        items: [
            {
                id: 'launchscreen',
                cls : 'card',
                scrollable: true,
                html: '<div><h2>Welcome to Sencha Touch <span class="version">' + Ext.version +'</span></h2><div class="feature main"><img src="resources/images/circle-touch.png" width="52" height="52"><p>This is the Kitchen Sink &#8212; a collection of features and examples in an easy-to-browse format. Each example also has a &#8220;view source&#8221; button which shows how it was created.</p></div><h2>What&#8217;s new</h2><div class="feature"><img src="resources/images/circle-performance.png" width="52" height="52"><h3>Device Support</h3><p>Support for Internet Explorer 10, Windows Phone, Microsoft Surface Pro and RT, and BlackBerry 10.</p></div><div class="feature"><img src="resources/images/circle-architecture.png" width="52" height="52"><h3>Performance</h3><p>Use the showfps URL option to view animation transition performance in debug apps. New templates for Sencha Touch, IE10, and BlackBerry give you SCSS control over your app, plus you can detect platforms and templates for quick changes. The new CSS3 font-face feature for icons lets you provide faster scaling and icon presentation.</p></div><div class="feature"><img src="resources/images/circle-native.png" width="52" height="52"><h3>Native Packaging</h3><p><a href="http://www.sencha.com/products/sencha-cmd/download">Sencha Cmd 3.1</a> lets you build your app for App Store distribution, on Windows and Mac, plus Sencha Cmd installs Ant, Compass, Sass, and Ruby for you.</p></div><div class="feature"><img src="resources/images/circle-learn.png" width="52" height="52"><h3>Easy to Learn</h3><p>With over 30 guides, 6 full-fledged demo apps, and improved documentation, Sencha Touch is easy to learn.</p></div></div><footer>Learn more at <a href="http://www.sencha.com/products/touch" target="blank">sencha.com/products/touch</a></footer>'
            },
            {
                id: 'mainNestedList',
                xtype : 'tabletnestedlist',
                useTitleAsBackText: false,
                docked: 'left',
                width: 300,
                store: 'Demos'
            },
            {
                id: 'mainNavigationBar',
                xtype: 'tabletnavigationbar',
                title: 'Kitchen Sink',
                docked: 'top',
                items: {
                    xtype : 'button',
                    id: 'viewSourceButton',
                    hidden: true,
                    align : 'right',
                    ui    : 'action',
                    action: 'viewSource',
                    text  : 'Source'
                }
            }
        ]
    }
});
