Ext.define('NanoTrader.store.Quotes', {
    extend: 'Ext.data.Store',
			storeId : 'Quotes',
			model : 'NanoTrader.model.Quote',
			autoLoad : true
		});