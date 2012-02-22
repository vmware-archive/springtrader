Ext.define('NanoTrader.store.QuoteListStore', {
			extend : 'Ext.data.Store',
			model : 'NanoTrader.model.Quote',
			requires : 'NanoTrader.model.Quote',
			proxy : {
				type : 'ajax',
				url : 'data/quotes.json',
				reader : {
					type : 'json',
					root : 'results',
					successProperty : 'success'
				}
			}
		});