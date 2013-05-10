Ext.define('Kitchensink.view.InlineDataView', {
    extend: 'Ext.Container',
    requires: ['Kitchensink.model.Speaker'],
    config: {
        layout: 'fit',
        items: [{
            xtype: 'dataview',
            scrollable: true,
            inline: true,
            itemTpl: '<img src="{photo}">',
            store: 'Speakers'
        }]
    }
});