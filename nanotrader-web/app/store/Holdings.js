Ext.define('NanoTrader.store.Holdings', {
    extend: 'Ext.data.Store',
			storeId : 'Holdings',
			model : 'NanoTrader.model.Holding',
			autoLoad : true
		});