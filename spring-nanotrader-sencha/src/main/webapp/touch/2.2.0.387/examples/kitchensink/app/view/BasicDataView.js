Ext.define('Kitchensink.view.BasicDataView', {
    extend: 'Ext.Container',
    requires: ['Kitchensink.model.Speaker'],
    config: {
        layout: 'fit',
        cls: 'ks-basic',
        items: [{
            xtype: 'dataview',
            itemTpl: '<img src="{photo}"><div>{first_name} {last_name}</div>',
            store: 'Speakers'
        }]
    }
});