Ext.regModel('NanoTrader.model.Quote', {
			fields : ['symbol', 'open1', 'volume', 'change1', 'price'],
			proxy : {
				type : 'rest',
				url : '/quote',
				reader : {
					type : 'json',
					root : 'quote'
				}
			}
		})