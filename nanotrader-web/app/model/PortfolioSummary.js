Ext.define('NanoTrader.model.PortfolioSummary', {
    extend: 'Ext.data.Model',
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
		});