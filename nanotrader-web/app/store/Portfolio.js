Ext.define('NanoTrader.store.Portfolio', {
    extend: 'Ext.data.Store',
			storeId : 'Portfolio',
			model : 'NanoTrader.model.Holding',
			autoLoad : true
		});