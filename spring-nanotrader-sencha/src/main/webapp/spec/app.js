Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false
});

Ext.Loader.setPath({
    'SpringTrader': 'app'
});

Ext.application({
    name: 'SpringTrader'
});