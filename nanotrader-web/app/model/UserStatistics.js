Ext.define('NanoTrader.model.UserStatistics', {
    extend: 'Ext.data.Model',
			fields : ['account_id', 'account_creation_date', 'total_login',
					'session_creation_date'],
			proxy : {
				type : 'rest',
				url : '/users',
				reader : {
					type : 'json',
					root : 'users'
				}
			}
		});