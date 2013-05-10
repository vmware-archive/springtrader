Ext.define('Kitchensink.view.HorizontalDataView', {
    extend: 'Ext.Container',
    requires: ['Kitchensink.model.Speaker'],
    config: {
        layout: 'fit',
        cls: 'ks-basic',
        items: [{
            xtype: 'dataview',
            scrollable: 'horizontal',
            inline: {
                wrap: false
            },
            itemTpl: '<img src="{photo}"><div>{first_name} {last_name}</div>',
            store: 'Speakers'
        }]
    }
});