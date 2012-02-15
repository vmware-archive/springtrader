Ext.regModel('NanoTrader.model.AccountSummary', {
			fields : ['current_balance', 'opening_balance', 'cash_balance',
					'total_holdings', 'number_of_holdings',
					'current_gain_or_loss'],
			proxy : {
				type : 'rest',
				url : '/app?action=account',
				reader : {
					type : 'json',
					root : 'app'
				}
			}
		})