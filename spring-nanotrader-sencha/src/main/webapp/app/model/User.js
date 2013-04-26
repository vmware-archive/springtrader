Ext.define('SpringTrader.model.User', {
    extend: 'Ext.data.Model',
    requires: ['SpringTrader.validation.AccountBalance'],
    config: {
        idProperty: 'userid',
        fields: [
            { name: 'fullname', type: 'string' },
            { name: 'email', type: 'string' },
            { name: 'passwd', type: 'string' },
            { name: 'userid', type: 'string' },
            { name: 'accounts' },
            // Make the field persist to avoid synchronizing this field into server
            { name: 'openbalance', persist: false, convert: function (value, record) {
                if (value !== undefined && value != null) {
                    record.set('accounts', [ {"openbalance": value.toString()} ]);
                }
            }},
            { name: 'creditcard', type: 'string', default: '1234123412341234' },
            { name: 'address', type: 'string' },

            // Returned from backend
            { name: 'authToken', type: 'string', persist: false},
            { name: 'profileid', type: 'int', persist: false},
            { name: 'accountid', type: 'int', persist: false}
        ],
        validations: [
            { type: 'presence', field: 'fullname'},
            { type: 'presence', field: 'email'},
            { type: 'presence', field: 'passwd'},

            { type: 'presence', field: 'userid'},
            { type: 'presence', field: 'accounts', message: 'opening balance must be present' },
            { type: 'presence', field: 'address'},

            { type: 'email', field: 'email'},

            { type: 'accountbalance', field: 'accounts', message: 'opening balance must be numeric' }
        ],
        proxy: {
            type: 'ajax',
            url: '/spring-nanotrader-services/api/accountProfile',
            noCache: false
        }
    },
    statics: {
        authenticate: function(model, success, failure) {
            SpringTrader.user = model;

            Ext.Ajax.request({
                url: '/spring-nanotrader-services/api/login',
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                disableCaching: false,
                jsonData: {
                    username: model.get('userid'),
                    password: model.get('passwd')
                },
                success: function(response) {
                    var jsonData = Ext.JSON.decode(response.responseText);
                    SpringTrader.user.set('authToken', jsonData.authToken);
                    SpringTrader.user.set('profileid', jsonData.profileid);
                    SpringTrader.user.set('accountid', jsonData.accountid);
                    if (success) {
                        success(response);
                    }
                },
                failure: function(response){
                    if (failure) {
                        failure(response);
                    }
                }

            })
        }
    },
    authenticated: function() {
        return !!this.get('authToken');
    }
});
