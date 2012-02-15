Ext.regModel('NanoTrader.model.Order', {
			fields : ['order_id', 'order_status', 'creation_date',
					'completion_date', 'transaction_fee', 'transaction_type',
					'symbol', 'quantity'],
			belongsTo : 'User',
			proxy : {
				type : 'rest',
				url : '/app?action=account&showAllOrders=true',
				reader : {
					type : 'json',
					root : 'app'
				}
			}
		})