Ext.define('NanoTrader.store.Orders', {
    extend: 'Ext.data.Store',
			storeId : 'Orders',
			model : 'NanoTrader.model.Order',
			autoLoad : true
		});