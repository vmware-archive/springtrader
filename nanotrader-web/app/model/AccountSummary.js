Ext.define('AccountSummary', {
			extend : 'Ext.data.Model',
			fields : ['current_balance', 'opening_balance', 'cash_balance',
					'total_holdings', 'number_of_holdings',
					'current_gain_or_loss'],
			proxy : {
				type : 'rest',
				url : 'data/accountsummary.json',
				reader : {
					type : 'json',
					root : 'results',
					successProperty : 'success'
				}
			}
		});