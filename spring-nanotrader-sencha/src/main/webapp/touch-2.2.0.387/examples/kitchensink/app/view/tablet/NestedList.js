Ext.define('Kitchensink.view.tablet.NestedList', {
    extend: 'Ext.NestedList',
    xtype: 'tabletnestedlist',

    platformConfig: [{
        platform: 'blackberry',
        toolbar: {
            ui: 'dark'
        }
    }]
});
