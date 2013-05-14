Ext.define('SpringTrader.view.QuoteSearch', {
    extend: 'Ext.form.Panel',
    xtype: 'quotesearch',
    requires: ['Ext.field.Search', 'Ext.form.FieldSet'],
    config: {
        title: 'Buy',
        height: '3.5em',
        width: '100%',
        scrollable: false,
        items: [
            {
                xtype: 'fieldset',
                items: [
                    {
                        xtype: 'textfield',
                        name: 'symbol',
                        placeHolder: 'Enter symbol to get a quote',
                        autoCapitalize: false,
                        autoCorrect: false,
                        listeners: {
                            keyup: function(field) {
                                field.setValue(field.getValue().toUpperCase());
                            }
                        }
                    }
                ]
            }
        ]
    }
});
