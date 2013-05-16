Ext.define('SpringTrader.view.UserForm', {
    extend: 'Ext.form.Panel',
    xtype: 'userform',
    requires: ['SpringTrader.view.UserFields'],
    config: {
        title: 'Profile',
        height: '100%',
        items: [
            { xtype: 'userfields' },
            { xtype: 'container',
                layout: { type: 'hbox', align: 'center', pack: 'center' },
                items: [
                    { xtype: 'button', ui: 'confirm', text: 'Change', itemId: 'submitButton', margin: '0 10 0 10' }
                ]
            }
        ]
    }
});