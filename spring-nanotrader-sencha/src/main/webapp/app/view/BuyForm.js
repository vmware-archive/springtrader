Ext.define('SpringTrader.view.BuyForm', {
    extend: 'Ext.form.Panel',
    xtype: 'buyform',
    requires: ['SpringTrader.field.Number', 'Ext.form.FieldSet'],
    config: {
        height: '100%',
        width: '100%',
        items: [
            { xtype: 'fieldset',
                items: [
                    {
                        xtype: 'stnumberfield',
                        name: 'quantity',
                        label: 'Quantity'
                    }
                ]
            },
            { xtype: 'container',
                layout: { type: 'hbox', align: 'center', pack: 'center' },
                items: [
                    { xtype: 'button', disabled: true, ui: 'confirm', text: 'Buy', itemId: 'submitButton', margin: '0 10 0 10' }
                ]
            }
        ]
    }
});