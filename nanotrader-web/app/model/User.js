Ext.define('NanoTrader.model.User', {
    extend: 'Ext.data.Model',
			fields : ['user_id', 'full_name', 'address', 'email', 'cc_number'],
			hasMany : ['Orders', 'Holdings'],
			proxy : {
				type : 'rest',
				url : '/users',
				reader : {
					type : 'json',
					root : 'users'
				}
			}
		});