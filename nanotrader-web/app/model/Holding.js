Ext.define('NanoTrader.model.Holding', {
    extend: 'Ext.data.Model',
			fields : ['purchase_date', 'quantity', 'quote_symbol', 'account_id'],
			belongsTo : 'User',
			proxy : {
				type : 'rest',
				url : '/app?action=account',
				reader : {
					type : 'json',
					root : 'app'
				}
			}
		});