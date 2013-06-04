Ext.define('SpringTrader.view.QuoteSearch', {
    extend: 'Ext.Container',
    xtype: 'quotesearch',
    requires: ['Ext.field.Search', 'Ext.form.FieldSet', 'SpringTrader.view.Symbols'],
    config: {
        height: '3.5em',
        width: '100%',
        items: [
            {
                xtype: 'formpanel',
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
                                id: 'quoteSymbol',
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
                    },
                ]
            },
            {
                xtype: 'symbollist',
                store: 'quotes',
                height: '100%',
                hidden: true
            }
        ]
    }
});
