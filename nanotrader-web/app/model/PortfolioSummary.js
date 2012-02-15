Ext.regModel('NanoTrader.model.PortfolioSummary', {
			fields : ['total_holdings', 'purchase_basis', 'market_value',
					'total_gain_or_loss'],
			proxy : {
				type : 'rest',
				url : '/portfolio',
				reader : {
					type : 'json',
					root : 'portfolio'
				}
			}
		})