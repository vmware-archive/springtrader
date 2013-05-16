/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

// DO NOT DELETE - this directive is required for Sencha Cmd packages to work.
//@require @packageOverrides

//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/2.2.0.387/src',
    'SpringTrader': 'app'
});

Ext.Loader.setConfig({
    enabled: true,
//    disableCaching: false
});
//</debug>

Ext.application({
    name: 'SpringTrader',

    viewport: {
//        autoMaximize: (Ext.os.deviceType == 'Phone')
    },

    requires: [
        'Ext.MessageBox', 'SpringTrader.LocalStore'
    ],

    models:[
        'AccountSummary',
        'HoldingSummary',
        'User',
        'Holding',
        'Quote',
        'Order'
    ],

    views: [
        'AccountSummary',
        'AssetDistribution',
        'DailyTopGains',
        'Dashboard',
        'LoggedOut',
        'LoginForm',
        'Main',
        'MarketSummary',
        'ModalSheet',
        'NoData',
        'PieChart',
        'Portfolio',
        'PortfolioHoldings',
        'PortfolioSummary',
        'PortfolioSummaryTable',
        'Settings',
        'SignupButton',
        'SignupForm',
        'TabPanel',
        'Trade',
        'UserStats'
    ],

    stores: [
        'AssetDistribution',
        'HoldingSummary',
        'MarketSummary',
        'HoldingList',
        'Quotes',
        'Orders'
    ],

    controllers: [
        'AccountSummary',
        'DailyTopGains',
        'Main',
        'MarketSummary',
        'Portfolio',
        'Trade',
        'Settings',
        'User',
        'UserStats',
        'Holdings',
        'Transactions'
    ],

	views: ['Main'],

    icon: {
        '57': 'resources/icons/icon_57.png',
        '72': 'resources/icons/icon_72.png',
        '114': 'resources/icons/icon_114.png',
        '144': 'resources/icons/icon_144.png'
    },

    isIconPrecomposed: false,

    startupImage: {
        '320x460': 'resources/startup/dark/320x460.png',
        '640x920': 'resources/startup/dark/640x920.png',
        '768x1004': 'resources/startup/dark/768x1004.png',
        '748x1024': 'resources/startup/dark/748x1024.png',
        '1536x2008': 'resources/startup/dark/1536x2008.png',
        '1496x2048': 'resources/startup/dark/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        SpringTrader.user = Ext.create('SpringTrader.model.User');
        SpringTrader.appStore = Ext.create('SpringTrader.LocalStore');

        if (SpringTrader.appStore.find('authToken')) {
            SpringTrader.user.set({
                authToken: SpringTrader.appStore.find('authToken'),
                profileid: SpringTrader.appStore.find('profileid'),
                accountid: SpringTrader.appStore.find('accountid')
            });
            Ext.StoreMgr.lookup('quotes').load();
        }

        // Initialize the main view
        Ext.Viewport.add(Ext.create('SpringTrader.view.Main'));
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
