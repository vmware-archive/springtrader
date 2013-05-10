Ext.define('SpringTrader.view.BuyForm', {
    extend: 'Ext.form.Panel',
    xtype: 'buyform',
    requires: ['Ext.field.Number', 'Ext.form.FieldSet'],
    config: {
        height: '100%',
        width: '100%',
        items: [
            { xtype: 'fieldset',
                items: [
                    { xtype: 'numberfield', name: 'quantity', label: 'Quantity' }
                ]
            },
            { xtype: 'container',
                layout: { type: 'hbox', align: 'center', pack: 'center' },
                items: [
                    { xtype: 'button', ui: 'cancel', text: 'Cancel', itemId: 'cancelButton', margin: '0 10 0 10' },
                    { xtype: 'button', ui: 'confirm', text: 'Buy', itemId: 'submitButton', margin: '0 10 0 10' }
                ]
            }
        ]
    }
});