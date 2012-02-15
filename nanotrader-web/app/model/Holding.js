Ext.regModel('NanoTrader.model.Holding', {
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
		})